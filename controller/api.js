const search = require('../modules/search')
const getAnswer = require('../modules/getAnswer')
module.exports = {
    search: (req, res, next) => {
        const {page, keywords} = req.body
        search(page, keywords.split(','), (err, data) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: 1,
                    data
                })                
            }
        })
    },
    question: (req, res, next) => {
        const {url} = req.body
        getAnswer(url, (err, data) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: 1,
                    data
                })
            }
        })
    }
}