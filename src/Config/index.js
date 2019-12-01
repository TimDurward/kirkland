const yaml = require('js-yaml');
const fs = require('fs');

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

  loadfile() {
    return yaml.safeLoad(this.config.file, 'utf8');
  }
}

exports.KirklandConfig = KirklandConfig;
