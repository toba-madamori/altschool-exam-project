const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide your blog title'],
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        required: [true, 'Please provide the author of the blog']
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: [true, 'please provide the author-id']
    },
    state: {
        type: String,
        default: 'draft'
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: String,
        required: [true, 'please provide the average reading time of this blog']
    },
    tags: [{
        type: String
    }],
    body: {
        type: String,
        required: [true, 'please provide the body of your blog']
    }
}, { timestamps: true })

const db = mongoose.connection.useDb('Altschool2')

module.exports = db.model('Blogs', BlogSchema)
