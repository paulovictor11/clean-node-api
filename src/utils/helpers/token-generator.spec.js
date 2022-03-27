const jwt = require('jsonwebtoken')

class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}

describe('', () => {
  test('should return null if JWT returns null', async () => {
    jwt.token = null

    const sut = new TokenGenerator()
    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })

  test('should return a token if JWT returns a token', async () => {
    const sut = new TokenGenerator()
    const token = await sut.generate('any_id')

    expect(token).toBe(jwt.token)
  })
})
