'use strict';

var thing = require('core-util-is');

module.exports = function traverseDependencies(tree, action, cb) {
  var seenNodes = [];

  var checkNode = function checkNode(node, action, cb) {
    var go;
    var name;
    var deps;
    var depsObj;
    var criteria;
    var checkDeps;
    var onComplete;

    if (!thing.isObject(node) || ~seenNodes.indexOf(node)) {
      return;
    }

    criteria = action(node);
    name = node.name + '@' + node.version;

    onComplete = function (dependencies) {
      var ret, obj, parent;
      if (criteria || dependencies) {
        ret = {};
        obj = ret[name] = {};
        if (criteria) {
          obj.criteria = criteria;
          obj.realPath = node.realPath || node.path;
          obj.parents = [];
          parent = node;
          while (parent = parent.parent) {
            obj.parents.push(parent.name);
          }
        }
        dependencies && (obj.dependencies = dependencies);
        return ret;
      }
    };

    checkDeps = function (deps) {
      var dep;
      if (dep = deps.shift()) {
        var newNode = node.dependencies[dep];
        checkNode(newNode, action, function (err, obj) {
          if (obj) {
            var name = Object.keys(obj)[0];
            depsObj || (depsObj = {});
            depsObj[name] = obj[name];
          }
          checkDeps(deps);
        });
      } else {
        cb(null, onComplete(depsObj));
      }
    };

    if (node.dependencies) {
      checkDeps(Object.keys(node.dependencies));
    } else {
      cb(null, onComplete());
    }
  };

  checkNode(tree, action, cb);
};
