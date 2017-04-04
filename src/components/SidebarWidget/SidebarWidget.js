import React, { Component } from 'react'
import './SidebarWidget.css'

class SidebarWidget extends Component {
  render () {
    // set the onClick function context for the map funcion
    var onAddItem = this.props.onAddItem
    var onDeleteItem = this.props.onDeleteItem

    return (
      <div className="SidebarWidget">

        {/* Set widget buttons */}
        <button onClick={onAddItem}>+</button>
        <button onClick={onDeleteItem}>-</button>
      </div>
    )
  }
}

// Props type validation
SidebarWidget.propTypes = {
  onAddItem: React.PropTypes.func.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired
}

// export the Sidebar component
export default SidebarWidget
