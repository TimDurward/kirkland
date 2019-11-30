/**
 * State Name: 'init'
 * Transition: 'state.transitions.docker.pull'
 */

const { machine } = require('./machine');

class JobInit {
  constructor(parent_id, ctx) {
    this.state = 'init';
  }

  initialize() {
    console.log(`[${this.state}] - Initialized. Listening for signed machine events...`);

    machine.on(machine.finiteStates[this.state].signed, data => {
      console.log(`[${this.state}] - Event ${machine.event}.`);

      // Do something then transition states.
      machine.transition({ state: this.state });
    });
  }

  dispatch() {
    machine.transition({ state: this.state });
  }
}
exports.JobInit = JobInit;
