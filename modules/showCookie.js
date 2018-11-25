const helper  = require('./utils/helper')
const cookies = require('./data/cookie.json').cookies;

console.log(helper.genCookie(cookies))