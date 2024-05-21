import { Code } from '@/core/data/base.data'
import { api } from '@/utils/api.utils'

const baseService = {
  // CodeController
  /** 자식 코드 그룹 목록 조회 */
  selectGroupByChildCodeList: (
    upCd: string,
    reqInit?: RequestInit,
  ): Promise<Code[]> =>
    api.get(`/api/codes/groupbyList/${upCd}`, undefined, reqInit),
}

export default baseService
