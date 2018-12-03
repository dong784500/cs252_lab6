const User = require('../models/user')
const {
    buildErrObject,
    handleError,
    emailExists,
} = require('./base')




const setUserInfo = item => {
    const { username, email, role } = item
    const user = {
        username, email, role
    }
    return user
}

const checkPassword = async (password, user) => {
    return new Promise((resolve, reject) => {
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                reject(buildErrObject(422, err.message))
            }
            if (!isMatch) {
                resolve(false)
            }
            resolve(true)
        })
    })
}

const findUser = async email => {
    return new Promise((resolve, reject) => {
        User.findOne(
            {
                email
            },
            'password username email role',
            (err, item) => {
                if (err) {
                    reject(buildErrObject(422, err.message))
                }
                if (!item) {
                    reject(buildErrObject(404, 'USER_DOES_NOT_EXISTS'))
                }
                resolve(item)
            }
        )
    })
}

const registerUser = async req => {
    const { username, password, email, role } = req.body
    return new Promise((resolve, reject) => {
        const user = new User({
            username,
            password,
            email,
            role
        })
        user.save((err, item) => {
            if (err) {
                reject(buildErrObject(422, err.message))
            }
            resolve(item)
        })
    })
}



 module.exports  ={
     login: async (req, res) => {
        try {
            const user = await findUser(req.body.email)
            const isPasswordMatch = await checkPassword(req.body.password, user)
            if (!isPasswordMatch) {
                handleError(res, new Error("PASSWORD IS NOT CORRECT"))
            } else {
                delete user.password
                res.json({
                    status: 1,
                    data: user
                })
            }
        } catch (error) {
            handleError(res, error)
        }
    },
    register: async (req, res) => {
        console.log(req.body)
        try {
            const doesEmailExists = await emailExists(req.body.email)
            if (!doesEmailExists) {
                const item = await registerUser(req)
                const userInfo = setUserInfo(item)
                res.json({
                    status:1,
                    data: userInfo
                })
            }
        } catch (error) {
            handleError(res, error)
        }
    }
 }
