const fs = require('fs')
const modelsPath = `${__dirname}/`
const removeExtensionFromFile = function(file) {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}
module.exports = () => {
  /*
   * Load models dynamically
   */

  // Loop models path and loads every file as a model except this file
  fs.readdirSync(modelsPath).filter(file => {
    // Take filename and remove last part (extension)
    const modelFile = removeExtensionFromFile(file)
    // Prevents loading of this file
    return modelFile !== 'index' ? require(`./${modelFile}`) : ''
  })
}
