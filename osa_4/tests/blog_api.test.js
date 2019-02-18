const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app =require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeAll(async () => {
  await Blog.remove({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json and the right number of blogs are returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  expect (blogs.body.length).toBe(helper.initialBlogs.length)
})

test('blogs are identified by a field named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Sepon blogi',
    author: 'Seppo',
    url: 'www.seponblogi.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Sepon blogi'
  )
})

test('if a new blog does not have a value for likes the amount of likes is zero', async () => {
  const newBlog = {
    title: 'Sepon blogi',
    author: 'Seppo',
    url: 'www.seponblogi.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const titles = await helper.blogsInDb()
  const lastBlogsLikes = titles[titles.length - 1].likes
  expect(lastBlogsLikes).toBe(0)
})

test('if a new blog does not have title and url the http post request is answerd with status code 400 bad request', async () => {
  const newBlog = {
    author: 'Seppo',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})