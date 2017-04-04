import React, { Component } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import mockData from './mock-data.json'
import './App.css'

// main app component
class App extends Component {
  render () {
    // map sidebar jobs
    var sidebarItems = mockData['ids'].map(
      (item) => { return mockData['stories'][item.toString()] })

    // render application
    return (
      <div className="App">
        <Sidebar sidebarItems={sidebarItems} onItemClick={() => {}}/>
      </div>
    )
  }
}

export default App
