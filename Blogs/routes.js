const router = require('express').Router()
const { createBlog, getAllAuthor, publishBlog, updateBlog, deleteBlog, getBlog } = require('./controllers')
const validator = require('express-joi-validation').createValidator({})
const { createBlogSchema, getAllAuthorSchema, idSchema, updateBlogSchema } = require('./validators')
const authMiddleware = require('../Middleware/authentication')

router.post('/create', authMiddleware, validator.body(createBlogSchema), createBlog)
router.get('/author/all', authMiddleware, validator.query(getAllAuthorSchema), getAllAuthor)
router.patch('/publish/:id', authMiddleware, validator.params(idSchema), publishBlog)
router.patch('/update/:id', authMiddleware, validator.params(idSchema), validator.body(updateBlogSchema), updateBlog)
router.delete('/delete/:id', authMiddleware, validator.params(idSchema), deleteBlog)
router.get('/:id', validator.params(idSchema), getBlog)

module.exports = router
