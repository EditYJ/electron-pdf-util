import { BrowserWindow } from 'electron'
import { getFullUrl, isDev, preloadPath } from './common'
import { join } from 'path'

export function createBootstrapWindow(title = 'Main window') {
  const win = new BrowserWindow({
    title: title,
    fullscreen: false,
    frame: true,
    height: 300,
    width: 350,
    icon: join(__dirname, '../dist/favicon.ico'),
    webPreferences: {
      preload: preloadPath,
      devTools: isDev,
      webSecurity: false,
    },
  })

  win.loadURL(getFullUrl('/'))
}
