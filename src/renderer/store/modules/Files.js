import Electron from 'electron'
import * as fs from 'fs'
import * as path from 'path'

const state = {
  filePaths: [],
  fileNames: []
}

const getters = {
  filePaths: state => {
    return state.filePaths
  },
  fileNames: state => {
    return state.fileNames
  },
  imagesCount: state => {
    return state.filePaths.length
  }
}

const mutations = {
  saveSelectedFiles (state, payload) {
    state.filePaths = payload.filePaths
  },
  convertPathToNames (state, payload) {
    state.fileNames = state.filePaths.map((filepath) => {
      return path.basename(filepath)
    })
  }
}

const actions = {
  copyFileUtil ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      let filename = path.basename(payload.srcPath)
      let src = payload.srcPath
      let destDir = payload.destPath
      fs.access(destDir, (err) => {
        if (err) { reject(new Error(err)) }

        let readStream = fs.createReadStream(src)
        readStream.once('error', (err) => {
          reject(new Error(err))
        })
        readStream.once('end', () => {
          resolve()
        })
        readStream.pipe(fs.createWriteStream(path.join(destDir, filename)))
      })
    })
  },
  copyFiles ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      let promisesArray = []
      const destPath = path.join(process.cwd(), 'static')
      console.log(destPath)
      payload.files.forEach((path, index) => {
        promisesArray.push(dispatch('copyFileUtil', {'srcPath': path, 'destPath': destPath, 'index': index}))
      })
      Promise.all(promisesArray).then(values => {
        resolve()
      }, error => {
        reject(new Error(error))
      })
    })
  },
  showFileBrowserDialog ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        let config = {
          title: 'Choose an image',
          buttonLabel: 'Select',
          filters: [
            {name: 'Images', extensions: ['jpg', 'png', 'gif']}
          ],
          properties: ['openFile', 'multiSelections']
        }

        const dialog = Electron.dialog || Electron.remote.dialog
        dialog.showOpenDialog(config, (files) => {
          dispatch('copyFiles', {'files': files}).then((response) => {
            commit('saveSelectedFiles', {'filePaths': files})
            commit('convertPathToNames', {'filePaths': files})
            resolve()
          }, (exception) => {
            reject(exception)
          })
        })
      } catch (exc) {
        reject(exc)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
