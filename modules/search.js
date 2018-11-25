const request = require('./request')

const fs = require('fs')

function search(page, keywords) {

    const search_data = { 
        "chgsec": "searchsection", 
        "chgsubcomp": "serp", 
        "profile": "study-intent-srp", 
        "page-number": page
    }    

    const token = require('./data/token.json').token

    const url = `https://www.chegg.com/_ajax/federated/search?query=${keywords.join('+')}&search_data=${encodeURIComponent(JSON.stringify(search_data))}&token=${token}`

    const opt = {
        url,
        method: 'get'
    }
    console.log(opt)

    request(opt)
    .then(res => {
        fs.writeFile('./data/search.json', JSON.stringify(res.data), (err) => {
            console.log('SEARCH FINISHED')
        })
    })
    .catch(e => {
        console.log(e.message)
    })

}


search(1, ['math'])

module.exports = search
