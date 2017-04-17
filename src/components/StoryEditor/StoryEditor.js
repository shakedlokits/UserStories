import React, {Component, PropTypes} from 'react'
import {Editor, EditorState, RichUtils,
  ContentState, convertFromRaw, convertToRaw} from 'draft-js'
import {ButtonGroup, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateStory } from '../../actions/StoryActions'
import './StoryEditor.css'

// issue type styles
const customStyleMap = {
  FEATURE: {
    backgroundColor: 'rgba(255, 0, 0, 1.0)'
  },
  ISSUE: {
    backgroundColor: 'rgba(255, 127, 0, 1.0)'
  },
  REQUEST: {
    backgroundColor: 'rgba(180, 180, 0, 1.0)'
  }
}

// style list
const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD'
  }, {
    label: 'Italic',
    style: 'ITALIC'
  }, {
    label: 'Underline',
    style: 'UNDERLINE'
  }, {
    label: 'Feature',
    style: 'FEATURE'
  }, {
    label: 'Issue',
    style: 'ISSUE'
  }, {
    label: 'Request',
    style: 'REQUEST'
  }
]

export class StoryEditor extends Component {

  // initialize the editor with an empty state
  constructor(props) {
    super(props)

    // set up editor state and key bindings
    this.state = {
      editorState: EditorState.createWithContent(this.props.editorContent)
    }
    this.focus = () => this.refs.editor.focus()

    // update story and set editorState
    this.onChange = (editorState) => {
      this.setState({editorState: editorState})
      this.props.updateStory(
        this.state.editorState.getCurrentContent(),
        StoryEditor._getBullets(this.state.editorState)
      )
    }
    this.handleKeyCommand = this._handleKeyCommand.bind(this)
  }

  /**
   * given an inline style, return a function that toggles
   * that style for the selected editor text
   * @param  {string} inlineStyle INLINE_STYLES style string
   * @return {function}           function toggling specific style
   */
  _toggleInlineStyle(inlineStyle) {
    return () => this.onChange(function() {
      // save selection location and reselect after focus
      const selection = this.state.editorState.getSelection()
      this.focus()
      const newState = EditorState.forceSelection(this.state.editorState, selection)

      // set the toggled style
      return RichUtils.toggleInlineStyle(newState, inlineStyle)
    }.call(this))
  }

  /**
   * key command handler function
   * this function is accurate to the one mentioned in the documentation
   * @param  {string} command the key command executed by user
   * @return {string}         handled or not handled respective to execution status
   */
  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  /**
   * iterate the editors blocks and extracts the highlighted bullets
   * @return {Array} bullets array containing bullet objects
   */
  static _getBullets(editorState) {
    // set bullet accumulators and bullet list
    let accumulators = {
      'FEATURE': [],
      'ISSUE': [],
      'REQUEST': []
    }
    let bullets = []

    // iterate all the blocks and locate style ranges
    editorState.getCurrentContent().getBlockMap().forEach((block) => {
      block.findStyleRanges(() => true, (start, end) => {
        // get only custom styles (feature, issue, request)
        let blockTypes = Array.from(block.getInlineStyleAt(start).values())
        .filter((style) => {
          return Object.keys(customStyleMap).includes(style)
        })

        // iterate the type of bullets possible
        for (let typeKey in accumulators) {
          if (!accumulators.hasOwnProperty(typeKey)) continue

          // if a bullet exists, add it to the accumulator
          if (blockTypes.includes(typeKey)) {
            accumulators[typeKey].push(block.getText().substr(start, end - start))
          } else if (accumulators[typeKey].length) {
            // if the bullet does not exist but the
            // accumulator is not empty, add it to the bullets
            // and reset the accumulator
            bullets.push({
              type: typeKey.toLowerCase(),
              summary: accumulators[typeKey].join('')
            })
            accumulators[typeKey] = ''
          }
        }
      })
    })
    for (let typeKey in accumulators) {
      if (!accumulators.hasOwnProperty(typeKey)) continue
      if (accumulators[typeKey].length) {
        // if the bullet does not exist but the
        // accumulator is not empty, add it to the bullets
        // and reset the accumulator
        bullets.push({
          type: typeKey.toLowerCase(),
          summary: accumulators[typeKey].join('')
        })
      }
    }
    // return the bullets list
    return bullets
  }

  // render the editor
  render() {
    var currentStyle = this.state.editorState.getCurrentInlineStyle()
    return (
      <div className="StoryEditor">
        <ButtonGroup>
          {INLINE_STYLES.map((type) => <Button
            key={type.label}
            onClick={this._toggleInlineStyle(type.style).bind(this)}
            active={currentStyle.has(type.style)}>
            {type.label}
          </Button>)}
        </ButtonGroup>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          ref="editor"
          customStyleMap={customStyleMap}/>
      </div>
    )
  }
}

// Props type validation
StoryEditor.propTypes = {
  editorContent: PropTypes.instanceOf(ContentState).isRequired,
  updateStory: PropTypes.func.isRequired
}

// Default props for editorContent
StoryEditor.defaultProps = {
  editorContent: ContentState.createFromText('')
}

const mapStateToProps = (state) => {
  const editorContent = state['stories'][state['activeId']]['editorContent']
  return {
    editorContent: editorContent ? convertFromRaw(editorContent) : undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStory: (editorContent, bullets) => {
      dispatch(updateStory(convertToRaw(editorContent), bullets))
    }
  }
}

// export the Sidebar component
export default connect(mapStateToProps, mapDispatchToProps)(StoryEditor)
