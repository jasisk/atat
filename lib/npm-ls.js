'use strict';

var npm = require('npm');


module.exports = function (cb) {
  npm.load({depth: Infinity}, function (err) {
    if (err) { return cb(err); }
    npm.commands.ls([], true, cb);
  });
};
