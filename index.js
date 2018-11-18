const fs = require('fs')
const homedir = require('os').homedir()
const moment = require('moment')

class LincolnVault {
  constructor(vault) {
    let self = this
    this.vault = vault
    var contents = fs.readFileSync(homedir + "/Library/Application\ Support/com.repairward.lincoln/vaults/" + vault + ".vaultConfig")
    this.config = JSON.parse(contents)

    this.contents = function(container) {

      fs.readdir(this.pathFor(container), function(err, items) {
        for (var i=0; i<items.length; i++) {
          console.log(items[i])
        }
      })
    }

    this.pathFor = function(container) {

      if (container.toLowerCase() == "today") {
        var today = moment(new Date())
        return this.config.rootFolder + "/__journal/" + today.format("MMM_YYYY") + "/" + today.format("MMM_DD_YYYY") + "/"
      } else if (container.toLowerCase() == "glance") {
        return this.config.rootFolder + "/__glance/"
      } else if (container.toLowerCase() == "frequent") {
        return this.config.rootFolder + "/__frequent/"
      } else if (container.toLowerCase().startsWith("content")) {
        return this.config.rootFolder + "/__" + container.toLowerCase() + "/"
      } else if (container.toLowerCase().startsWith("journal")) {
        var parts = container.split('/')
        var journal = moment(parts[1])
        return this.config.rootFolder + "/__journal/" + journal.format("MMM_YYYY") + "/" + journal.format("MMM_DD_YYYY") + "/"
      } else {
        return this.config.rootFolder
      }
    }

    this.newDocument = function(container, title, contents) {
      var path = this.pathFor(container) + "/"+ title + ".md"
      fs.writeFileSync(path, contents)
    }
  }
}

module.exports = LincolnVault
