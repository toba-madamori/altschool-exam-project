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

const getAllAuthor = async (req, res) => {
    let { state, page, limit } = req.query
    const { userID: author_id } = req.user

    const queryObject = {}
    if (state) {
        queryObject.state = state
    }
    queryObject.author_id = author_id

    page = Number(page) || 1
    limit = Number(limit) || 20
    const skip = (page - 1) * limit

    const blogs = await Blog.find(queryObject).select('-updatedAt -__v').skip(skip).limit(limit)

    res.status(StatusCodes.OK).json({ status: 'success', blogs, nbhits: blogs.length })
}

module.exports = {
    createBlog,
    getAllAuthor
}
