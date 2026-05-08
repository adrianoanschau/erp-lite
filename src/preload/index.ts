import { contextBridge, ipcRenderer } from 'electron';
import pkg from '../../package.json';

contextBridge.exposeInMainWorld('api', {
  status: 'online',
  version: pkg.version,
  invoke: (channel: string, method: string, ...args: unknown[]) =>
    ipcRenderer.invoke(`${channel}:${method}`, ...args),
});

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data?: unknown) => {
    const validChannels = [
      'window:minimize',
      'window:maximize',
      'ready',
      'auth-success',
      'logout',
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});

contextBridge.exposeInMainWorld('controls', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
});
