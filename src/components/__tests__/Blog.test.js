import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

describe('<Blog/> renders correct information', () => {
  let container; 

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'http://test.com',
      likes: 10
    }

    const setBlog = jest.fn()
    const blogs = [blog]

    container = render(<Blog blog={blog} setBlog={setBlog} blogs={blogs} setBlogs={jest.fn()}/>).container
  })
  test('Initially only shows blog title and author name', () => {
    
    const author = screen.findByText('test author')
    const title = screen.findByText('test blog')
    const details = container.querySelector('.blog-details')
    expect(author).toBeDefined()
    expect(title).toBeDefined()
    expect(details).toHaveStyle('display: none')
  })

  test('The button initially says "Show details"', () => {
    const button = screen.getByText('Show Details')
    expect(button).toBeDefined()
  })

  test('When the button is clicked, the details are shown', async () => {
    const button = screen.getByText('Show Details')
    const user = userEvent.setup()

    await user.click(button)
    const details = container.querySelector('.blog-details')
    expect(details).not.toHaveStyle('display: none')
  })

  test('After clicking the button, it should say "Hide"', async () => {
    const button = screen.getByText('Show Details')
    const user = userEvent.setup()

    await user.click(button)
    const button2 = screen.getByText('Hide')
    expect(button2).toBeDefined()
  })
})