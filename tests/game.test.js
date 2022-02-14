const supertest = require('supertest')
const { app, server } = require('../index')
const { sequelize } = require('../dbconnection')
const { createNewBoard } = require('../utils/board')

const api = supertest(app)

describe('/GET /', () => {
  test('API Welcome message', async () => {
    await api
      .get('/')
      .expect(200)
  })
})

describe('/GET /api/v1/game', () => {
  test('Request new game, id parameter is null', async () => {
    await api
      .get('/api/v1/game')
      .expect('Content-Type', /application\/json/)
      .expect(200)
  })
})

describe('/POST /api/v1/game', () => {
  test('Save new game', async () => {
    const newBoard = createNewBoard()

    const response = await api
      .post('/api/v1/game')
      .send(newBoard)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    expect(response.body).not.toBeNull()
  })
})

afterAll(() => {
  server.close()
  sequelize.close()
})
