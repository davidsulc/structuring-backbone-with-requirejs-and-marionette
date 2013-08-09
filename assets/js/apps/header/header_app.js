define(["app", "apps/header/list/list_controller"], function(ContactManager, ListController){
  ContactManager.module("HeaderApp", function(Header, ContactManager, Backbone, Marionette, $, _){
    var API = {
      listHeader: function(){
        ListController.listHeader();
      }
    };

    ContactManager.commands.setHandler("set:active:header", function(name){
      ListController.setActiveHeader(name);
    });

    Header.on("start", function(){
      API.listHeader();
    });
  });

  return ContactManager.HeaderApp;
});
