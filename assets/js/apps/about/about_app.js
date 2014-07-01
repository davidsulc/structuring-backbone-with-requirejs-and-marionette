define(["app"], function(ContactManager){
  ContactManager.module("AboutApp", function(AboutApp, ContactManager, Backbone, Marionette, $, _){
    AboutApp.startWithParent = false;

    AboutApp.onStart = function(){
      console.log("starting AboutApp");
    };

    AboutApp.onStop = function(){
      console.log("stopping AboutApp");
    };
  });

  return ContactManager.AboutApp;
});
