const request = require('./request')

const parseQuestion = require('./parseQuestion')

function getQuestion(url, cb) {
    const opt = {
        url,
        method: 'get'
    }
    request(opt)
    .then(res => {
        console.log(res.data)
        const html = res.data
        const q = parseQuestion(html)
        cb(null, q)
    })
    .catch(e => {
        cb(e)
    })
}

module.exports = getQuestion