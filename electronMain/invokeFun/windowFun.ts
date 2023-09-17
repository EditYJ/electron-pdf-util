import { BrowserWindow, IpcMainInvokeEvent } from 'electron'

/** 销毁当前窗口 */
export function destroyCurrentWindow(e: IpcMainInvokeEvent) {
  const win = BrowserWindow.fromWebContents(e.sender)
  win?.destroy()
}

/** 设置当前窗口的标题 */
export async function setCurrentWindowTitle(e: IpcMainInvokeEvent, title: string) {
  const { sender: webContents } = e
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
}
