import React from 'react'
import ReactDOM from 'react-dom'
import MenuItem from './MenuItem'
import mockData from '../../mock-data.json'

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')
  const itemData = mockData['stories']['1']
  const onClick = jest.fn()

  ReactDOM.render(<MenuItem {...itemData} onClick={onClick} />, div)
})
