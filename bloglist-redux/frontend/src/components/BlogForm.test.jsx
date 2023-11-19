import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('clicking the save button calls the event handler with the right details', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />)

    const titleInput = component.container.querySelector('input[name="Title"]')
    const authorInput = component.container.querySelector('input[name="Author"]')
    const urlInput = component.container.querySelector('input[name="Url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Test Blog Title' },
    })
    fireEvent.change(authorInput, {
      target: { value: 'Test Blog Author' },
    })
    fireEvent.change(urlInput, {
      target: { value: 'http://testblog.com' },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'http://testblog.com',
    })
  })
})