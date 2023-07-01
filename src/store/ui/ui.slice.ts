import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAlert {
  msg: string
  type: string
}

interface UiState {
  alert: IAlert | null
}

const initialState: UiState = {
  alert: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<IAlert>) {
      state.alert = action.payload
    },
    removeAlert(state) {
      state.alert = null
    },
  },
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer
