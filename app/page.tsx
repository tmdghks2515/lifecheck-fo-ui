'use client'

import { useAppDispatch, useAppSelector } from '@/store'
import { login, logout } from '@/store/features/authUser/authUser.slice'

export default function Home() {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(state => state.authUser.value)
  return (
    <main>
      {authUser?.name || '비회원'}
      <button
        type='button'
        onClick={() => {
          dispatch(login({ ci: '123123', name: '임승환' }))
        }}
      >
        로그인
      </button>
      <button
        type='button'
        onClick={() => {
          dispatch(logout())
        }}
      >
        로그아웃
      </button>
    </main>
  )
}
