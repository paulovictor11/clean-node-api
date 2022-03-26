const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }

    await this.loadUserByEmailRepository.load(email)
  }
}

describe('Auth UseCase', () => {
  test('should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()

    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('test@email.com')

    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepositorySpy {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
    sut.auth('test@email.com', '12345')

    expect(loadUserByEmailRepositorySpy.email).toBe('test@email.com')
  })
})
