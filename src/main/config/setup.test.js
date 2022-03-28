const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('should disable x-powered-by header', async () => {
    app.get('/test_header', (req, res) => {
      res.send('')
    })

    const res = await request(app).get('/')

    expect(res.headers.x_powered_by).toBeUndefined()
  })
})
