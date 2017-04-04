import React, { Component } from 'react'
import MenuItem from '../MenuItem/MenuItem'
import './StoryList.css'

class StoryList extends Component {
  render () {
    // set the onClick function context for the map funcion
    var onItemClick = this.props.onItemClick

    return (
      <ul className="StoryList">

        {/* iterate bullets and create the sidebar items if exists */}
        { this.props.sidebarItems &&
          this.props.sidebarItems.map(function (item) {
            return (
            <MenuItem
              {...item}
              onClick={onItemClick}
              key={item.id}
            />
            )
          })}
      </ul>
    )
  }
}

// Props type validation
StoryList.propTypes = {
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

// export the StoryList component
export default StoryList
