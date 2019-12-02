const { machine } = require('./machine');
const { Logger } = require('../../Logger');
const logger = new Logger('kirkland.jobexecutor.states.dockerexec').init();

class JobDockerExec {
  constructor(parent_id, ctx) {
    this.state = 'dockerexec';
  }

  initialize() {
    logger.info('Initialized. Listening for signed machine events...');

    machine.on(machine.finiteStates[this.state].signed, data => {
      logger.info('machine event', { event: machine.event });

      // Do something then transition states.
      machine.transition({ state: this.state });
    });
  }

  dispatch() {
    machine.transition({ state: this.state });
  }
}
exports.JobDockerExec = JobDockerExec;
