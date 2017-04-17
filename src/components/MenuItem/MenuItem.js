import React, { Component } from 'react'
import classNames from 'classnames'
import './MenuItem.css'

class MenuItem extends Component {
  render () {
    return (
      <li className="MenuItem"
        onClick={() => { this.props.onClick(this.props.id) }}>

        {/* main item conent: name, background and image */}
        <div className="content">
          <img className="image" alt="user" src={this.props.image}></img>
          <div className="text">
            <h3>{this.props.name}</h3>
            <h4>{this.props.background}</h4>
          </div>

        {/* item issues bottom data slip */}
        </div>
          <ul className="slip fa-ul">

            {/* iterate bullets and create the issues */}
            {this.props.bullets.map(function (bullet, id) {
              // set list icon class name
              var liClass = classNames({
                fa: true,
                'fa-li': true,
                'fa-flag-checkered': bullet.type === 'feature',
                'fa-life-ring': bullet.type === 'issue',
                'fa-check-square-o': bullet.type === 'request'
              })

              // return bullet
              return (
                <li key={id}><i className={liClass}></i>{bullet.type}: {bullet.summary}</li>
              )
            })}
          </ul>
      </li>
    )
  }
}

/**
 * URL propType validation function
 * @param  props         props Recieved
 * @param  propName      name of the evaluated prop
 * @param  componentName name of the evaluating component
 * @return               true if is URL, false otherwise
 */
var isURL = function (props, propName, componentName) {
  // eslint-disable-next-line
  if (!/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)(~?[\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(props[propName])) {
    return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Recieved ' + props[propName] + '. Validation failed.'
    )
  }
}

// Props type validation
MenuItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  background: React.PropTypes.string.isRequired,
  image: isURL,
  bullets: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      summary: React.PropTypes.string.isRequired
    }).isRequired
  ),
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired
}

// export the MenuItem component
export default MenuItem
