const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#141726',
    icon: 'assets/notes.png',
    webPreferences: {
      nodeIntegration: true
    }
  });

  globalShortcut.register('CommandOrControl+R', function() {
    win.reload();
  });

  // and load the index.html of the app.
  win.loadFile('dist/index.html');
  win.removeMenu();

  win.webContents.openDevTools();
}

app.on('ready', createWindow);
