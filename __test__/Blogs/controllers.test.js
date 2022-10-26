/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../../Auth/model')
const { signAccessToken } = require('../../Utils/tokens')
require('dotenv').config()

beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    mongoServer.stop()
})

const userID = '62f3c6de0b6fab3631581379'

const dummyBlog = {
    title: 'New blog',
    description: 'testing',
    tags: ['tests'],
    body: 'Null'
}

const dummyUser = {
    _id: userID,
    firstname: 'Tobe',
    lastname: 'John',
    email: 'tobejohn@gmail.com',
    password: 'secret'
}

describe('Blogs', () => {
    describe('Create Blog Route', () => {
        describe('Given the user is validated', () => {
            test('Should return 201-statusCode and body', async () => {
                const accessToken = await signAccessToken(userID)
                await new User({ ...dummyUser }).save()

                const response = await request(app)
                    .post('/api/v1/blog/create')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send({ ...dummyBlog })

                expect(response.statusCode).toBe(201)
                expect(response.statusCode).not.toBe(400)
                expect(response.statusCode).not.toBe(404)
                expect(response.body).toEqual({
                    blog: {
                        title: 'New blog',
                        author: 'Tobe John'
                    },
                    status: 'success'
                })
                expect(response.body).not.toEqual({})
            })
        })
        describe('Given the user is not validated', () => {
            test('Should return 401 statusCode and error message', async () => {
                const response = await request(app)
                    .post('/api/v1/blog/create')
                    .send({ ...dummyBlog })

                expect(response.statusCode).toBe(401)
                expect(response.statusCode).not.toBe(200)
                expect(response.statusCode).not.toBe(404)
                expect(response.body).toEqual({ msg: 'Authentication Invalid' })
            })
        })
    })
})
