import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthUser = {
  ci: string
  name: string
}

const initialState: { value?: AuthUser } = {
  value: undefined,
}

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthUser>) => {
      state.value = payload
    },
    logout: state => {
      state.value = undefined
    },
  },
})

export const { login, logout } = authUserSlice.actions

export const { reducer: authUserReducer } = authUserSlice
