const Dockerode = require('dockerode');

/** Class representing a Docker Client. */
class DockerClient {
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
  constructor(config = {}) {
    this.config = config;
  }

  Client() {
    return new Dockerode({
      socketPath: this.config.socketPath || process.env.DOCKER_HOST || '/var/run/docker.sock',
      host: this.config.host,
      port: this.config.port,
      ca: this.config.ca,
      cert: this.config.cert,
      key: this.config.key,
      protocol: this.config.protocol,
      timeout: this.config.timeout,
      version: this.config.version,
      Promise: this.config.Promise,
    });
  }
}

module.exports = {
  DockerClient,
};
