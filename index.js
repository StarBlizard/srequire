const fs       = require('fs');
const { join } = require('path');
const _        = require('underscore');

const cwd = process.cwd();

/*
 * dir can be:
 * 'path/to/something'
 * */

const srequire = function(dir) {
  return require(module.exports.joinToCWD(dir));
};

srequire.savedRoutes = {};

srequire.joinToCWD = function(dir) {
  return this.join.apply(this, [ cwd, ...arguments ]);
};

srequire.join = function() {
  let [ base, dir, ...routes ] = arguments;

  if (!base)                     { throw new Error('Please specify a route');  }
  if ((typeof base) != 'string') { throw new Error('srequire, join and jointToCWD needs a string'); }

  const baseRoute = base === cwd ? dir : base;

  const routeName  = baseRoute.indexOf('/') > -1 ?
    baseRoute.split('/')[0] : baseRoute.split('\\')[0];
  const savedRoute = this.savedRoutes[routeName]

  if (savedRoute) {
    return join.apply(
      this,
      base === cwd ?
        [ base, dir.replace(routeName, savedRoute), ...routes ] :
        [ base.replace(routeName, savedRoute), dir, ...routes ]
      );
  }

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

srequire.routes = function() { return this.savedRoutes; };

srequire.setBaseRoutes = function(routes) {
  this.savedRoutes = _.extend(this.savedRoutes, routes);
  return this.savedRoutes;
};

srequire.setBaseRoute = function(name, route) {
  this.savedRoutes[name] = route;
  return this.savedRoutes;
};

// Now you can just save a file on the cwd, json or js that exports the baseRoutes
if (fs.existsSync(srequire.joinToCWD('baseRoutes.json'))) {
  srequire.setBaseRoutes(JSON.parse(fs.readFileSync('baseRoutes.json')));
}

if (fs.existsSync(srequire.joinToCWD('baseRoutes.js'))) {
  srequire.setBaseRoutes(this.savedRoutes, srequire('baseRoutes'));
}

module.exports = srequire;
