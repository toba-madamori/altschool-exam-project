/* eslint-disable camelcase */
const { StatusCodes } = require('http-status-codes')
const Blog = require('./model')
const User = require('../Auth/model')
const { readingTime } = require('../Utils/reading-time')

const createBlog = async (req, res) => {
    const { body } = req.body
    const { userID: author_id } = req.user

    const user = await User.findById({ _id: author_id })
    const author = user.firstname + ' ' + user.lastname
    const reading_time = await readingTime(body)

    const blog = await Blog.create({ ...req.body, author, author_id, reading_time })
    res.status(StatusCodes.CREATED).json({ status: 'success', blog: { title: blog.title, author: blog.author } })
}

module.exports = {
    createBlog
}
