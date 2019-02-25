const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app =require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'Seppo', name: 'Seppo Sepponen', password: 'sepponaattori' })
  await user.save()
})

test('creation fails with proper satuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'Seppo',
    name: 'Sepponen',
    password: 'sepponaattori2'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('creation fails with proper satuscode and message if username is too short', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'Se',
    name: 'Sepponen',
    password: 'sepponaattori2'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('`username` (`Se`) is shorter than the minimum allowed length')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('creation fails with proper satuscode and message if username is missing', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    name: 'Sepponen',
    password: 'sepponaattori2'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('`username` is required')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('creation fails with proper satuscode and message if password is missging', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'Se',
    name: 'Sepponen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('Password missing')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

test('creation fails with proper satuscode and message if password is too short', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'Seppo',
    name: 'Sepponen',
    password: 'se'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('Password is shorter than the minimum allowed length')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})