const { exec } = require("child_process");

projectKey = process.argv[2]
type = process.argv[3]
commit = process.argv[4]
var re = new RegExp(`${projectKey}-\\d+`);
if (process.platform === 'win32') {
    // Windows OS
  } else {
    exec(`git log --format=%B  ${commit}^..${commit}`, (error, stdout, stderr) => {
        var issues=[]
        arr = stdout.split("\n").filter(i => i)
        arr.forEach(e => {
            if(re.test(e)) {
                issues.push(e)
            }
          });

          if(type == 1) {
            sendBuildInfo(issues)
          } else if(type == 2) {
            sendDeployInfo(issues)
          }
    });
  }


const sendBuildInfo = (issues) => {
  console.log(issues)
}

const sendDeployInfo = (issues) => {
  console.log(issues)
}
  




