/*
 * RequireJS underscore-tpl
 * Loads and precompile underscore templates
 * https://github.com/dciccale/requirejs-underscore-tpl
 *
 * Dependencies:
 * Underscore.js: https://underscorejs.org
 * RequireJS text plugin: https://github.com/requirejs/text
 *
 * Copyright (c) 2013 Denis Ciccale (@tdecs)
 * Licensed under the MIT license.
 * https://github.com/dciccale/requirejs-underscore-tpl/blob/master/LICENSE-MIT
 */

define(['underscore', 'text'], function (_, text) {

  'use strict';

  var buildMap = {};

  var tpl = {
    version: '0.1.0',

    load: function (name, req, onLoadNative, config) {
      var onLoad = function (content) {
        // compile the template
        content = _.template(content);

        if (config.isBuild) {
          content = buildMap[name] = content.source;
        } else {
          content = new Function('obj', 'return ' + content.source)();
        }

        onLoadNative(content);
      };

      // load template using the text plugin
      text.load(name, req, onLoad, config);
    },

    write: function (pluginName, moduleName, write) {
      if (buildMap.hasOwnProperty(moduleName)) {
        write('define("' + pluginName + '!' + moduleName + '", function () { ' +
          'return ' + buildMap[moduleName] + ';' +
        '});\n'
        );
      }
    }
  };

  return tpl;
});
