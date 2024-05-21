'use client'

import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/store/features/loginUser/loginUser.slice'
import { Code } from '@/core/data/base.data'
import { useRouter } from 'next/navigation'
import { MemberDto } from '@/core/data/member.data'
import { authService, baseService } from '@/core/apis'
import { useClientApi } from '@/hooks'

type LoginForm = { userId: string; passwd: string }

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const loginUser = useAppSelector(state => state.loginUser.value)

  const { callApi: callLogin } = useClientApi<LoginForm, MemberDto>({
    api: authService.login,
    onSuccess: user => {
      console.log('user >>', user)
    },
  })

  const { callApi: callGetCodes } = useClientApi<string, Code[]>({
    api: baseService.selectGroupByChildCodeList,
    onSuccess: () => {},
  })

  const handleLogin = async () => {
    await callLogin({ userId: 'SADMIN', passwd: 'idrsys!2018' })
  }

  return (
    <main>
      <div className='text-red-200'>{loginUser?.name || '비회원'}</div>
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
