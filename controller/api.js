const search = require('./modules/search')
module.exports = {
    search: (req, res, next) => {
        const {page, keywords} = req.body
        search(page, keywords)
        .then(response => {
            res.json({
                status: 1,
                data: response.study.responseContent
            })
        })
        .catch(next)
    }
}