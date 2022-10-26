const jwt = require('jsonwebtoken')
const { InternalServerError } = require('../Errors')
const logger = require('./logger')

const signAccessToken = (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: userID
        }
        const secret = process.env.JWT_SECRET_ACCESS_TOKEN
        const options = {
            expiresIn: '1h'
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                logger.error(err.message)
                reject(new InternalServerError(err.message))
            }
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken
}
