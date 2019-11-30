// FSM Flow
//
// Job Exec State
//   Idle
//     START -> InitialStart
//   InitialStart
//     DOCKER_PULL -> DockerPull
//   DockerPull
//     DOCKER_START -> DockerStart
//   DockerStart
//     DOCKER_EXEC -> DockerExec
//   DockerExec
//     CLEAN -> Clean
//   Clean
//     DONE -> Complete
//   Complete

// =====================================================================
// Parent State Object
// Will receive all child-states
// and do higher level logic with them
// =====================================================================
const { JobIdle } = require('./states/idle');
const { JobInit } = require('./states/init');
const { JobDockerPull } = require('./states/dockerpull');
const { JobDockerStart } = require('./states/dockerstart');
const { JobDockerExec } = require('./states/dockerexec');
const { JobClean } = require('./states/clean');
const { JobDone } = require('./states/done');

const idle = new JobIdle();
const init = new JobInit();
const dockerpull = new JobDockerPull();
const dockerstart = new JobDockerStart();
const dockerexec = new JobDockerExec();
const clean = new JobClean();
const done = new JobDone();

class JobExec {
  constructor(id, states) {
    this.states = states;
    this.parent_id = id;
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

const jobExec = new JobExec(123, {
  idle,
  init,
  dockerpull,
  dockerstart,
  dockerexec,
  clean,
  done,
});

jobExec.start();
jobExec.dispatch('idle');