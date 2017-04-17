import React from 'react'
import ReactDOM from 'react-dom'
import { Sidebar } from './Sidebar'
import { shallow } from 'enzyme'
import mockData from '../../mock-data.json'

// set global parameters
let onItemClick
let onAddItem
let onDeleteItem
let items = mockData.stories

// initialize parameter before each run
beforeEach(() => {
  onItemClick = jest.fn()
  onAddItem = jest.fn()
  onDeleteItem = jest.fn()
})

// smoke test
it('renders without crashing without items', () => {
  const div = document.createElement('div')

  ReactDOM.render(<Sidebar
    onItemClick={onItemClick}
    onAddItem={onAddItem}
    onDeleteItem={onDeleteItem}
    />, div)
})

// smoke test
it('renders without crashing with items', () => {
  const div = document.createElement('div')

  ReactDOM.render(<Sidebar
    onItemClick={onItemClick}
    onAddItem={onAddItem}
    onDeleteItem={onDeleteItem}
    sidebarItems={items}
    />, div)
})

it('renders correctly', () => {
  let sidebar = shallow(
    <Sidebar
      onItemClick={onItemClick}
      onAddItem={onAddItem}
      onDeleteItem={onDeleteItem}
      sidebarItems={items} />
    )

  // verify story list and widget renderd and get props
  expect(sidebar.childAt(0).is('StoryList')).toBeTruthy()
  expect(sidebar.childAt(1).is('SidebarWidget')).toBeTruthy()
  expect(sidebar.find('StoryList').prop('sidebarItems')).toEqual(items)
  expect(typeof sidebar.find('StoryList').prop('onItemClick')).toEqual('function')
  expect(typeof sidebar.find('SidebarWidget').prop('onAddItem')).toEqual('function')
  expect(typeof sidebar.find('SidebarWidget').prop('onDeleteItem')).toEqual('function')
})
