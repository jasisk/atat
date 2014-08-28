'use strict';

var npm = require('npm');


module.exports = function (cb) {
  npm.load({depth: Infinity}, function (err) {
    if (err) { cb(err); }
    npm.commands.ls([], true, function (err, data) {
      if (err) { return cb(err); }
      cb(null, data);
    });
  });
};
