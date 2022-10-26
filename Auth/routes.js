const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const { register, login } = require('./controllers')
const { registerSchema, loginSchema } = require('./validators')

router.post('/register', validator.body(registerSchema), register)
router.post('/login', validator.body(loginSchema), login)

module.exports = router
