const User = require('../models/user')

exports.handleError = (res, err) => {
    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
        console.log(err)
    }
    // Sends error to user

    res.json({
        status: -1,
        error: err.message
    })
}


exports.emailExists = async email => {
    return new Promise((resolve, reject) => {
        User.findOne(
            {
                email
            },
            (err, item) => {
                if (err) {
                    reject(this.buildErrObject(422, err.message))
                }
                if (item) {
                    reject(this.buildErrObject(422, 'EMAIL_ALREADY_EXISTS'))
                }
                resolve(false)
            }
        )
    })
}


exports.buildErrObject = (code, message) => {
    return {
        code,
        message
    }
}
