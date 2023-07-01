import { configureStore } from '@reduxjs/toolkit'
import { githubApi } from './github/github.api'
import { githubReducer } from './github/github.slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { uiReducer } from './ui/ui.slice'

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
