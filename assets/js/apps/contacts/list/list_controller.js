define(["app", "apps/contacts/list/list_view"], function(ContactManager, View){
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
      listContacts: function(){
        require(["entities/contact"], function(){
          var fetchingContacts = ContactManager.request("contact:entities");

          var contactsListLayout = new View.Layout();
          var contactsListPanel = new View.Panel();

          $.when(fetchingContacts).done(function(contacts){
            var contactsListView = new View.Contacts({
              collection: contacts
            });

            contactsListLayout.on("show", function(){
              contactsListLayout.panelRegion.show(contactsListPanel);
              contactsListLayout.contactsRegion.show(contactsListView);
            });

            contactsListView.on("itemview:contact:delete", function(childView, model){
              model.destroy();
            });

            ContactManager.mainRegion.show(contactsListLayout);
          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.List.Controller;
});
