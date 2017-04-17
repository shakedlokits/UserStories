import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'
import StoryList from './StoryList'
import mockData from '../../mock-data.json'

// smoke test
it('renders without crashing without items', () => {
  const div = document.createElement('div')
  const onItemClick = jest.fn()

  ReactDOM.render(<StoryList onItemClick={onItemClick}/>, div)
})

// smoke test with items
it('renders without crashing with items', () => {
  const div = document.createElement('div')
  const items = mockData['stories']
  const onItemClick = jest.fn()

  // render the object
  ReactDOM.render(<StoryList sidebarItems={items} onItemClick={onItemClick} />, div)
})

it('renders correctly', () => {
  const items = mockData['stories']
  const onItemClick = jest.fn()
  const storyList = shallow(
    <StoryList sidebarItems={items} onItemClick={onItemClick} />
  )

  // verify rendered correct items
  expect(storyList.is('ul')).toBeTruthy()
  expect(storyList.children()).toHaveLength(items.length)
  storyList.children().forEach((story) => {
    story.is('MenuItem')
  })
})
