import { UserDto } from '@/core/dtos/base.data'
import { api } from '@/utils/api'

const authService = {
  login: (params: { userId: string; passwd: string }): Promise<UserDto> =>
    api.post('/api/auth/login', params),

  logout: (): Promise<void> => api.post('/api/auth/logout'),
}

export default authService
