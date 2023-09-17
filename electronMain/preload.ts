import { contextBridge, ipcRenderer } from 'electron'

const electronExpose = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  env: () => process.env.NODE_ENV,
  setCurrentWindowTitle: (title: string) => ipcRenderer.invoke<void>('setCurrentWindowTitle', title),
  openPrintWindow: <T = any>(pageOpt: T) => ipcRenderer.invoke('openPrintWindow', pageOpt),
  destroyCurrentWindow: () => ipcRenderer.invoke('destroyCurrentWindow'),
}

contextBridge.exposeInMainWorld('electronExpose', electronExpose)

export type ElectronExpose = typeof electronExpose
