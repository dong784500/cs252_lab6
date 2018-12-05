const cookie = require('./cookie/data.json')
const helper = require('./utils/helper')



const cookie_str = helper.genCookie(cookie.cookies)
console.log(cookie_str)
