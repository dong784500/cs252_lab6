const request = require('./request')

const fs = require('fs')

function getToken() {
    const opt = {
        url: 'https://www.chegg.com/_ajax/global/init',
        method: 'get'
    }
    request(opt)
    .then(res => {
        console.log(res.data)
        const token = res.data.token
        fs.writeFile('./data/token.json', JSON.stringify({token}), err => {
        })
    })
    .catch(e => {
    })
}

module.exports = getToken