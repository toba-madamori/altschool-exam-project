const router = require('express').Router()
const { createBlog } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createBlogSchema } = require('./validators')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, validator.body(createBlogSchema), createBlog)

module.exports = router
