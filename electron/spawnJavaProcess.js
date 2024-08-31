const path = require("path");
const { spawn } = require('node:child_process');

module.exports = {
     spawnJavaProcess: () => {
        let jarPath =  `${path.dirname(__filename)}/helloworld.jar`;
        const javaProcess = spawn('java', ['-jar', jarPath]);

        javaProcess.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        javaProcess.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        javaProcess.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });

        return javaProcess.pid;
    },
};


