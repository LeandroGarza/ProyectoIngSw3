const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://frontending-2a5106696ee9.herokuapp.com/',
      show: false
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'testIntegracion'
}