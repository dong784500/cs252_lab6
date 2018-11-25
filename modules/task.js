const schedule = require('node-schedule');

function job() {
    schedule.scheduleJob('* */20 * * * *', () => {
        console.log('The answer to life, the universe, and everything!');
    });
}

job()

module.exports = job
