import { baseURL }  from '@/service/http'

export function coverURL(coverName: string) {
  return `${baseURL}${coverName}`
}