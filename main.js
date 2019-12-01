// Testing file for job execution
const { JobExec } = require('./src/JobExecutor');

// Some arbitrary way of getting config file
// could be string file path, remotely), or buffered data
const fs = require('fs');
const kirk_config = fs.readFileSync('./.kirk.yaml', 'utf8');
// console.log(kirk_config.toString());
const jobExec = new JobExec({ id: 123, config: kirk_config });

jobExec.start();
jobExec.dispatch('idle');
