const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function deploy() {
  await exec('npm install');

  await exec('nvm install 16.0.0');

  await exec('nvm use 16.0.0');

  await exec('yarn install');
}

deploy();
