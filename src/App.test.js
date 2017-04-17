import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import userStories from './reducers/StoryReducers'
import mockData from './mock-data.json'
import {mount} from 'enzyme'

// set global parameters
let store

// initialize react store
beforeAll(() => {
  store = createStore(userStories, mockData)
})

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div)
})

// renders correctly
it('renders correctly', () => {
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(app.find('.StoryEditor').is('div')).toBeTruthy()
  expect(app.find('.Sidebar').is('div')).toBeTruthy()
})
