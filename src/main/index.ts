import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import 'dotenv/config'
import { IPCManager } from './config/IPCManager'
import { serviceRegistry } from './config/serviceRegistry'
import { StorageService } from './app/services'

let splashWindow: BrowserWindow | null = null;
let loginWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

function setupIPC() {
  Object.entries(serviceRegistry).forEach(([channel, instance]) => {
    IPCManager.registerService(channel, instance);
  });

  ipcMain.on('ready', (event, authenticated: boolean) => {
    if (authenticated) {
      createMainWindow();
    } else {
      createLoginWindow();
    }
  });

  ipcMain.on('logout', () => {
    StorageService.deleteToken();
    createLoginWindow();
  });

  ipcMain.on('auth-success', (event, sessionData) => {
    StorageService.saveToken(JSON.stringify(sessionData));
    createMainWindow();
  });
}

function createSplashWindow() {
  splashWindow = new BrowserWindow({
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
    ? 'http://localhost:5173/splash.html/#/?mode=initial_boot'
    : path.join(__dirname, '../renderer/splash.html/#/?mode=initial_boot');

  splashWindow.loadURL(url);
  closeLoginWindow();
  closeMainWindow();
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
  closeSplashWindow();
  closeMainWindow();
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
  closeLoginWindow();
  closeSplashWindow();
}

function closeSplashWindow() {
  if (splashWindow) {
    splashWindow.close();
    splashWindow = null;
  }
}

function closeLoginWindow() {
  if (loginWindow) {
    loginWindow.close();
    loginWindow = null;
  }
}

function closeMainWindow() {
  if (mainWindow) {
    mainWindow.close();
    mainWindow = null;
  }
}

app.whenReady().then(async () => {
  setupIPC();
  createSplashWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
