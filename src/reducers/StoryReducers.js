function updateStory(state, id, updatedPrameters) {
  return Object.assign({}, state, {
    stories: state.stories.map((story) => {
      if (story.id === id) {
        return Object.assign({}, story, updatedPrameters)
      }
      return story
    })
  })
}

function userStories (state, action) {
  switch (action.type) {
    case 'ADD_STORY':
      return Object.assign({}, state, {
        stories: [...state.stories,
          {
            id: action.id,
            name: '',
            background: '',
            image: '',
            bullets: [],
            isSelected: false
          }]
      })
    case 'SET_ACTIVE':
      return Object.assign({}, updateStory(updateStory(state, action.id, {
        isSelected: true
      }), state.activeId, {
        isSelected: false
      }, {
        activeId: action.id
      }))
    case 'UPDATE_STORY':
      return Object.assign({}, state,
        updateStory(state, action.id, {
          bullets: action.bullets,
          editorContent: action.editorContent
        }))
    default:
      return state
  }
}

export default userStories
