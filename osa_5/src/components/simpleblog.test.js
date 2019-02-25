import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'



test('Komponentti renderöi blogin titlen, authorin ja likejen määrän.', () => {
  const blog = {
    title: 'Sepon blogi',
    author: 'Seppo',
    likes: 3,
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Sepon blogi'
  )

  expect(component.container).toHaveTextContent(
    'Seppo'
  )

  expect(component.container).toHaveTextContent(
    '3 likes'
  )
})

test('Jos komponentin like-nappia painetaan kahdesti, komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa', () => {
  const blog = {
    title: 'Sepon blogi',
    author: 'Seppo',
    likes: 3
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})