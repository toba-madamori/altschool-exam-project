const Joi = require('joi')

const stringRequired = Joi.string().trim(true).required()
const string = Joi.string().trim()

const createBlogSchema = Joi.object().keys({
    title: stringRequired,
    description: string,
    tags: Joi.array().items(Joi.string().trim(true)),
    body: stringRequired

})

module.exports = {
    createBlogSchema
}
