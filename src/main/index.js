import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron' // eslint-disable-line
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';// eslint-disable-line
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
const isDevelopment = process.env.NODE_ENV !== 'development';
let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

function createWindow() {
    /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
        useContentSize: true,
        width: 1200, // 设置窗口的宽
        height: 620, // 设置窗口的高
        frame: false, // 去掉外边框
        webPreferences: {
            webSecurity: false, // 是否禁用浏览器的跨域安全特性
            nodeIntegration: true, // 是否完整支持node
        },
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // 监听窗口大小变化 主动发送消息给渲染进程
    mainWindow.on('maximize', () => {
        // 通知web页面更改图标
        mainWindow.webContents.send('isMax', mainWindow.isMaximized()); // 主进程发送信息到渲染进程。
    });

    mainWindow.on('unmaximize', () => {
        // 通知web页面更改图标
        mainWindow.webContents.send('unmaximize', mainWindow.isMaximized()); // 主进程发送信息到渲染进程。
    });
}

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        if (isDevelopment && !process.env.IS_TEST) {
            // Install Vue Devtools
            try {
                await installExtension(VUEJS_DEVTOOLS);
            } catch (e) {
                console.error('Vue Devtools failed to install:', e.toString());
            }
        }
    }

    globalShortcut.register('CommandOrControl+Shift+i', () => {
        mainWindow.webContents.openDevTools();
    });
    createWindow();
});

app.setUserModelId('com.electron.my-project');
app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+i');

    // 注销所有快捷键
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


ipcMain.on('close', () => {
    mainWindow.close();
});

ipcMain.on('minimize', () => {
    mainWindow.minimize();
});

ipcMain.on('unmaximize', () => {
    mainWindow.unmaximize();
});

ipcMain.on('maximize', () => {
    mainWindow.maximize();
});

// 主进程接收渲染进程发送参数，对窗口大小设置
ipcMain.on('changWindowSize', (event, arg) => {
    const { width, height } = arg;
    // console.log(arg, 'resize');
    mainWindow.setSize(width, height);
});

/**
 * 打开新窗口
 */
// 定义calendar窗体
let calendarWin;
// 创建calendar窗口方法
function openCalendarWindow() {
    calendarWin = new BrowserWindow({
        width: 400,
        height: 550,
        parent: mainWindow, // win是主窗口
        webPreferences: {
            nodeIntegration: true,
        },
    });
    calendarWin.loadURL(`${winURL}/home/calendar`);
    // calendarWin.loadURL('http://127.0.0.1/index.html')
    calendarWin.on('closed', () => { calendarWin = null; });
}
ipcMain.on('openCalendarWindow', () =>
    openCalendarWindow());

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */