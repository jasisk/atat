'use strict';

var test = require('tape');
var npm = require('./fixtures/npm');
var traverse = require('../lib/traverse-graph');

function criteria(pkg) {
  return pkg.criteria === true || undefined;
}

test('traverse', function (t) {
  traverse(npm.input, criteria, function (err, out) {
    t.deepEqual(out, npm.output);
    t.end();
  });
});
