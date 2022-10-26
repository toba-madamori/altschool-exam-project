/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    mongoServer.stop()
})

describe('Auth', () => {
    describe('Register Route', () => {
        describe('Given valid request payload', () => {
            test('Should return 201-statusCode and body', async () => {
                const response = await request(app).post('/api/v1/auth/register')
                    .send({
                        firstname: 'tobe',
                        lastname: 'John',
                        email: 'tobemadamori@gmail.com',
                        password: 'secret'
                    })

                expect(response.statusCode).toBe(201)
                expect(response.statusCode).not.toBe(400)
                expect(response.body).toEqual({
                    status: 'success',
                    msg: 'access the login endpoint to sign-in'
                })
                expect(response.body).not.toEqual({})
            })
        })

        describe('Given an Invalid request payload', () => {
            test('No email/password/firstname/lastname: Should return 400-statusCode', async () => {
                const response = await request(app).post('/api/v1/auth/register')
                    .send({
                        password: 'secret'
                    })

                expect(response.statusCode).toBe(400)
                expect(response.statusCode).not.toBe(201)
                expect(response.body).not.toEqual({
                    status: 'success',
                    msg: 'access the login endpoint to sign-in'
                })
                expect(response.body).toEqual({})
            })
        })
    })

    describe('Login Route', () => {
        describe('Given the user exists', () => {
            test('should return 200: correct info', async () => {
                const response = await request(app).post('/api/v1/auth/login')
                    .send({
                        email: 'tobemadamori@gmail.com',
                        password: 'secret'
                    })
                expect(response.statusCode).toBe(200)
                expect(response.body).toEqual({
                    status: 'success',
                    accessToken: expect.any(String)
                })
                expect(response.body.error).toBe(undefined)
            })

            test('should return 401: incorrect email', async () => {
                const response = await request(app).post('/api/v1/auth/login')
                    .send({
                        email: 'wrongemail@gmail.com',
                        password: 'secret'
                    })
                expect(response.statusCode).toBe(401)
                expect(response.body.msg).toBe('Invalid Credentials')
                expect(response.body.msg).not.toBe(undefined)
            })
            test('should return 401: incorrect password', async () => {
                const response = await request(app).post('/api/v1/auth/login')
                    .send({
                        email: 'tobemadamori@gmail.com',
                        password: 'wrongpassword'
                    })
                expect(response.statusCode).toBe(401)
                expect(response.body.msg).toBe('Invalid Credentials')
                expect(response.body.msg).not.toBe(undefined)
            })
        })

        describe('Given the user does not exist', () => {
            test('should return 401 status code', async () => {
                const response = await request(app).post('/api/v1/auth/login')
                    .send({
                        email: 'userdoesnotexist@gmail.com',
                        password: 'userdoesnotexist'
                    })
                expect(response.statusCode).toBe(401)
                expect(response.body.msg).toBe('Invalid Credentials')
                expect(response.body.msg).not.toBe(undefined)
            })
        })
    })
})
