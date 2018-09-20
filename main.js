// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const express = require('express')
const expressApp = express()
const port = process.env.NODE_PORT || 8888

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  expressApp.use(express.static('./static'))

  const server = require('http').createServer(expressApp)
  const io = require('socket.io')(server)

  server.listen(port, () => console.log(`Server listening on port ${port}`))

  io.on('connection', handleConnection)

  function handleConnection(socket) {
    console.log(`socket connection made, socket id: ${socket.id}`)

    socket.on('rtc-message', payload => {
      console.log('rtc-message called on socket id: ', payload)
      socket.broadcast.emit('rtc-message', payload)
    })
  }
  
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
