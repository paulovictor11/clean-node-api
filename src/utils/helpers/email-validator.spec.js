const validator = require('validator')
const EmailValidator = require('./email-validator')
const { MissingParamError } = require('../errors')

const makeSut = () => {
  return new EmailValidator()
}
describe('Email Validator', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_test@email.com')

    expect(isEmailValid).toBe(true)
  })

  test('should return false if validator returns false', () => {
    validator.isEmailValid = false

    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_test@email.com')

    expect(isEmailValid).toBe(false)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('test@email.com')

    expect(validator.email).toBe('test@email.com')
  })

  test('should throw if no email is provided', async () => {
    const sut = makeSut()

    expect(() => sut.isValid()).toThrow(new MissingParamError('email'))
  })
})
