const path = require('path')
const getLibs = require('./libs')
const {
  opencvInclude,
  opencvLibDir,
  opencvBinDir,
  opencvModules
} = require('./constants')

const {
  isWin,
  hasSelfBuild
} = require('./install/utils')

const resolvePath = (filePath, file) => {
  if (!filePath) {
    return undefined
  }
  return (file ? path.resolve(filePath, file) : path.resolve(filePath)).replace(/\\/g, '/')
}

function includes() {
  if (hasSelfBuild()) {
    return
  }

  console.log(resolvePath(opencvInclude))
}

function libraries() {
  if (hasSelfBuild()) {
    return
  }

  getLibs().map(lib => lib.libPath).forEach(lib => console.log(resolvePath(lib)))
}

function ensureBinaries() {
  if (!isWin() || hasSelfBuild()) {
    return
  }

  // append opencv binary path to node process
  if (!process.env.path.includes(opencvBinDir)) {
    process.env.path = `${process.env.path};${opencvBinDir};`
  }
}

module.exports = {
  includes,
  libraries,
  ensureBinaries,
  opencvModules,
  hasSelfBuild
}