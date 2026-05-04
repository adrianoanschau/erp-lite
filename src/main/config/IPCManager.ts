import { ipcMain } from 'electron'

export class IPCManager {
  static registerService<T extends object>(channel: string, service: T) {
    // Registra cada método do serviço como um canal IPC
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(service))
    
    methods.forEach(method => {
      if (method !== 'constructor') {
        const fn = (service as Record<string, unknown>)[method]
        if (typeof fn === 'function') {
          ipcMain.handle(`${channel}:${method}`, (_, ...args) => fn.apply(service, args))
        }
      }
    })
  }
}
