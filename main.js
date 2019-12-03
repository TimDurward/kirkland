const main = async () => {
  // Testing file for job execution
  const { JobExec } = require('./src/JobExecutor');

  // Some arbitrary way of getting config file
  // could be string file path, remotely), or buffered data
  const fs = require('fs');
  const { KirklandConfig } = require('./src/Config');
  const kirk_config = fs.readFileSync('./.kirk.yaml', 'utf8');
  // when invoking JobExecutor, also pass in kirklands validated config
  // this way no state needs to re-validate
  const kirklandConfig = new KirklandConfig({ file: kirk_config });
  const config = await kirklandConfig.init();

  // when invoking JobExecutor, also pass in the docker client
  // so it can be instantiated once and have parent-level context
  const { Docker } = require('./src/Drivers/Docker');
  const docker = new Docker();

  const jobExec = new JobExec({ id: 123, config: config, docker: docker });

  jobExec.start();
  jobExec.dispatch('idle');
};

main();
