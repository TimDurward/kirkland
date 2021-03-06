const { DockerClient } = require('./client');
const { Logger } = require('../../Logger');
const logger = new Logger('kirkland.drivers.docker').init();

/** Class representing a Docker Client. */
class Docker {
  /**
   * Create a Docker Client.
   * @param {Object} config - The configuration Object passed to Docker Client.
   * @param {String} [config.socketPath="/var/run/docker.sock"] -
   * @param {String} config.host -
   * @param {Number} config.port -
   * @param {String[]|Buffer} config.ca -
   * @param {String|Buffer} config.cert -
   * @param {String|Buffer} config.key -
   * @param {https|http} config.protocol -
   * @param {Number} config.timeout -
   * @param {String} config.version -
   * @param {Promise} config.Promise -
   */
  constructor(config) {
    this.client = new DockerClient(config).Client();
  }

  async health() {
    try {
      const ping = await this.client.ping();
      logger.info('docker daemon ping successful', { status: ping.toString() });
      return ping;
    } catch (e) {
      logger.error(e);
    }
  }

	// Pulls down a docker image from registry and follows stream until finished or error
  async pullImage(image) {
    try {
      logger.info('pulling docker image');
      return new Promise((resolve, reject) => {
        this.client.pull(image, (err, stream) => {
          if (err) reject(err);
          else this.client.modem.followProgress(stream, onFinished, onProgress);

          // Resolves Promise<NodeJS.ReadableStream>
          function onFinished() {
            logger.info('image successfully pulled from docker');
            resolve();
          }

          function onProgress(event) {
            logger.info('docker pull in progress', { status: event.status, layer_id: event.id });
          }
        });
      });
    } catch (e) {
      logger.error(e);
    }
  }

  async imageExists(imageName) {
    try {
      // Might need to replace native client method because it doesn't support org/image
      // Could use /v2/repositories/<org>/<image>
      // example: https://hub.docker.com/v2/repositories/circleci/node/

      const image = await this.client.searchImages({ term: imageName });
      logger.info('docker image exists', { status: 'OK' });
      return image;
    } catch (e) {
      logger.error(e);
    }
  }
}

exports.Docker = Docker;
