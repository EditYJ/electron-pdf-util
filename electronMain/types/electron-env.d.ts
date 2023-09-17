/// <reference types="vite-plugin-electron/electron-env" />

import { ElectronExpose } from '../preload'

declare namespace NodeJS {
  interface ProcessEnv {
    // DIST: string
    // PUBLIC: string
  }
}

declare global {
  const electronExpose: ElectronExpose
  interface Window {
    electronExpose: ElectronExpose
  }
}
