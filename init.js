#! /usr/bin/env node

const { logger, kebabcasify } = require('./utils')
const FileActions = require('./lib/fileActions')
const parseArgs = require('./lib/parseArgs')
const kleur = require('kleur')
const path = require('path')
const readline = require('readline-sync')
const { setShellFilePermission } = require('./utils/update-files')

const argv = parseArgs(process.argv.slice(2))

let pkg = {}
let pkgName = ''
/**
 * Prompt user for input to populate template files
 */
let npmName = argv.get('name')
let ownerName = argv.get('owner')
const OWNER_NAME = 'FEMessage'

function isUpgrade() {
  return argv.has('u') || argv.has('upgrade')
}

if (isUpgrade()) {
  try {
    pkg = require(path.join(process.cwd(), 'package.json'))
    pkgName = pkg.name.replace(/^@[\w-]*\//, '')
  } catch {}
}

if (argv.has('test')) {
  npmName = 'v-test'
  ownerName = OWNER_NAME
}

const promptAngle = kleur.dim('> ')

if (!npmName) {
  console.log(
    `The component name: ${pkgName ? kleur.dim(`(${pkgName})`) : ''}`
  )
  npmName = readline.prompt({
    defaultInput: pkgName,
    prompt: promptAngle
  })
}

if (!ownerName) {
  console.log(
    `The owner: ${kleur.dim(`(${OWNER_NAME})`)}`
  )
  ownerName = readline.prompt({
    prompt: promptAngle,
    defaultInput: OWNER_NAME
  })
}

const componentName = kebabcasify(npmName)
const outDir = path.join(process.cwd(), componentName)

const fileActions = new FileActions({
  argv,
  pkg,
  componentName,
  ownerName,
  outDir,
  templatesDir: path.join(__dirname, 'templates')
})

if (!isUpgrade()) {
  fileActions.create()

  fileActions.move({
    patterns: {
      gitignore: '.gitignore',
      '_package.json': 'package.json',
      'src/component.vue': `src/${componentName}.vue`,
      'src/component.d.ts': `src/${componentName}.d.ts`
    }
  })

  setShellFilePermission(outDir)

  logger.success(`Generated into ${kleur.underline(outDir)}`)
}

if (isUpgrade()) {
  fileActions.upgrade()
}
