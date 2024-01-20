import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from '../NewBlog'

describe("<NewBlog/> creates new blogs", () => {
  let container, createBlog

  beforeEach(() => {
    createBlog = jest.fn()
    container = render(<NewBlog createBlog={createBlog}/>).container
  })

  test('It runs the provided handler when a new blog is created', async () => {
    const toggleButton = container.querySelector("#new-blog-button")
    const user = userEvent.setup()
    await user.click(toggleButton)
    const titleInput = container.querySelector('input[name="title"]')
    const authorInput = container.querySelector('input[name="author"]')
    const urlInput = container.querySelector('input[name="url"]')
    await user.type(titleInput, "Testing Title")
    await user.type(authorInput, "Testing Author")
    await user.type(urlInput, "Testing Url")
    const submitButton = screen.getByText("Submit")
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
  })
})