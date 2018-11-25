const cheerio = require('cheerio')

function parseQuestion(html) {
    const $ = cheerio.load(html)
    const question_tit = $('.question-text').text()
    const question_txt =  $('.question-body-text').html().replace(/src\=\"\/\//g, 'src="https://')    
    const answer = $('.answer-given-body').html().replace(/src\=\"\/\//g, 'src="https://')    
    return {
        tit: question_tit,
        txt: question_txt,
        answer
    }
}

module.exports = parseQuestion