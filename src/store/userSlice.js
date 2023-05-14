import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
  username: "initial",
  Client: {},
  isLoggedIn: false
}]

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      let ran = false
      state.forEach(person => {
        if (person.username === action.payload.username) {
          person.isLoggedIn = true
          ran = true
        }
      })
      if (!ran) {
        state.push({
          username: action.payload.username,
          Client: action.payload,
          isLoggedIn: true
        })
      }
    },
    signOut: (state, action) => {
      state.forEach(person => {
        if(person.username === action.payload.username) {
          person.isLoggedIn = false
        }
      })
    }
  }
})

export const {
  signIn,
  signOut
} = userSlice.actions

export default userSlice.reducer
