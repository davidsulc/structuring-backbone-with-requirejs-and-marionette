define(["app", "apps/contacts/show/show_view"], function(ContactManager, View){
  ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
      showContact: function(id){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          ContactManager.mainRegion.show(loadingView);

          var fetchingContact = ContactManager.request("contact:entity", id);
          $.when(fetchingContact).done(function(contact){
            var contactView;
            if(contact !== undefined){
              contactView = new View.Contact({
                model: contact
              });

              contactView.on("contact:edit", function(contact){
                ContactManager.trigger("contact:edit", contact.get("id"));
              });
            }
            else{
              contactView = new View.MissingContact();
            }

            ContactManager.mainRegion.show(contactView);
          });
        });
      }
    }
  });

  return ContactManager.ContactsApp.Show.Controller;
});
