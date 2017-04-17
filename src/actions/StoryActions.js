let nextStoryID = 4

// add new blank story
export const addStory = () => ({
  type: 'ADD_STORY',
  id: nextStoryID++
})

export const setActive = (id) => ({
  type: 'SET_ACTIVE',
  id: id
})

export const updateStory = (editorContent, bullets) => ({
  type: 'UPDATE_STORY',
  editorContent: editorContent,
  bullets: bullets
})
