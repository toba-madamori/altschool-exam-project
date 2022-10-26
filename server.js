require('dotenv').config()
const connectDb = require('./Db/connect')
const app = require('./app')
const logger = require('./Utils/logger')
// port
const port = process.env.PORT || 5000

// server
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => logger.info(`server is running on port ${port}`))
    } catch (error) {
        logger.error(error.message)
    }
}

start()
