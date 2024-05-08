type Props<T, D> = {
  api: (params: T, reqInit?: RequestInit) => Promise<D>
  onSuccess?: (data: D, params?: T) => void
  onError?: (err: Error) => void
  onComplete?: () => void
}

const useClientApi = <T, D>({
  api,
  onSuccess,
  onError,
  onComplete,
}: Props<T, D>) => {
  const callApi = async (params: T, reqInit?: RequestInit) =>
    api(params, reqInit)
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

export default useClientApi
