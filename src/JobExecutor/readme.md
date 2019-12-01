State machine for Job Execution

Job Exec State
  Idle
    START -> InitialStart
  InitialStart
    DOCKER_PULL -> DockerPull
  DockerPull
    DOCKER_START -> DockerStart
  DockerStart
    DOCKER_EXEC -> DockerExec
  DockerExec
    CLEAN -> Clean
  Clean
    DONE -> Complete
  Complete
