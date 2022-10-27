/* eslint-disable camelcase */
const { StatusCodes } = require('http-status-codes')
const Blog = require('./model')
const User = require('../Auth/model')
const { readingTime } = require('../Utils/reading-time')
const { NotFoundError } = require('../Errors')

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

const publishBlog = async (req, res) => {
    const { id: _id } = req.params

    let blog = await Blog.findById(_id)
    if (!blog) throw new NotFoundError('sorry this blog does not exist')

    blog = await Blog.findByIdAndUpdate({ _id }, { state: 'published' }, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ status: 'success', blog: { title: blog.title, author: blog.author, state: blog.state } })
}

const updateBlog = async (req, res) => {
    const { id: _id } = req.params
    const { body } = req.body

    let reading_time

    let blog = await Blog.findById(_id)
    if (!blog) throw new NotFoundError('sorry this blog does not exist')

    if (body) {
        reading_time = await readingTime(body)
    }
    const update = { ...req.body }
    update.reading_time = reading_time

    blog = await Blog.findByIdAndUpdate({ _id }, update, { new: true, runValidators: true }).select('-__v -updatedAt')

    res.status(StatusCodes.OK).json({ status: 'success', blog })
}

const deleteBlog = async (req, res) => {
    const { id: _id } = req.params

    await Blog.findByIdAndDelete(_id)
    res.status(StatusCodes.OK).json({ status: 'success' })
}

const getBlog = async (req, res) => {
    const { id: _id } = req.params

    const blog = await Blog.findByIdAndUpdate({ _id }, { $inc: { read_count: 1 } }, { new: true, runValidators: true })
    if (!blog) throw new NotFoundError('sorry this blog does not exist')

    res.status(StatusCodes.OK).json({ status: 'success', blog: { title: blog.title, description: blog.description, author: blog.author, state: blog.state, read_count: blog.read_count, reading_time: blog.reading_time, tags: blog.tags, body: blog.body } })
}

const getAllPublic = async (req, res) => {
    let { author, title, tags, sort, page, limit } = req.query

    const queryObject = {}
    if (author) queryObject.author = { $regex: author, $options: 'i' }
    if (title) queryObject.title = { $regex: title, $options: 'i' }
    if (tags) queryObject.tags = { $in: tags }

    let result = Blog.find(queryObject)

    if (sort) {
        const sortingParams = sort.split(',').join(' ')
        result = result.sort(sortingParams)
    }

    result = result.select('-__v -updatedAt')

    page = Number(page) || 1
    limit = Number(limit) || 20
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const blogs = await result

    res.status(StatusCodes.OK).json({ status: 'success', blogs, nbhits: blogs.length })
}

module.exports = {
    createBlog,
    getAllAuthor,
    publishBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getAllPublic
}
