'use server'

import { cookies } from 'next/headers'
import { Code } from '@/core/data/base.data'
import { baseService } from '@/core/apis'
import { useServerApi } from '@/hooks'

export default async function Test() {
  const nextCookies = cookies()

  const { callApi } = useServerApi<string, Code[]>({
    api: baseService.selectGroupByChildCodeList,
    onSuccess: codes => {
      console.log('get result successfully >>', codes)
      console.log('qwe')
    },
    onError: err => {
      console.log('err >>', err)
    },
  })

  await callApi('ROLE_CODE')

  if (nextCookies.getAll().length === 0) return <>no cookie</>

  return nextCookies.getAll().map(cookie => {
    return (
      <div key={cookie.name}>
        <p>Name: {cookie.name}</p>
        <p>Value: {cookie.value}</p>
      </div>
    )
  })
}
