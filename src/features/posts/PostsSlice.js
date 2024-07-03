import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: {
      reducer(state, action) {
        const { postId, reaction } = action.payload
        const existingPost = state.posts.find((post) => post.id === postId)
        console.log('existingPost', existingPost, reaction, postId, state)
        if (existingPost) {
          existingPost.reactions[reaction]++
        }
      },
    },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        }
      },
    },

    postEdited: {
      reducer(state, action) {
        const { id, title, content } = action.payload

        const post = state.posts.find((post) => post.id === id)

        if (post) {
          post.title = title
          post.content = content
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export const { postAdded, postEdited, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, id) =>
  state.posts.posts.find((post) => post.id === id)
