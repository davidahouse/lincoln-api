const fs = require('fs')
const homedir = require('os').homedir()
const moment = require('moment')
const path = require('path')

/**
* This class implements an interface to a Lincoln vault, which is the
* top level data structure used in the Lincoln app file system.
*/
class LincolnVault {
  /**
  * Constructor for the LincolnVault class
  * @param {string} vault The name of the vault
  */
  constructor(vault) {
    const self = this
    this.vault = vault
    this.vaultConfigPath = homedir + '/Library/Application Support/com.repairward.lincoln/vaults/'
    if (fs.existsSync(this.vaultConfigPath + vault + '.vaultConfig')) {
      const contents = fs.readFileSync(this.vaultConfigPath + vault + '.vaultConfig')
      this.config = JSON.parse(contents)
    } else {
      this.config = {}
    }

    this.allVaults = function(callback) {
      fs.readdir(self.vaultConfigPath, callback)
    }

    this.contents = function(container, callback) {
      fs.readdir(this.pathFor(container), callback)
    }

    this.pathFor = function(container) {
      if (container.toLowerCase() == 'today') {
        const today = moment(new Date())
        const monthFolder = today.format('MMM_YYYY')
        const dayFolder = today.format('MMM_DD_YYYY')
        return this.config.rootFolder + '/__journal/' + monthFolder + '/' + dayFolder + '/'
      } else if (container.toLowerCase() == 'inbox') {
        return this.config.rootFolder + '/__inbox/'
      } else if (container.toLowerCase() == 'glance') {
        return this.config.rootFolder + '/__glance/'
      } else if (container.toLowerCase() == 'frequent') {
        return this.config.rootFolder + '/__frequent/'
      } else if (container.toLowerCase() == 'todo') {
        return this.config.rootFolder + '/__todo/'
      } else if (container.toLowerCase().startsWith('content')) {
        return this.config.rootFolder + '/__' + container.toLowerCase() + '/'
      } else if (container.toLowerCase().startsWith('journal')) {
        const parts = container.split('/')
        const journal = moment(parts[1])
        const monthFolder = journal.format('MMM_YYYY')
        const dayFolder = journal.format('MMM_DD_YYYY')
        return this.config.rootFolder + '/__journal/' + monthFolder + '/' + dayFolder + '/'
      } else {
        return this.config.rootFolder
      }
    }

    this.newDocument = function(container, title, contents) {
      const path = this.pathFor(container) + '/'+ title + '.md'
      fs.writeFileSync(path, contents)
    }

    this.newFile = function(container, filename, contents) {
      const path = this.pathFor(container) + '/'+ filename
      fs.writeFileSync(path, contents)
    }

    this.importFile = function(container, importPath) {
      const containerPath = this.pathFor(container)
      fs.copyFileSync(importPath, containerPath + '/' + path.basename(importPath))
    }
  }
}

module.exports = LincolnVault
