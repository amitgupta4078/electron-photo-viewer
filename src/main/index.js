'use strict'

import { app, BrowserWindow, Menu } from 'electron'

import * as path from 'path'
import * as fs from 'fs'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  const template = [
    {
      label: 'open',
      submenu: [
        {
          label: 'Toggle developer tools',
          click () {
            mainWindow.toggleDevTools()
          }
        },
        {
          label: 'Quit',
          click () {
            app.exit(0)
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  let staticFolderPath = path.join(process.cwd(), 'static')

  fs.access(staticFolderPath, fs.constants.F_OK, (err) => {
    console.log(`static folder ${err ? 'does not exist' : 'exists'}`)
    fs.mkdir(staticFolderPath, (exception) => {
      console.log('Exception occured while creating static directory: ', exception)
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
