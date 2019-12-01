const winston = require('winston');

class Logger {
  constructor(service) {
    this.service = service;
  }

  init() {
    return winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.json()),
      defaultMeta: { service: this.service },
      transports: [new winston.transports.Console()],
    });
  }
}

exports.Logger = Logger;
