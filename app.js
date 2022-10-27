// application wide middleware
require('dotenv').config()
require('express-async-errors')

// app setup
const express = require('express')
const app = express()
const authRouter = require('./Auth/routes')
const blogRouter = require('./Blogs/routes')

// extra security packages
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

// custom-built middleware
const notFound = require('./Middleware/notFound')
const errorHandlerMiddleware = require('./Middleware/errorHandler')

// inbuilt-middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cors settings
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}))
app.use(xss())

// test-route
app.get('/', (req, res) => {
    res.send('<h4>exam api is up and running at </h4><a href="https://documenter.getpostman.com/view/14326360/2s8YK6KkxF">Documentation</a>')
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/blog', blogRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

module.exports = app
