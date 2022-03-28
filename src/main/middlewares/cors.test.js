const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('should disable x-powered-by header', async () => {
    app.get('/test_header', (req, res) => {
      res.send('')
    })

    const res = await request(app).get('/')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  test('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })

    const res = await request(app).get('/')

    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
