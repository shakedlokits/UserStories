import React from 'react'
import ReactDOM from 'react-dom'
import SidebarWidget from './SidebarWidget'

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')
  const onAddItem = jest.fn()
  const onDeleteItem = jest.fn()

  ReactDOM.render(<SidebarWidget
    onAddItem={onAddItem}
    onDeleteItem={onDeleteItem} />,
  div)
})
