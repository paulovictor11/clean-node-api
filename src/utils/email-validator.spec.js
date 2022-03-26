class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('should return true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_test@email.com')

    expect(isEmailValid).toBe(true)
  })
})
