'use strict';

var traverse = require('./lib/traverse-graph');
var ls = require('./lib/npm-ls');

module.exports = function (criteria, cb) {
  ls(function (err, graph) {
    if (err) {
      return cb(err);
    }
    traverse(graph, criteria, cb);
  });
};
