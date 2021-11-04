const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')(['localbase']) // pass the modules you would like to see transpiled

module.exports = withPlugins([withTM, withPWA], {
  pwa: {
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    // dest: 'public', // comment out this line
    register: true,
    sw: '/sw.js',
  },
})
