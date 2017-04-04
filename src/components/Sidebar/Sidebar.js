import React, { Component } from 'react'
import MenuItem from '../MenuItem/MenuItem'
import StoryList from '../StoryList/StoryList'
import SidebarWidget from '../SidebarWidget/SidebarWidget'

class Sidebar extends Component {
  render () {
    return (
      <div className="Sidebar">
        <StoryList {...this.props}></StoryList>
        <SidebarWidget onAddItem={() => {}} onDeleteItem={() => {}}></SidebarWidget>
      </div>
    )
  }
}

// Props type validation
Sidebar.propTypes = {
  sidebarItems: React.PropTypes.arrayOf(
    React.PropTypes.shape(

      // function to remove the inner onClick function
      // from the MenuItem prototypes and return it
      (() => {
        var menuPrototypes = MenuItem.propTypes
        delete menuPrototypes.onClick
        return menuPrototypes
      })()
    )
  ),
  onItemClick: React.PropTypes.func.isRequired
}

// export the Sidebar component
export default Sidebar
