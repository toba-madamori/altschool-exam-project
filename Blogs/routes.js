const router = require('express').Router()
const { createBlog, getAllAuthor } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createBlogSchema, getAllAuthorSchema } = require('./validators')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, validator.body(createBlogSchema), createBlog)
router.get('/author/all', authMiddleware, validator.query(getAllAuthorSchema), getAllAuthor)

module.exports = router
