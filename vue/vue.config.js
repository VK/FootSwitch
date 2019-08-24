module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.ESP_BUILD === 'true' ? '/' : '/FootSwitch/'
    : '/',
  productionSourceMap: false,

  pwa: {
    themeColor: '#007bff'
  },


}
