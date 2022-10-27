/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../app')

describe('App Instantiation', () => {
    test('Should show a documentation link', async () => {
        const response = await request(app)
            .get('/')

        expect(response.text).toBe('<h4>exam api is up and running at </h4><a href="https://documenter.getpostman.com/view/14326360/2s8YK6KkxF">Documentation</a>')
    })
})
