import { IUser } from './../../types/github/github'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GithubState {
  users: IUser[] | null
  usersIsLoading: boolean
  user: IUser | null
}

const initialState: GithubState = {
  users: null,
  usersIsLoading: false,
  user: null,
}

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    clearUsers(state) {
      state.users = null
    },
    setUsersIsLoading(state, action: PayloadAction<boolean>) {
      state.usersIsLoading = action.payload
    },
  },
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer
