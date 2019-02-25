import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('Blog', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Sepon blogi',
      author: 'Seppo Bloggeri',
      likes: 3,
      user: {
        id: '1',
        name: 'Seppo'
      }
    }

    const user = {
      name: 'Seppo',
      id: '1'
    }
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} toggleVisibility={mockHandler} />
    )
  })

  it('oletusarvoisesti blogista on näkyvissä ainoastaan nimi ja kirjoittaja', () => {
    const divFull = component.container.querySelector('.fullContent')
    const divShort = component.container.querySelector('.shortContent')

    expect(divFull).toHaveStyle('display: none')
    expect(divShort).not.toHaveStyle('display: none')
    expect(divShort).toHaveTextContent('Sepon blogi Seppo Bloggeri')
    expect(divShort).not.toHaveTextContent('3 likes')
  })

  it('klikkaamalla blogia saadaan näkyviin muut osat tiedoista', () => {
    const button = component.container.querySelector('.blog')
    fireEvent.click(button)

    const divFull = component.container.querySelector('.fullContent')
    const divShort = component.container.querySelector('.shortContent')
    const content = component.container.querySelector('.content')

    expect(divShort).toHaveStyle('display: block')
    expect(divFull).not.toHaveStyle('display: none')
    expect(content).toHaveTextContent('Sepon blogi Seppo Bloggeri')
    expect(content).toHaveTextContent('3 likes')
  })

})