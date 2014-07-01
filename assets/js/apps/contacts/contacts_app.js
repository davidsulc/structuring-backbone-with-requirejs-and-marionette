define(["app"], function(ContactManager){
  ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
    ContactsApp.startWithParent = false;

    ContactsApp.onStart = function(){
      console.log("starting ContactsApp");
    };

    ContactsApp.onStop = function(){
      console.log("stopping ContactsApp");
    };
  });

  return ContactManager.ContactsApp;
});
