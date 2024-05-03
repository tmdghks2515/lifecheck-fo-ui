import { combineReducers, UnknownAction } from 'redux'
import { AuthUser, authUserReducer } from '@/store/slices/authUser.slice'
import { HYDRATE } from 'next-redux-wrapper'
import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import { CombinedState } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'

interface RootStore {
  authUser: { value?: AuthUser }
}

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
})

const rootReducer = (
  state: RootStore,
  action: UnknownAction,
): CombinedState<RootStore> => {
  if (action.type === HYDRATE) {
    // SSR 작업 수행 시 HYDRATE 라는 액션을 통해서 서버의 스토어와 클라이언트의 스토어를 합쳐주는 작업을 수행
    return action.payload
  }
  return combineReducers({
    // 정의한 리듀서 모듈들을 결합
    authUser: authUserReducer,
  })(state, action)
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>

export default store
