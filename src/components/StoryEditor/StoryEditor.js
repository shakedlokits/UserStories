import React, {Component} from 'react'
import {Editor, EditorState, RichUtils, Modifier, CompositeDecorator} from 'draft-js'
import './StoryEditor.css'

class StoryEditor extends Component {

  // initialize the editor with an empty state
  constructor(props) {
    super(props)

    // set up decorators configuration
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: findEntities('FEATURE'),
        component: createHighlightComponent('feature')
      }, {
        strategy: findEntities('ISSUE'),
        component: createHighlightComponent('issue')
      }, {
        strategy: findEntities('REQUEST'),
        component: createHighlightComponent('request')
      }
    ])

    // set up editor state and key bindings
    // TODO: add full button toolbar
    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  _onButtonClick(entity) {
    return () => {
      // set new entity
      const contentState = this.state.editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(entity, 'MUTABLE', {})
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

      // create new state with entity embedded
      const contentStateWithLink = Modifier.applyEntity(contentState, this.state.editorState.getSelection(), entityKey)
      const newState = EditorState.push(this.state.editorState, contentStateWithLink)

      // update editor state
      this.onChange(newState)
    }
  }

  // handle key events for editor
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  // render the editor
  render() {
    return (
      <div className="StoryEditor">
        <button onClick={this._onButtonClick('FEATURE').bind(this)}>Bold</button>
        <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand}/>
      </div>
    )
  }
}

let findEntities = (entity) => {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity()
      return (entityKey !== null && contentState.getEntity(entityKey).getType() === entity)
    }, callback)
  }
}

/*eslint-disable */
const createHighlightComponent = (type) => {
  return (props) => {
    return (
      <span className={type} data-offset-key={props.offsetKey}>
        {props.children}
      </span>
    )
  }
}
/*eslint-enable */

export default StoryEditor
