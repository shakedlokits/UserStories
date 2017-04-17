import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import userStories from './reducers/StoryReducers'
import App from './App'
import './index.css'
import mockData from './mock-data.json'

// initialize react store
let store = createStore(userStories,
  mockData,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
