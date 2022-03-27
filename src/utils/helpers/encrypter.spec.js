const bcrypt = require('bcrypt')

class Encrypter {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

describe('Encrypter', () => {
  test('should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'hashed_value')

    expect(isValid).toBe(true)
  })

  test('should return false if bcrypt returns false', async () => {
    bcrypt.isValid = false

    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'hashed_value')

    expect(isValid).toBe(false)
  })
})
