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

            contactsListView.on("itemview:contact:edit", function(childView, args){
              require(["apps/contacts/edit/edit_view"], function(EditView){
                var model = args.model;
                var view = new EditView.Contact({
                  model: model
                });

                view.on("form:submit", function(data){
                  if(model.save(data)){
                    childView.render();
                    view.trigger("dialog:close");
                    childView.flash("success");
                  }
                  else{
                    view.triggerMethod("form:data:invalid", model.validationError);
                  }
                });

                ContactManager.dialogRegion.show(view);
              });
            });

            contactsListView.on("itemview:contact:delete", function(childView, args){
              args.model.destroy();
            });

            ContactManager.mainRegion.show(contactsListLayout);
          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.List.Controller;
});
