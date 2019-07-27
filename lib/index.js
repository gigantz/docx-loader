const mammoth = require("mammoth");
const { getOptions } = require("loader-utils");

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const options = getOptions(this);
  const buffer = Buffer.from(source.toString("base64"), "base64");
  const callback = this.async();

  function middlewares(contentResult) {
    let newContent;

    if (options && options.removeLinks) {
      newContent = contentResult.replace(/(<a[^>]+?>|<a>|<\/a>)/gim, "");
    }

    return newContent || contentResult;
  }

  mammoth
    .convertToHtml(
      { buffer },
      options && options.mammoth ? options.mammoth : {}
    )
    .then(result => `module.exports = ${JSON.stringify(result.value)};`)
    .then(content => middlewares(content))
    .then(html => callback(null, html))
    .catch(error => callback(null, ` console.error(${JSON.stringify(error)})`));
};

module.exports.raw = true;
