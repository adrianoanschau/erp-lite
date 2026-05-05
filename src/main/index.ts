import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import 'dotenv/config'
import { IPCManager } from './config/IPCManager'
import { serviceRegistry } from './config/serviceRegistry'
import { StorageService } from './app/services'

let loginWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

function setupIPC() {
  Object.entries(serviceRegistry).forEach(([channel, instance]) => {
    IPCManager.registerService(channel, instance);
  });

  ipcMain.on('auth-success', (event, sessionData) => {
    StorageService.saveToken(JSON.stringify(sessionData));

    createMainWindow();
    if (loginWindow) loginWindow.close();
  });

  ipcMain.on('logout', () => {
    StorageService.deleteToken();

    createLoginWindow();
    if (mainWindow) {
      mainWindow.close();
      mainWindow = null;
    }
  });
}

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
    }
  });

  const url = (process.env.NODE_ENV === 'development' || !app.isPackaged)
    ? 'http://localhost:5173/login.html'
    : path.join(__dirname, '../renderer/login.html');

  loginWindow.loadURL(url);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 960,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 0,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
    }
  });

  const url = (process.env.NODE_ENV === 'development' || !app.isPackaged)
    ? 'http://localhost:5173'
    : path.join(__dirname, '../renderer/index.html');

  mainWindow.loadURL(url);
  mainWindow.maximize();
}

app.whenReady().then(async () => {
  setupIPC();
  const savedSession = StorageService.getToken();

  if (savedSession) {
    return createMainWindow();
  }

  createLoginWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
