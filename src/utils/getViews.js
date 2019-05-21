export function getViews (path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/views/' + path + '.vue'))
    })
  }
}
