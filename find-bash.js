const { exec } = require("child_process");

projectKey = process.argv[2]
commit = process.argv[3]
var re = new RegExp("comm.*"); //"${stageParams.projectKey}-\\d+"
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

          console.log(issues)
    });
  }




