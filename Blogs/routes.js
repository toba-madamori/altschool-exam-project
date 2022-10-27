const router = require('express').Router()
const { createBlog, getAllAuthor, publishBlog } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createBlogSchema, getAllAuthorSchema, idSchema } = require('./validators')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, validator.body(createBlogSchema), createBlog)
router.get('/author/all', authMiddleware, validator.query(getAllAuthorSchema), getAllAuthor)
router.patch('/publish/:id', authMiddleware, validator.params(idSchema), publishBlog)

module.exports = router
