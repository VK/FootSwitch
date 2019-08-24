module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.ESP_BUILD === 'true' ? '/' : '/FootSwitchWeb/'
    : '/',
  productionSourceMap: false,

  pwa: {
    themeColor: '#007bff'
  },


}
