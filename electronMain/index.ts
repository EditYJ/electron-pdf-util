import { app, BrowserWindow } from 'electron'
import { createBootstrapWindow } from './utils/window'
import registerInvokeFun from './invokeFun'

const bootstrap = async () => {
  await app.whenReady()
  registerInvokeFun()
  createBootstrapWindow()
  app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createBootstrapWindow())
}

bootstrap()
