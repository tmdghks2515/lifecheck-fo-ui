'use client'

import { useAppDispatch, useAppSelector } from '@/store'
import { login, logout } from '@/store/features/authUser/authUser.slice'
import useApi from '@/hooks/useClientApi'
import { Code, UserDto } from '@/core/dtos/base.data'
import authService from '@/core/apis/auth.service'
import baseService from '@/core/apis/base.service'
import { useRouter } from 'next/navigation'

type LoginForm = { userId: string; passwd: string }

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(state => state.authUser.value)

  const { callApi: callLogin } = useApi<LoginForm, UserDto>({
    api: authService.login,
    onSuccess: user => {
      console.log('user >>', user)
    },
  })

  const { callApi: callGetCodes } = useApi<string, Code[]>({
    api: baseService.selectGroupByChildCodeList,
    onSuccess: () => {},
  })

  const handleLogin = async () => {
    await callLogin({ userId: 'SADMIN', passwd: 'idrsys!2018' })
  }

  return (
    <main>
      <div className='text-red-200'>{authUser?.name || '비회원'}</div>
      <button type='button' onClick={handleLogin}>
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
      <div>
        <button type='button' onClick={() => callGetCodes('ROLE_CODE')}>
          get code
        </button>
      </div>
      <div>
        <button type='button' onClick={() => router.push('/test')}>
          test
        </button>
      </div>
    </main>
  )
}
