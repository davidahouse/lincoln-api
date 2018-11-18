const fs = require('fs')

class LincolnVault {
  constructor(vault) {
    let self = this
    this.vault = vault
    var contents = fs.readFileSync("/Users/E136586/Library/Application\ Support/com.repairward.lincoln/vaults/" + vault + ".vaultConfig")
    this.config = JSON.parse(contents)

    this.contents = function(container) {

      fs.readdir(this.pathFor(container), function(err, items) {
        for (var i=0; i<items.length; i++) {
          console.log(items[i])
        }
      })
    }

    this.pathFor = function(container) {

      if (container == "Today") {
        return this.config.rootFolder + "/__journal/"
      } else if (container == "Glance") {
        return this.config.rootFolder + "/__glance/"
      } else if (container == "Frequent") {
        return this.config.rootFolder + "/__frequent/"
      } else if (container == "Root") {
        return this.config.rootFolder + "/__content/"
      } else {
        return this.config.rootFolder
      }
    }
  }
}

module.exports = LincolnVault
