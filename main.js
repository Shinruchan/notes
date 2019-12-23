const { app, BrowserWindow, globalShortcut } = require('electron');


function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#141726',
    icon: 'assets/icons/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  });

  globalShortcut.register('CommandOrControl+R', function() {
    win.reload();
  });

  // and load the index.html of the app.
  win.loadFile('app-dist/index.html');
  win.removeMenu();

  if (!app.isPackaged) win.webContents.openDevTools();
}

app.on('ready', createWindow);
