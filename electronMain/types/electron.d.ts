declare namespace Electron {
  export interface IpcRenderer {
    invoke<T = any>(channel: string, ...args: any[]): Promise<T>
  }
}
