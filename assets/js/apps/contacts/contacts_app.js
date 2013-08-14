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

  ContactManager.module("Routers.ContactsApp", function(ContactsAppRouter, ContactManager, Backbone, Marionette, $, _){
    ContactsAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "contacts(/filter/criterion::criterion)": "listContacts",
        "contacts/:id": "showContact",
        "contacts/:id/edit": "editContact"
      }
    });

    var executeAction = function(action, arg){
      ContactManager.startSubApp("ContactsApp");
      action(arg);
      ContactManager.execute("set:active:header", "contacts");
    };

    var API = {
      listContacts: function(criterion){
        require(["apps/contacts/list/list_controller"], function(ListController){
          executeAction(ListController.listContacts, criterion);
        });
      },

      showContact: function(id){
        require(["apps/contacts/show/show_controller"], function(ShowController){
          executeAction(ShowController.showContact, id);
        });
      },

      editContact: function(id){
        require(["apps/contacts/edit/edit_controller"], function(EditController){
          executeAction(EditController.editContact, id);
        });
      }
    };

    ContactManager.on("contacts:list", function(){
      ContactManager.navigate("contacts");
      API.listContacts();
    });

    ContactManager.on("contacts:filter", function(criterion){
      if(criterion){
        ContactManager.navigate("contacts/filter/criterion:" + criterion);
      }
      else{
        ContactManager.navigate("contacts");
      }
    });

    ContactManager.on("contact:show", function(id){
      ContactManager.navigate("contacts/" + id);
      API.showContact(id);
    });

    ContactManager.on("contact:edit", function(id){
      ContactManager.navigate("contacts/" + id + "/edit");
      API.editContact(id);
    });

    ContactManager.addInitializer(function(){
      new ContactsAppRouter.Router({
        controller: API
      });
    });
  });

  return ContactManager.ContactsAppRouter;
});
