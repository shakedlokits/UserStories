import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import StoryList from '../src/components/StoryList/StoryList' // eslint-disable-line
import StoryEditor from '../src/components/StoryEditor/StoryEditor'
import MenuItem from '../src/components/MenuItem/MenuItem'
import mockData from '../src/mock-data.json'
import '../src/index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import userStories from '../src/reducers/StoryReducers'

// initialize react store
let store = createStore(userStories,
  mockData,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

storiesOf('StoryList', module)
  .add('with multiple items', () => (
  <StoryList sidebarItems={mockData['stories']} onItemClick={action('clicked')} />
))

storiesOf('MenuItem', module)
  .add('with basic data', () => (
    <MenuItem {...mockData['stories'][0]} onClick={action('clicked')} />
))

storiesOf('StoryEditor', module)
  .add('with redux store', () => (
    <Provider store={store}>
      <StoryEditor />
    </Provider>
))
