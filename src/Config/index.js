const yaml = require('js-yaml');
const joi = require('joi');
const { Logger } = require('../Logger');
const logger = new Logger('kirkland.config').init();

// Manages the Kirkland User Configuration
class KirklandConfig {
  /**
   *
   * @param {Object} config - Config object that makes up the configuration file.
   * @param {String|Buffer} config.file - A path (of type `String`) to a Kirkland config file.
   * Or data (of type `Buffer`) of a Kirkland config file.
   */
  constructor(config) {
    this.config = config;
  }

  async init() {
    try {
      logger.info('Validating Config');
      return await this._ValidateConfigFromSchema();
    } catch (e) {
      logger.error(e);
    }
  }

  // Error out if Config does not match Schema Definition
  async _ValidateConfigFromSchema() {
    try {
      const loadedConfig = this._LoadConfigFileToObject();
      // Get the schema that will validate loaded config.
      const objectSchema = this._KirklandDefinedSchema();

      const validConfig = await objectSchema.validate(loadedConfig);
      logger.info('Kirkland config is valid');
      return validConfig;
    } catch (e) {
      logger.error(e);
    }
  }

  _LoadConfigFileToObject() {
    try {
      return yaml.safeLoad(this.config.file, 'utf8');
    } catch (e) {
      logger.error(e);
    }
  }

  // Base Schema Definition
  _KirklandDefinedSchema() {
    return joi.object({
      a: joi.string(),
      kirkland: {
        image: joi.string(),
        job: {
          run: {
            name: joi.string(),
            command: joi.string(),
          },
        },
      },
    });
  }
}

exports.KirklandConfig = KirklandConfig;
