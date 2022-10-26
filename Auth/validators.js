/* eslint-disable no-unused-vars */
const Joi = require('joi')

const stringRequired = Joi.string().trim().required()
const email = Joi.string().email().trim(true).required()
const password = Joi.string().min(6).trim(true).required().strict()
const id = Joi.string().hex().length(24).pattern(/^[0-9a-fA-F]{24}$/).required()

const registerSchema = Joi.object().keys({
    firstname: stringRequired,
    lastname: stringRequired,
    email,
    password
})

const loginSchema = Joi.object().keys({
    email,
    password
})

module.exports = {
    registerSchema,
    loginSchema
}
