define(["app"], function(ContactManager){
  ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
    ContactsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "contacts": "listContacts"
      }
    });

    var API = {
      listContacts: function(criterion){
        require(["apps/contacts/list/list_controller"], function(ListController){
          ListController.listContacts(criterion);
        });
      }
    };

    ContactManager.on("contacts:list", function(){
      ContactManager.navigate("contacts");
      API.listContacts();
    });

    ContactsApp.on("start", function(){
      new ContactsApp.Router({
        controller: API
      });
    });
  });

  return ContactManager.ContactsApp;
});
