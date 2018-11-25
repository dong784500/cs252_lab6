const axios = require('axios')
const helper  = require('./utils/helper')

function request (opt) {
    // load last cookie data
    const cookies = require('./data/cookie.json').cookies;
    const cookie = helper.genCookie(cookies);
    console.log(cookie)

    const option = {
        ...opt,
        headers: {
            Cookie: cookie,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
        }
    }


    return new Promise((resolve, reject) => {
        axios.request(option)
        .then(resolve)
        .catch(reject)
    })
}

module.exports = request

