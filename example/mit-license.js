'use strict';

var util = require('util');
var atat = require('../');

atat(
  function (pkg) {return pkg.license === 'MIT' || undefined;},
  function (err, out) {
    if (err) {
      return console.error(err.stack || err.message || err);
    }
    console.log(util.inspect(out, {depth: null, colors: true}));
  });
