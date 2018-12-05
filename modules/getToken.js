const request = require('./request')

const fs = require('fs')

const path = require('path')

const token_data_path = path.join(__dirname, './data/token.json')

function getToken() {
    
    const opt = {
        url: 'https://www.chegg.com/_ajax/global/init',
        method: 'get'
    }
    request(opt)
    .then(res => {
        console.log(res.data)
        const token = res.data.token
        fs.writeFile(token_data_path, JSON.stringify({token}), err => {
        })
    })
    .catch(e => {
    })
}

module.exports = getToken