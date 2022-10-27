const Joi = require('joi')

const stringRequired = Joi.string().trim(true).required()
const string = Joi.string().trim()

const createBlogSchema = Joi.object().keys({
    title: stringRequired,
    description: string,
    tags: Joi.array().items(Joi.string().trim(true)),
    body: stringRequired

})

const getAllAuthorSchema = Joi.object().keys({
    state: Joi.string().valid('draft', 'published'),
    page: Joi.number().integer(),
    limit: Joi.number().integer()
})

module.exports = {
    createBlogSchema,
    getAllAuthorSchema
}
