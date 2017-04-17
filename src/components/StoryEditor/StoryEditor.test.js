import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme'
import {StoryEditor} from './StoryEditor'
import {convertFromRaw} from 'draft-js'

// set global parameters
let updateStory
let contentState

// initialize content state
beforeAll(() => {
  contentState = convertFromRaw({
    blocks: [
      {
        text: ('feature, issue, request, unstyled.'),
        type: 'unstyled',
        inlineStyleRanges: [
          {
            offset: 0,
            length: 7,
            style: 'FEATURE'
          }, {
            offset: 9,
            length: 5,
            style: 'ISSUE'
          }, {
            offset: 16,
            length: 7,
            style: 'REQUEST'
          }
        ]
      }
    ],
    entityMap: {}
  })
})

// initialize parameter before each run
beforeEach(() => {
  updateStory = jest.fn()
})

// smoke test
it('updates state correctly', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <StoryEditor updateStory={updateStory} editorContent={undefined}/>, div)
})

describe('test editor section', () => {
  // set editor testing globals
  let storyEditor
  beforeEach(() => {
    storyEditor = shallow(<StoryEditor updateStory={updateStory} editorContent={contentState}/>)
  })

  it('triggers update', () => {
    const editorProps = storyEditor.find('DraftEditor').props()
    editorProps.onChange(editorProps.editorState)

    expect(updateStory).toHaveBeenCalled()
  })

  it('loads expected bullets', () => {
    const editorProps = storyEditor.find('DraftEditor').props()
    editorProps.onChange(editorProps.editorState)

    expect(updateStory.mock.calls[0][1]).toHaveLength(3)
  })

  it('_getBullets collects correct bullets', () => {
    const editorState = storyEditor.find('DraftEditor').props().editorState
    const parsedBullets = StoryEditor._getBullets(editorState)
    const expectedBullets = [
      {
        type: 'feature',
        summary: 'feature'
      }, {
        type: 'issue',
        summary: 'issue'
      }, {
        type: 'request',
        summary: 'request'
      }
    ]

    expect(parsedBullets).toHaveLength(3)
    expect(parsedBullets).toEqual(expect.arrayContaining(expectedBullets))
  })
})

describe('test editor controls', () => {
  // set editor controls globals
  let storyEditor
  beforeEach(() => {
    storyEditor = mount(<StoryEditor updateStory={updateStory} editorContent={contentState}/>)
  })

  it.skip('test control button calls update', () => {
    const boldButton = storyEditor.find('ButtonGroup').childAt(0)

    // TODO: create button test when jest will be updated to v19 with spyOn
    // https://github.com/facebookincubator/create-react-app/issues/1604
    // let spy = jest.spyOn(storyEditor, '_toggleInlineStyle')

    boldButton.simulate('click')
    // expect(spy).toHaveBeenCalled()
  })
})
