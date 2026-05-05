import { serviceRegistry } from "./main/config/serviceRegistry";

export type IAppServices = typeof serviceRegistry;

declare global {
  interface IElectronAPI {
    version: string
    status: string
    invoke: <K extends keyof IAppServices, M extends keyof IAppServices[K]>(
      channel: K,
      method: M,
      ...args: IAppServices[K][M] extends (...args: infer A) => unknown ? A : never[]
    ) => IAppServices[K][M] extends (...args: never[]) => infer R
      ? Promise<Awaited<R>>
      : Promise<void>;
  }

  interface Window {
    api: IElectronAPI
    electron: {
      send: (channel: string, data?: unknown) => void
    }
  }
}

export {}
