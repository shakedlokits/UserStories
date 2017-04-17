import React from 'react'
import ReactDOM from 'react-dom'
import SidebarWidget from './SidebarWidget'
import { shallow } from 'enzyme'

// set global parameters
let onAddItem
let onDeleteItem

// initialize parameter before each run
beforeEach(() => {
  onAddItem = jest.fn()
  onDeleteItem = jest.fn()
})

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<SidebarWidget
    onAddItem={onAddItem}
    onDeleteItem={onDeleteItem} />,
  div)
})

// verify renders correcly
it('renders correctly', () => {
  const sidebarWidget = shallow(
    <SidebarWidget
      onAddItem={onAddItem}
      onDeleteItem={onDeleteItem} />
  )

  // verify correct buttons
  expect(sidebarWidget.is('div')).toBeTruthy()
  sidebarWidget.find('.SidebarWidget').childAt(0).simulate('click')
  sidebarWidget.find('.SidebarWidget').childAt(1).simulate('click')
  expect(onAddItem).toHaveBeenCalledTimes(1)
  expect(onDeleteItem).toHaveBeenCalledTimes(1)
})
