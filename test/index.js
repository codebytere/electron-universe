'use strict'

const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const path = require('path')

chai.should()
chai.use(chaiAsPromised)

describe('Electron Universe', function () {
  let app

  const setupApp = function (app) {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
    return app.client.waitUntilWindowLoaded()
  }

  const startApp = function () {
    app = new Application({
      path: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
      args: [
        path.join(__dirname, '..')
      ],
      waitTimeout: 10 * 1000
    })

    return app.start().then(setupApp)
  }

  before(function () {
    return startApp()
  })

  after(function () {
    if (app && app.isRunning()) return app.stop()
  })

  it('opens a window', function () {
    return app.client.getWindowCount().should.eventually.equal(1)
  // .browserWindow.isMinimized().should.eventually.be.false
  // .browserWindow.isDevToolsOpened().should.eventually.be.false
  // .browserWindow.isVisible().should.eventually.be.true
  // .browserWindow.isFocused().should.eventually.be.true
  // .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
  // .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
  // .browserWindow.getTitle().should.eventually.equal('Electron API Demos')
  // .waitForVisible('#about-modal').should.eventually.be.true
  // .isVisible('.js-nav').should.eventually.be.false
  // .click('button[id="get-started"]').pause(500)
  // .isVisible('#about-modal').should.eventually.be.false
  // .isVisible('.js-nav').should.eventually.be.true
  })
})
