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
    default:
      return state
  }
}

export default userStories
