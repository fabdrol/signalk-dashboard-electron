'use strict'

/*
 * Copyright (c) 2017, Fabian Tollenaar <fabian@signalk.org>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const electron = require('electron')
const join = require('path').join
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let mainScreen = null
let mainWindow = null

function createWindow() {
  if (mainWindow !== null) {
    return
  }

  mainScreen = electron.screen.getPrimaryDisplay()

  mainWindow = new BrowserWindow({
    height: mainScreen.workAreaSize.height,
    width: 450,
    show: false,
    icon: join(__dirname, '../../resources/Icon.png'),
  })

  mainWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}`)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
    mainScreen = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    return
  }

  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

module.exports = {
  app,
  mainWindow,
}