import React, { Component } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import StoryEditor from './components/StoryEditor/StoryEditor'
import './App.css'

// main app component
class App extends Component {
  render () {
    // render application
    return (
      <div className="App">
        <Sidebar />
        <StoryEditor />
      </div>
    )
  }
}

export default App
