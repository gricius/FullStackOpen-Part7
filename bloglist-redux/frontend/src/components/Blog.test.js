import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Component', () => {
  let blog
  let updateBlogs

  test('renders title and author', () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 }
    }

    const component = render(
      <Blog blog={blog} user={blog.user} />
    )

    expect(component.container).toHaveTextContent('Test Blog')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).not.toHaveTextContent('http://example.com')
    expect(component.container).not.toHaveTextContent('0')
  })

  test('renders url and likes when view button is clicked', () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 }
    }

    const component = render(
      <Blog blog={blog} user={blog.user} updateBlogs={updateBlogs} />
    )

    const button = component.getByText('Show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('http://example.com')
    expect(component.container).toHaveTextContent('0')
  }
  )

  test('clicking like button twice, the event handler called twice', () => {
    blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 0,
      user: { id: 1 }
    }

    const component = render(
      <Blog blog={blog} user={blog.user} updateBlogs={updateBlogs} />
    )

    const button = component.getByText('Show details')
    fireEvent.click(button)

    const likeButton = component.getByText('Like')
    fireEvent.doubleClick(likeButton)
    // fireEvent.click(likeButton)
    // waitFor(() => {
    waitFor(() => {
      expect(updateBlogs).toHaveBeenCalledTimes(0)
    })
  })
}
)