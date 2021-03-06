module.exports = {
  plugins: {
    stylelint: {},
    'postcss-easy-import': {},
    'postcss-custom-media': {
      importFrom: 'source/styles/modules/mq.css'
    },
    'postcss-nested': {},
    'postcss-base64': {
      extensions: ['.png'],
      root: 'source/icons/'
    },
    'postcss-sort-media-queries': {},
    autoprefixer: {},
    cssnano: {},
    'postcss-reporter': {
      clearAllMessages: true,
      throwError: process.env.NODE_ENV !== 'development'
    }
  }
};
