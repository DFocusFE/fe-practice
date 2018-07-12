export default {
  hashHistory: true,
  pages: {
    '/': {context: {title: 'TODOS'}}
  },
  plugins: [
    'umi-plugin-dva',
    ['umi-plugin-routes', {
      exclude: [
        /model\.(j|t)sx?$/,
        /models\//,
        /todos/
      ]
    }]
  ]
}
