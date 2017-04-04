import React from 'react'
import ReactDOM from 'react-dom'
import StoryList from './StoryList'

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')
  const onItemClick = jest.fn()

  ReactDOM.render(<StoryList onItemClick={onItemClick}/>, div)
})
