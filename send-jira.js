//Execution:- node send-jira.js <peojectkey> <type> <commit sha>

const { exec } = require("child_process");
const https = require('https');

JIRA_APP_ENDPOINT = "v3bhy51f9b.execute-api.us-east-1.amazonaws.com"
JIRA_APP_TOKEN = "7661E82C-A0AE-4827-B183-8B4A64219C73-DFVY"

projectKey = process.argv[2]
type = process.argv[3]
commit = process.argv[4]
var re = new RegExp(`${projectKey}-\\d+`);
if (process.platform === 'win32') {
  // Windows OS
} else {
  exec(`git log --format=%B  ${commit}^..${commit}`, (error, stdout, stderr) => {
    var issues = []
    arr = stdout.split("\n").filter(i => i)
    arr.forEach(e => {
      if (re.test(e)) {
        var r = e.match(re)
        issues.push(r[0])
      }
    });

    if (type == 1 && issues.length > 0) {
      buildObj = createBuildObject(issues)
      sendHTTPS("/default/jira/sendBuildStatus", buildObj)
    } else if (type == 2 && issues.length > 0) {
      deployObj = createDeployObject(issues)
      sendHTTPS("/default/jira/sendDeployStatus", deployObj)
    }
  });
}

const createBuildObject = (issues) => {
  return JSON.stringify({
    "pipelineId": "621",
    "buildNumber": "30",
    "pipelineName": "Escrow_Package_Generation",
    "buildStatus": "successful",
    "buildUrl": "https://xypro.jfrog.io/ui/pipelines/myPipelines/default/Escrow_Package_Generation/29",
    "buildTime": "2023-03-07T05:32:29.899Z",
    "issues": `${issues}`
  });
}

const createDeployObject = (issues) => {
  return JSON.stringify({
    "pipelineId":"621",
    "buildNumber":"33",
    "pipelineName":"Escrow_Package_Generation",
    "buildStatus":"successful",
    "buildUrl":"https://xypro.jfrog.io/ui/pipelines/myPipelines/default/Escrow_Package_Generation/29",
    "buildTime":"2023-03-07T05:32:29.900Z",
    "issues": `${issues}`,
    "environmentType": "development",
    "environmentName": "xs1-dev-app6"
})
}

const sendHTTPS = (url, body) => {
  const options = {
    hostname: JIRA_APP_ENDPOINT,
    port: 443,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'x-access-token': JIRA_APP_TOKEN
    },
  };

  const req = https.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(body);
  req.end();
}





