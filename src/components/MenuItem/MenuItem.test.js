import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'
import MenuItem from './MenuItem'
import mockData from '../../mock-data.json'

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')
  const itemData = mockData['stories']['1']
  const onClick = jest.fn()

  // render the object
  ReactDOM.render(<MenuItem {...itemData} onClick={onClick} />, div)
})

it('renders correctly', () => {
  const itemData = mockData['stories']['1']
  const onClick = jest.fn()
  const menuItem = shallow(
    <MenuItem {...itemData} onClick={onClick} />
  )

  // verify renders story user correctly
  expect(menuItem.is('li')).toBeTruthy()
  expect(menuItem.find('.image').prop('src')).toEqual(itemData.image)
  expect(menuItem.find('.text h3').text()).toEqual(itemData.name)
  expect(menuItem.find('.text h4').text()).toEqual(itemData.background)

  // verify bullets rendered corretly
  expect(menuItem.find('.slip').children()).toHaveLength(itemData.bullets.length)
  itemData.bullets.forEach((bullet, index) => {
    expect(menuItem.find(`.slip`).childAt(index).text())
    .toEqual(`${bullet.type}: ${bullet.summary}`)
  })
})

it('renders correctly', () => {
  const itemData = mockData['stories']['1']
  const onClick = jest.fn()
  const menuItem = shallow(
    <MenuItem {...itemData} onClick={onClick} />
  )

  // verify on click operates
  menuItem.find('.MenuItem').simulate('click')
  expect(onClick).toHaveBeenCalled()
})
