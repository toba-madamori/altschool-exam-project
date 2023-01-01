const { InternalServerError } = require('../Errors')
const logger = require('./logger')

const readingTime = (body) => {
    return new Promise((resolve, reject) => {
        try {
            const wordCount = body.split(' ').length
            let count = Number(wordCount / 200)
            if (count < 1) count = 1

            const minutes = Math.round(count)
            resolve(minutes)
        } catch (error) {
            logger.error(error.message)
            reject(new InternalServerError('something went wrong, please try again later.'))
        }
    })
}

module.exports = {
    readingTime
}
