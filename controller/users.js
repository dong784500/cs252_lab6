const model = require('../models/user')
const {
    buildErrObject,
    handleError,
    emailExists,
    sendRegistrationEmailMessage
} = require('./base')

/*********************
 * Private functions *
 *********************/
const createItemInDB = async req => {
    return new Promise((resolve, reject) => {

        const {username, email, password, role} = req.body
        const user = new model({
            username,
            email,
            password,
            role
        })
        user.save((err, item) => {
            if (err) {
                reject(buildErrObject(422, err.message))
            }
            item = item.toObject()
            delete item.password
            resolve(item)
        })
    })
}

exports.createItem = async (req, res) => {
    try {
        const doesEmailExists = await emailExists(req.body.email)
        if (!doesEmailExists) {
            const item = await createItemInDB(req)
            res.status(201).json(item)
        }
    } catch (error) {
        handleError(res, error)
    }
}

