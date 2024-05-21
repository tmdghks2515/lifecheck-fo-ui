import { api } from '@/utils/api.utils'
import { MemberDto } from '@/core/data/member.data'

const authService = {
  login: (params: { userId: string; passwd: string }): Promise<MemberDto> =>
    api.post('/api/auth/login', params),

  logout: (): Promise<void> => api.post('/api/auth/logout'),
}

export default authService
