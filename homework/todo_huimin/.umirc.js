export default {
  hashHistory: true,
  plugins: [
    'umi-plugin-dva',
    ['umi-plugin-routes', {
      exclude: [
        /model\.(j|t)sx?$/,
        /todos/
      ]
    }]
  ]
}
