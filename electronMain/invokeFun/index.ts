import { ipcMain } from 'electron'
import { destroyCurrentWindow, setCurrentWindowTitle } from './windowFun'

export default function registerInvokeFun() {
  ipcMain.handle('setCurrentWindowTitle', setCurrentWindowTitle)
  ipcMain.handle('destroyCurrentWindow', destroyCurrentWindow)
}
