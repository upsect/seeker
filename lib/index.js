module.exports = {
  exists: function (m) {
    try {
      require.resolve(m)
    } catch (e) {
      return false
    }
    return true
  },
  import: function (...modules) {
    for (const m of modules) {
      if (this.exists(m)) {
        return require(m)
      }
    }
    return null
  }
}
