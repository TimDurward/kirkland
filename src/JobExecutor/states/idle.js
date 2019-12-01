const { machine } = require('./machine');
const { Logger } = require('../../Logger');
const logger = new Logger('jobexecutor.states.idle').init();

class JobIdle {
  constructor() {
    this.state = 'idle';
  }

  initialize() {
    logger.info('Initialized. Listening for signed machine events...');
  }

  // Dispatch transition for state to change
  dispatch() {
    machine.transition({ state: this.state });
  }
}
exports.JobIdle = JobIdle;
