export const getImageWH = async (url: string): Promise<{ width: number; height: number }> => {
  const img = new Image()
  img.src = url
  if (img.complete) {
    return { width: img.width, height: img.height }
  } else {
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => {
        reject('图片加载失败')
      }
    })
  }
}
