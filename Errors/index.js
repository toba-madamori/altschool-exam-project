const CustomApiError = require('./customapierror')
const BadRequestError = require('./badrequest')
const NotFoundError = require('./notfound')
const UnauthenticatedError = require('./unauthenticated')
const InternalServerError = require('./internalservererror')

module.exports = {
    CustomApiError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    InternalServerError
}
