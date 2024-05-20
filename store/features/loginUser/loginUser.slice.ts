import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LoginUser = {
  ci: string
  name: string
}

const initialState: { value?: LoginUser } = {
  value: undefined,
}

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginUser>) => {
      state.value = payload
    },
    logout: state => {
      state.value = undefined
    },
  },
})

export const { login, logout } = loginUserSlice.actions

export const { reducer: loginUserReducer } = loginUserSlice
