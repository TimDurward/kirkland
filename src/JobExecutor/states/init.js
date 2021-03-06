/**
 * State Name: 'init'
 * Transition: 'state.transitions.docker.pull'
 * Responsibilities:
 *  1. Checks in Kirkland User Config
 *  2. Converts config to a machine readable schema
 *  3. Health checks on all internal services the JobExecutor depends on
 *    1. Docker Health Check
 *  4. Validates Config
 *    1. Verifies Image exists in their custom registry, or defaults to Docker Hub.
 */

const { machine } = require('./machine');
const { KirklandConfig } = require('../../Config');

const { Logger } = require('../../Logger');
const logger = new Logger('kirkland.jobexecutor.states.init').init();

class JobInit {
  constructor(ctx) {
    this.ctx = ctx;
    this.docker = ctx.docker;
    this.config = ctx.config;
    this.state = 'init';
  }

  initialize() {
    logger.info('Initialized. Listening for signed machine events...');

    machine.on(machine.finiteStates[this.state].signed, async data => {
      logger.info('incoming machine event', { event: machine.event });

      // Health Checks
      await this.docker.health();

      // Validate Docker Image
      await this.docker.imageExists(this.config.kirkland.image);

      // init state complete, transition to next state...
      machine.transition({ state: this.state });

      // Need to transition init state to 'error state' for thrown exceptions
      // that goes for all other states.
    });
  }

  dispatch() {
    machine.transition({ state: this.state });
  }
}
exports.JobInit = JobInit;
