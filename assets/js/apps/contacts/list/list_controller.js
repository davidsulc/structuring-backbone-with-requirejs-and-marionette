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

            contactsListPanel.on("contact:new", function(){
              require(["apps/contacts/new/new_view"], function(NewView){
                var newContact = ContactManager.request("contact:entity:new");

                var view = new NewView.Contact({
                  model: newContact
                });

                view.on("form:submit", function(data){
                  if(contacts.length > 0){
                    var highestId = contacts.max(function(c){ return c.id; }).get("id");
                    data.id = highestId + 1;
                  }
                  else{
                    data.id = 1;
                  }
                  if(newContact.save(data)){
                    contacts.add(newContact);
                    view.trigger("dialog:close");
                    var newContactView = contactsListView.children.findByModel(newContact);
                    // check whether the new contact view is displayed (it could be
                    // invisible due to the current filter criterion)
                    if(newContactView){
                      newContactView.flash("success");
                    }
                  }
                  else{
                    view.triggerMethod("form:data:invalid", newContact.validationError);
                  }
                });

                ContactManager.dialogRegion.show(view);
              });
            });

            contactsListView.on("itemview:contact:edit", function(childView, model){
              require(["apps/contacts/edit/edit_view"], function(EditView){
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
