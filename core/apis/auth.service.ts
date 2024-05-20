import { UserDto } from '@/core/data/base.data'
import { apiUtils } from '@/utils/api.utils'

const authService = {
  login: (params: { userId: string; passwd: string }): Promise<UserDto> =>
    apiUtils.post('/api/auth/login', params),

  logout: (): Promise<void> => apiUtils.post('/api/auth/logout'),
}

export default authService
