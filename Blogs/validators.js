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

const idSchema = Joi.object().keys({
    id: Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()

})

const updateBlogSchema = Joi.object().keys({
    title: string,
    description: string,
    tags: Joi.array().items(Joi.string().trim(true)),
    body: string

})

module.exports = {
    createBlogSchema,
    getAllAuthorSchema,
    idSchema,
    updateBlogSchema
}
