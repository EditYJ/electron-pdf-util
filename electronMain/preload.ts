import { PrinterInfo, WebContentsPrintOptions, contextBridge, ipcRenderer } from 'electron'
import { SpeechResponse } from './invokeFun/sound'

const electronExpose = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  env: () => process.env.NODE_ENV,
  setCurrentWindowTitle: (title: string) => ipcRenderer.invoke<void>('setCurrentWindowTitle', title),
  openPrintWindow: <T = any>(pageOpt: T) => ipcRenderer.invoke('openPrintWindow', pageOpt),
  destroyCurrentWindow: () => ipcRenderer.invoke('destroyCurrentWindow'),
  printCurrentPage: (options: WebContentsPrintOptions) => ipcRenderer.invoke('printCurrentPage', options),
  getPrinterList: () => ipcRenderer.invoke<PrinterInfo[]>('getPrinterList'),
  speechText: (message: string) => ipcRenderer.invoke('speechText', message),
  speechEnd: (callback: (event: Electron.IpcRendererEvent, resp: SpeechResponse) => void) =>
    ipcRenderer.on('speech-end', callback),
}

contextBridge.exposeInMainWorld('electronExpose', electronExpose)

export type ElectronExpose = typeof electronExpose
