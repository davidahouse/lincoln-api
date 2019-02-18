/* eslint-env mocha */
const expect = require('chai').expect
const LincolnVault = require('../index.js')
const moment = require('moment')

describe('lincoln', function() {
  it('should retain vault after construction', function() {
    const vault = new LincolnVault('test')
    expect(vault.vault).to.be.equal('test')
  })

  describe('allVaults', function() {
    it('should return the configured vaults', function() {
      // TODO: Sketchy test here until we can mock the fs module
      const vault = new LincolnVault('test')
      vault.config = {rootFolder: '/root'}
      vault.allVaults(function(err, allVaults) {
        expect(allVaults.length).to.be.greaterThan(0)
      })
    })
  })

  describe('pathFor', function() {
    it('should return correct paths', function() {
      const vault = new LincolnVault('test')
      vault.config = {rootFolder: '/root'}

      const today = moment(new Date())
      const monthFolder = today.format('MMM_YYYY')
      const dayFolder = today.format('MMM_DD_YYYY')

      const expectations = [
        {'container': 'Today', 'result': '/root/__journal/' + monthFolder + '/' + dayFolder + '/'},
        {'container': 'Inbox', 'result': '/root/__inbox/'},
        {'container': 'Content', 'result': '/root/__content/'},
        {'container': 'Content/projects', 'result': '/root/__content/projects/'},
        {'container': 'Journal/2018-11-16', 'result': '/root/__journal/Nov_2018/Nov_16_2018/'},
        {'container': 'Todo', 'result': '/root/__virtual/Todo'},
      ]

      for (let i = 0; i < expectations.length; i++) {
        const expecting = expectations[i]
        expect(vault.pathFor(expecting.container)).to.be.equal(expecting.result)
      }
    })
  })
})
