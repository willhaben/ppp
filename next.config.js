const withCSS = require("@zeit/next-css")

compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

module.exports = compose(withCSS)({
  exportPathMap: function(defaultPathMap) {
    return {
      "/": { page: "/" }
    }
  }
})
