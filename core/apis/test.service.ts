import { get } from '@/hooks/useServerApi'

const testService = {
  getCode: (params: any): any => get(''),
}

export default testService
