const { StatusCodes } = require('http-status-codes')
const User = require('./models')
const { UnauthenticatedError } = require('../Errors')
const { signAccessToken } = require('../Utils/tokens')

const register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    await User.create({ firstname, lastname, email, password })
    res.status(StatusCodes.CREATED).json({ status: 'success', msg: 'access the login endpoint to sign-in' })
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) throw new UnauthenticatedError('Invalid Credentials')

    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new UnauthenticatedError('Invalid Credentials')

    const accessToken = await signAccessToken(user._id)
    res.status(StatusCodes.OK).json({ status: 'success', accessToken })
}

module.exports = {
    register,
    login
}
