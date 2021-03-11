const mri = require('mri')

module.exports = (_args = process.argv) => {
  const parsed = mri(_args, {
    alias: {
      u: 'upgrade',
      o: 'output',
    },
    string: ['files']
  })

  const args = parsed._
  delete parsed._

  return {
    has(name) {
      return parsed[name] !== undefined
    },
    get(name) {
      return parsed[name]
    },
    options: parsed,
    args
  }
}
