type UserDto = {
  ci: string
  name: string
}

type ErrorMessage = {
  errCode: string
  errType: string
  message: string
}

type Code = {
  cd: string
  upCd: string
  codeName: string
  labelId: string
  depth: number
  etc1: string
  etc2: string
  etc3: string
  dispOrder: number
  enumName: string
  codeNote: string
  delYn: boolean
}

export type { ErrorMessage, UserDto, Code }
