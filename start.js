const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function deploy() {

  const { stdout: output1 } = await exec("npm install");
  console.log("Installing dependencies...");
  console.log(output1);

  const { stdout: output2 } = await exec("nvm install 16.0.0");
  console.log("Installing dependencies...");
  console.log(output2);

  const { stdout: output3 } = await exec("nvm use 16.0.0");
  console.log("Installing dependencies...");
  console.log(output3);

  const { stdout: output4 } = await exec("yarn install");
  console.log("Installing dependencies...");
  console.log(output4);

}

deploy();