const internals = {}

internals.exists = (m) => {
  try {
    require.resolve(m)
  } catch (e) {
    return false
  }
  return true
}

internals.import = (...modules) => {
  for (const m of modules) {
    if (internals.exists(m)) {
      return require(m)
    }
  }
  return null
}

module.exports = { seeker: internals }
