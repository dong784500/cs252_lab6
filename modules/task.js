const schedule = require('node-schedule');
const exec = require('child_process').exec;
// const str = 'xvfb-run --server-args="-screen 0 1024x768x24" node ./modules/agent.js'
const str = 'node ./modules/agent.js'


function job() {
    exec(str)
    schedule.scheduleJob('* */30 * * * *', () => {
        exec(str)
    });
}

module.exports = job
