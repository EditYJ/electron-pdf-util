import qs from 'qs'
import { join } from 'path'

export const isDev = process.env.NODE_ENV === 'development'

export const preloadPath = join(__dirname, './preload.js')

/**
 * 获取loadUrl
 *
 * @param devPath 开发环境基础地址
 * @param proPath 真线环境基础地址
 * @param hash    hash值
 * @param query   query值
 * @returns
 */
export function getUrl(devPath: string, proPath: string, hash?: string, query?: any): string {
  const url = new URL(isDev ? devPath : proPath)
  let resHash = ''
  hash && (resHash += hash)
  query && (resHash += `?${qs.stringify(query)}`)
  url.hash = resHash
  return url.href
}

/**
 * 获取url，此函数包含了开发环境这真线环境的判断
 *
 * @param hash    hash值
 * @param query   query值
 * @returns
 */
export function getFullUrl(hash?: string, query?: any) {
  return getUrl(`${process.env.VITE_DEV_SERVER_URL}`, `file://${join(__dirname, '..', 'dist', 'index.html')}`, hash, query)
}
