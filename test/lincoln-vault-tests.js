var expect = require('chai').expect
var LincolnVault = require('../index.js')

describe('lincoln', function() {
  it('should retain vault after construction', function() {
    var vault = new LincolnVault("test")
    expect(vault.vault).to.be.equal("test")
  })

  describe('pathFor', function() {
    it('should return correct paths', function() {
      var vault = new LincolnVault("test")
      vault.config = {rootFolder: "/root"}

      var expectations = [
        {"container": "Today", "result": "/root/__journal/Nov_2018/Nov_18_2018/"},
        {"container": "Glance", "result": "/root/__glance/"},
        {"container": "Frequent", "result": "/root/__frequent/"},
        {"container": "Content", "result": "/root/__content/"},
        {"container": "Content/projects", "result": "/root/__content/projects/"},
        {"container": "Journal/2018-11-16", "result": "/root/__journal/Nov_2018/Nov_16_2018/"}
      ]

      for (var i = 0; i < expectations.length; i++) {
        var expecting = expectations[i]
        expect(vault.pathFor(expecting.container)).to.be.equal(expecting.result)
      }
    })
  })
})
