const { machine } = require('./machine');

class JobIdle {
  constructor() {
    this.state = 'idle';
  }

  initialize() {
    console.log(`[${this.state}] - Initialized. Listening for signed machine events...`);
  }

  // Dispatch transition for state to change
  dispatch() {
    machine.transition({ state: this.state });
  }
}
exports.JobIdle = JobIdle;
