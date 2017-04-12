let nextStoryID = 4

// add new blank story
export const addStory = () => ({
  type: 'ADD_STORY',
  id: nextStoryID++
})
