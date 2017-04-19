'use strict';

var electron = require('electron');

// Module to control application life.

var app = electron.app;

// Module to create native browser window.

var BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't,the window will

// be closed automatically when the JavaScript object is garbagecollected.

var mainWindow;

function createWindow () {

  // Create the browserwindow.

  mainWindow = new BrowserWindow({
      width: 800, height: 600,
      autoHideMenuBar: true,
      frame: true,
      resizable: true,
      icon: './image/icon.png',
      center: true,
      webPreferences: {
          javascript: true,
          plugins: true,
          webSecurity: false
          //preload: path.join(__dirname, '../../inject/preload.js'),
      }
  });

  // and load theindex.html of the app.

 mainWindow.loadURL('file://' + __dirname + '/index.html');

// mainWindow.loadURL("http:192.168.1.182:3008");

// mainWindow.webContents.executeJavaScript(`
//     var path = require('path');
//     module.paths.push(path.resolve('node_modules'));
//     module.paths.push(path.resolve('../node_modules'));
//     module.paths.push(path.resolve(__dirname, '..', '..', 'electron', 'node_modules'));
//     module.paths.push(path.resolve(__dirname, '..', '..', 'electron.asar', 'node_modules'));
//     module.paths.push(path.resolve(__dirname, '..', '..', 'app', 'node_modules'));
//     module.paths.push(path.resolve(__dirname, '..', '..', 'app.asar', 'node_modules'));
//     path = undefined;
//   `);

  // close the DevTools.

 mainWindow.webContents.closeDevTools();

  // Emitted when thewindow is closed.

  mainWindow.on('closed',function() {

    // Dereference thewindow object, usually you would store windows

    // in an array if yourapp supports multi windows, this is the time

    // when you shoulddelete the corresponding element.

    mainWindow = null;

  });

}

// This method will be called when Electron has finished

// initialization and is ready to create browser windows.


app.on('ready', createWindow);

// Quit when all windows are closed.

app.on('window-all-closed', function () {

  // On OS X it is commonfor applications and their menu bar

  // to stay active untilthe user quits explicitly with Cmd + Q

  if (process.platform !=='darwin') {

    app.quit();

  }

});

app.on('activate', function () {

  // On OS X it's commonto re-create a window in the app when the

  // dock icon is clickedand there are no other windows open.

  if (mainWindow === null){

    createWindow();

  }

});