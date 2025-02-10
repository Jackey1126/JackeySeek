import { post } from '@/utils/request.js'

export function seekApi(body) {
  return post('/generate', body)
}