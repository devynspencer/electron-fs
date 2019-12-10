const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const util = require('util');
const stat = util.promisify(fs.stat);

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../index.html'));
});

ipcMain.on('files', async (event, files) => {
  try {
    // Asynchronously get file data
    const data = await Promise.all(
      files.map(async ({ name, pathName }) => ({
        ...(await stat(pathName)),
        name,
        pathName
      }))
    );

    mainWindow.webContents.send('metadata', data);
  } catch (error) {
    mainWindow.webContents.send('metadata:error', error);
  }
});
