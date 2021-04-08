const fs       = require('fs');
const { join } = require('path');
const _        = require('underscore');

const cwd = process.cwd();

/*
 * dir can be:
 * 'path/to/something'
 * */

const srequire = function(dir) {
  return require(this.joinToCWD(route));
};

srequire.savedRoutes = {};

srequire.joinToCWD = function(dir) {
  return join.apply(this, [ cwd, ...arguments ]);
};

srequire.join = function() {
  const [ dir, ...routes ] = arguments;

  if (!dir)                     { throw new Error('Please specify a route');  }
  if ((typeof dir) != 'string') { throw new Error('srequire, join and jointToCWD needs a string'); }

  const routeName  = dir.split('/')[0];
  const savedRoute = this.savedRoutes[routeName]

  if (savedRoute) { return join.apply(this, [ savedRoute, ...arguments ]); }

  return join.apply(this, arguments);
};

/*
 *  routes: {
 *    models: 'path/to/models',
 *    schemas: 'path/to/schemas',
 *    anything: 'path/to/any/anything'
 *  }
 *
 *  then...
 *
 *  srequire('models/modelX')
 *  srequire('schemas/users')
 *  srequire('anythingl/athing')
 * */

// Now you can just save a file on the cwd, json or js that exports the baseRoutes
if (fs.existsSync(join(cwd, './baseRoutes.json'))) {
  srequire.setBaseRoutes(JSON.parse(fs.readFileSync('./baseRoutes.json')));
}

if (fs.existsSync(join(cwd, './baseRoutes.js'))) {
  srequire.setBaseRoutes(this.savedRoutes, srequire('./baseRoutes.js'));
}

srequire.setBaseRoutes = function(routes) {
  this.savedRoutes = _.extend(this.savedRoutes, routes);
  return this.savedRoutes;
};

srequire.setBaseRoute = function(name, route) {
  this.savedRoutes[name] = route;
  return this.savedRoutes;
};

srequire.routes = function() { return this.savedRoutes; };

module.exports = srequire;
