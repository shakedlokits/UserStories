import React from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './Sidebar'

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')
  const onItemClick = jest.fn()

  ReactDOM.render(<Sidebar onItemClick={onItemClick} />, div)
})
