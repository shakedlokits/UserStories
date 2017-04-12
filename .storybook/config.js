import { configure } from '@kadira/storybook'

function loadStories () {
  require('./index.js')
}

configure(loadStories, module)
