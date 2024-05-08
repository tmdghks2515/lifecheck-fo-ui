/** springframework.data.domain.Page */
type Page<T> = {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number // 현재 페이지 넘버 (0 이 1 페이지 를 의미 함)
  numberOfElements: number
  size: number
  totalElements: number
  totalPages: number
}

type PageParams = {
  page?: number
  size?: number
}

type SearchParams = {
  searchType: string
  searchVal: string
}

type SearchParamsManufacturer = {
  searchName: string | null
  searchArea: string | null
  searchRegion: string | null
}

type HeaderParams = {
  mallNo: string
  locale: string
}

type OptionVal = string | number | boolean | undefined

type Option = {
  val: OptionVal
  txt: string
}

export type {
  Page,
  PageParams,
  SearchParams,
  SearchParamsManufacturer,
  HeaderParams,
  Option,
  OptionVal,
}
