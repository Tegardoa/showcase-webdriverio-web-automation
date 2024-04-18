// plugins.js file contains of custom function that will be used for testing

async function waitForPageIsLoaded() {
  try {
    await browser.waitUntil(async function () {
      const state = await browser.execute(function () {
        return document.readyState;
      });
      return state === 'complete';
    },
    {
      timeout: 60000,
      timeoutMsg: 'Check your internet connection'
    });
    console.log('Page loaded successfully');
  } catch (error) {
    console.error('Error while waiting for page load:', error);
  }
}

async function toFixed(n, fixed) {
  return `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
}

async function logInAsync(data) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Log Message = ' + data);
}

module.exports = {
  waitForPageIsLoaded,
  toFixed,
  logInAsync,
}