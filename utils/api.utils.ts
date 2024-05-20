import { stringify } from 'qs'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const makeRequest = async <T, D>(
  method: HTTPMethod,
  path: string,
  params?: T,
  reqInit?: RequestInit,
): Promise<D> => {
  const isServer = typeof window === 'undefined'
  let url = isServer
    ? `${process.env.NEXT_PUBLIC_BO_GW_API_URL}${path}`
    : `${path}`

  // request body를 세팅합니다
  const requestBody =
    method !== 'GET' && params ? JSON.stringify(params) : undefined
  // 쿼리스트링을 세팅합니다
  if (method === 'GET' && params) url += `?${stringify(params)}`

  const res = await fetch(url, {
    ...reqInit,
    headers: {
      ...reqInit?.headers,
      'Content-Type': 'application/json',
    },
    method,
    credentials: 'include',
    body: requestBody,
  })

  if (res.ok) {
    return res.json()
  }
  return Promise.reject(new Error(`${res.status}:${res.statusText}`))
}

const get = async <T, D>(
  path: string,
  params?: T,
  reqInit?: RequestInit,
): Promise<D> => makeRequest<T, D>('GET', path, params, reqInit)
const post = async <T, D>(
  path: string,
  params?: T,
  reqInit?: RequestInit,
): Promise<D> => makeRequest<T, D>('POST', path, params, reqInit)
const put = async <T, D>(
  path: string,
  params?: T,
  reqInit?: RequestInit,
): Promise<D> => makeRequest<T, D>('PUT', path, params, reqInit)
const patch = async <T, D>(
  path: string,
  params?: T,
  reqInit?: RequestInit,
): Promise<D> => makeRequest<T, D>('PATCH', path, params, reqInit)
const remove = async <T, D>(
  path: string,
  params?: T,
  reqInit?: RequestInit,
): Promise<D> => makeRequest<T, D>('DELETE', path, params, reqInit)

export const apiUtils = { get, post, put, patch, remove }
