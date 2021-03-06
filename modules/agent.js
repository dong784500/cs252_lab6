const puppeteer = require('puppeteer');
const fs = require('fs')
const chegg_account = require('../config/chegg_account') 

const path = require('path')

const cookie_data_path = path.join(__dirname, './data/cookie.json')

const getToken = require('./getToken')

const typeOption = {
    delay: 20
};

const navOption = {
    timeout: 0,
    waitUntil: ['domcontentloaded', 'networkidle2']
};
const urls = {
    // login: 'https://www.chegg.com/auth?action=login&redirect=https%3A%2F%2Fwww.chegg.com%2Fsearch%2Fmath%2Fstudy'
    login: 'https://www.chegg.com/auth?action=login'
};


function initBrowser () {
    return new Promise((resolve, reject) => {
        puppeteer.launch({
            headless: false,
            slowMo: 100,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
            //userDataDir: '~/Library/Caches/Google/Chrome/Default'
        })
        .then(resolve)
        .catch(reject)        
    })
}


async function signin(browser) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.resourceType() === 'image') {
            request.abort();
            // request.continue();
        } else {
            request.continue();
        }
    });

    // go to sigin page
    await page.goto(urls.login, navOption);
    await page.screenshot({path: 'login_page__load_success.png'});
    console.log('LOAD LOGIN PAGE')
    // type in register data and sign in
    await page.type('#emailForSignIn', chegg_account.username, typeOption)
    await page.type('#passwordForSignIn', chegg_account.password, typeOption)
    await page.$eval('.login-button', el => el.click());
    await page.waitForNavigation(navOption,navOption)
    await page.screenshot({path: 'login_success.png'});
    const cookies = await page.cookies()
    await browser.close();

    fs.writeFile(cookie_data_path, JSON.stringify({ cookies }), (err) => {
        getToken()
    })
}


function main () {
    initBrowser()
    .then(browser => {
        signin(browser)
    })
    .catch(e => {
        console.log(e)
    })    
}

main()

module.exports = main;




