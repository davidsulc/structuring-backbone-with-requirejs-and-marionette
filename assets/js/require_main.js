requirejs.config({
  baseUrl: "assets/js",
  paths: {
    backbone: "vendor/backbone",
    jquery: "vendor/jquery",
    json2: "vendor/json2",
    marionette: "vendor/backbone.marionette",
    underscore: "vendor/underscore"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    }
  }
});

require(["marionette"], function(bbm){
  console.log("jQuery version: ", $.fn.jquery);
  console.log("underscore identity call: ", _.identity(5));
  console.log("Marionette: ", bbm);
});