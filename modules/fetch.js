const request = require('request')
const helper = require('./utils/helper')

module.exports = () => {
    const cookie = require('./cookie/data.json')
    const cookie_str = helper.genCookie(cookie.list)

    const request = request.defaults({jar: true})
    console.log(cookie_str)
    request.cookie(cookie_str)
    request({
        url: 'https://www.chegg.com/_ajax/global/init',
        method: 'get'
    }, (err, res, body) => {
        console.log(err, body)
    })    
}
