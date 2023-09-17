import { message } from 'ant-design-vue'
import { MSG_KEY } from './const'

/**
 * 传入file类型的文件，得到base64 url
 *
 * 大文件建议不要使用，转换时间过长
 * 如果是只是想获取文件的url链接，大文件可以使用getMemoryUrl
 */
export function getBase64(blob: Blob) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.readAsDataURL(blob)
  })
}

/**
 * 获取文件本地内存地址url
 *
 * @param revokeTime 内存地址释放时间 默认40s
 */
export function getMemoryUrl(blob: Blob, revokeTime = 999999999) {
  const url = URL.createObjectURL(blob)

  const revokeUrl = () => {
    URL.revokeObjectURL(url)
  }
  // 释放
  revokeTime && setTimeout(() => URL.revokeObjectURL(url), revokeTime)
  return { url, revokeUrl }
}

/**
 * base64转Blob
 *
 * @param base64Url base64字符串
 */
export function base64ToBlob(base64Url: string) {
  if (base64Url.includes('base64')) {
    const arr = base64Url.split(',')
    let mime: string | undefined
    if (arr.length >= 2) {
      const mimeWrapper = arr[0].match(/:(.*?);/)
      if (mimeWrapper) {
        mime = mimeWrapper[1]
      }
      const bstr = window.atob(arr[1])
      let bstrLength = bstr.length
      const u8arr = new Uint8Array(bstrLength)
      while (bstrLength--) {
        u8arr[bstrLength] = bstr.charCodeAt(bstrLength)
      }
      const blobRes = new Blob([u8arr], { type: mime })
      return blobRes
    }
  }
}

/**
 * blob转File
 */
export function getFileFormBlob(blob: Blob, type?: string, fileName = 'unknown_filename') {
  return new File([blob], fileName, { type: type || blob.type })
}

/**
 * 调用浏览器本身的功能进行简单的下载
 *
 * @param url 文件地址
 * @param fileName 文件名
 */
export function simpleDownload(url: string | Blob, fileName = 'unknown_file') {
  let realUrl: string
  if (typeof url === 'string') {
    realUrl = url
  } else {
    const { url: blobInstance } = getMemoryUrl(url)
    realUrl = blobInstance
  }
  if (realUrl) {
    let aLink: HTMLAnchorElement | null = document.createElement('a')
    // 将数据给到链接
    aLink.href = realUrl
    // 设置文件名
    aLink.download = fileName
    // 触发点击事件开始下载
    aLink.click()
    aLink = null
  } else {
    throw new Error('url不合法')
  }
}

/**
 * 检查文件是否符合要求的帮助函数
 */
export function checkFile(file: File, opt: { showMsg?: boolean; uploadFileType?: string[] | false; maxFileSize?: number } = {}) {
  const { showMsg = false, uploadFileType = ['image/jpeg', 'image/png'], maxFileSize = 1024 * 1042 * 10 } = opt

  const isAcceptType = uploadFileType === false ? true : uploadFileType.includes(file.type)
  const isLt10M = file.size < maxFileSize

  showMsg && !isAcceptType && message.error({ content: '不支持的文件类型!', key: MSG_KEY })
  showMsg && !isLt10M && message.error({ content: `文件大小不能超过 ${maxFileSize / 1024 / 1024}MB!`, key: MSG_KEY })

  return isAcceptType && isLt10M
}
