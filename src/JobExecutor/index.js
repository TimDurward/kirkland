const { JobIdle } = require('./states/idle');
const { JobInit } = require('./states/init');
const { JobDockerPull } = require('./states/dockerpull');
const { JobDockerStart } = require('./states/dockerstart');
const { JobDockerExec } = require('./states/dockerexec');
const { JobClean } = require('./states/clean');
const { JobDone } = require('./states/done');

class JobExec {
  constructor(ctx) {
    this.ctx = ctx;
    this.states = {
      idle: new JobIdle(),
      init: new JobInit({ id: ctx.id, config: ctx.config }),
      dockerpull: new JobDockerPull(),
      dockerstart: new JobDockerStart(),
      dockerexec: new JobDockerExec(),
      clean: new JobClean(),
      done: new JobDone(),
    };
  }

  start() {
    this.states.idle.initialize();
    this.states.init.initialize();
    this.states.dockerpull.initialize();
    this.states.dockerstart.initialize();
    this.states.dockerexec.initialize();
    this.states.clean.initialize();
    this.states.done.initialize();
  }

  dispatch(state) {
    this.states[state].dispatch();
  }
}

exports.JobExec = JobExec;
