const { machine } = require('./machine');
const { Logger } = require('../../Logger');
const logger = new Logger('kirkland.jobexecutor.states.dockerpull').init();

class JobDockerPull {
  constructor(ctx) {
    this.ctx = ctx;
    this.docker = ctx.docker;
    this.config = ctx.config;
    this.state = 'dockerpull';
  }

  initialize() {
    logger.info('Initialized. Listening for signed machine events...');

    machine.on(machine.finiteStates[this.state].signed, async data => {
      logger.info('machine event', { event: machine.event });

      // Load docker image from config to machine registry
      await this.docker.pullImage(this.config.kirkland.image);
      
      // Do something then transition states.
      machine.transition({ state: this.state });
    });
  }

  dispatch() {
    machine.transition({ state: this.state });
  }
}
exports.JobDockerPull = JobDockerPull;
