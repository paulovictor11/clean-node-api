const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { accessToken } }
    )
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)

  return { sut, userModel }
}

describe('Update Access Token Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.desconnect()
  })

  test('should update the user with the given access token', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')

    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })

    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const promise = sut.update(fakeUser.insertedId, 'valid_token')

    expect(promise).rejects.toThrow()
  })
})
