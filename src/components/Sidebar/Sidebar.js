import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    ).isRequired
  ),
  onItemClick: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    sidebarItems: state['stories']
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (id) => {}
  }
}

// export the Sidebar component
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
