const EventEmitter = require('eventemitter2').EventEmitter2;
const { Logger } = require('../../Logger');
const logger = new Logger('jobexecutor.states.machine').init();

const finiteStates = Object.freeze({
  idle: {
    to: 'init',
    transitions: 'state.transitions.start',
    authenticated: 'state.machine.signed.idle',
  },
  init: {
    to: 'dockerpull',
    transitions: 'state.transitions.docker.pull',
    signed: 'state.machine.signed.init',
  },
  dockerpull: {
    to: 'dockerstart',
    transitions: 'state.transitions.docker.start',
    signed: 'state.machine.signed.docker.pull',
  },
  dockerstart: {
    to: 'dockerexec',
    transitions: 'state.transitions.docker.exec',
    signed: 'state.machine.signed.docker.start',
  },
  dockerexec: {
    to: 'clean',
    transitions: 'state.transitions.clean',
    signed: 'state.machine.signed.docker.exec',
  },
  clean: {
    to: 'done',
    transitions: 'state.transitions.complete',
    signed: 'state.machine.signed.clean',
  },
  done: {
    to: 'complete',
    transitions: '',
    signed: 'state.machine.signed.docker.done',
  },
  complete: {},
});

class Machine extends EventEmitter {
  constructor() {
    super({ wildcard: true });
    this.initial_state = 'idle';
    this.finiteStates = finiteStates;
    this.current_state;
  }

  initialize() {
    // Global listener for state transition events.
    this.on('state.transitions.**', data => {
      const fromState = finiteStates[data.state];
      const toState = fromState.to;
      logger.info('machine event', { event: machine.event, transition: `from ${data.state} to ${toState}` });
      // console.log(`[Machine] - Event ${this.event}`);

      // If state transition passes. Dispatch to child state.
      if (fromState && toState) {
        this.emit(finiteStates[toState].signed, 'test123');
      }
    });
  }

  setCurrentState(state) {
    if (state) this.current_state = state;
    else this.current_state = this.initial_state;
  }

  getCurrentState() {
    return this.current_state;
  }

  transition(ctx) {
    this.emit(finiteStates[ctx.state].transitions, ctx);
  }
}

const machine = new Machine({ wildcard: true });
// When machine starts give it the initial state...
machine.setCurrentState();
machine.initialize();

exports.machine = machine;
