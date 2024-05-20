'use server'

import { cookies } from 'next/headers'

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || ''
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || ''

type Props<T, D> = {
  api: (params: T, reqInit?: RequestInit) => Promise<D>
  onSuccess?: (data: D, params?: T) => void
  onError?: (err: Error) => void
  onComplete?: () => void
}

const useServerApi = <T, D>({
  api,
  onSuccess,
  onError,
  onComplete,
}: Props<T, D>) => {
  const makeCookieHeader = () => {
    const nextCookies = cookies()

    let Cookie = ''
    const accessToken = nextCookies?.get(ACCESS_TOKEN_KEY)?.value
    const refreshToken = nextCookies?.get(REFRESH_TOKEN_KEY)?.value
    if (accessToken) Cookie += `${ACCESS_TOKEN_KEY}=${accessToken};`
    if (refreshToken) Cookie += `${REFRESH_TOKEN_KEY}=${refreshToken};`

    return Cookie
  }

  // SSR 에서의 apiUtils 통신에서는 쿠키를 수동으로 설정해줘야 됩니다. (CSR 에서는 웹브라우저가 자동으로 설정해줍니다.)
  const makeReqInit = (reqInit?: RequestInit) => ({
    ...reqInit,
    headers: { Cookie: makeCookieHeader(), ...reqInit?.headers },
  })

  const callApi = async (params: T, reqInit?: RequestInit) =>
    api(params, makeReqInit(reqInit))
      .then(data => {
        if (onSuccess) onSuccess(data)
      })
      .catch(err => {
        if (onError) onError(err)
      })
      .finally(() => {
        if (onComplete) onComplete()
      })

  return { callApi }
}

export default useServerApi
