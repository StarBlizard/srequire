const cwd      = process.cwd();
const { join } = require('path');
const _        = require('underscore');

/*
 * dir can be:
 * 'path/to/something'
 * */

let savedRoutes = {};

module.exports = dir => {
  if (!dir)                     { throw new Error('Please specify a route');  }
  if ((typeof dir) != 'string') { throw new Error('srequire needs a string'); }

  const routeName  = dir.split('/')[0];
  const savedRoute = savedRoutes[routeName]

  if (!savedRoute) { return join(cwd, dir); }

  const route = savedRoute ? join(cwd, dir.replace(routeName, savedRoute)) : cwd;

  return require(route);
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

module.exports.setBaseRoutes = routes => {
  savedRoutes = _.extend(savedRoutes, routes);
  return savedRoutes;
};

module.exports.setBaseRoute = (name, route) => {
  savedRoutes[name] = route;
  return savedRoutes;
};

module.exports.routes = (name, route) => savedRoutes;
