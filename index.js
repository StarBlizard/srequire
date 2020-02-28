const cwd      = process.cwd();
const { join } = require('path');

module.exports = pathFromCWD => require(join(cwd, pathFromCWD));
