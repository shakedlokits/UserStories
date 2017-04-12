import React, { Component } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'

// main app component
class App extends Component {
  render () {
    // render application
    return (
      <div className="App">
        <Sidebar />
      </div>
    )
  }
}

export default App
