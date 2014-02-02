define(["app", "tpl!apps/contacts/gender/templates/gender.tpl"],

 function(ContactManager, genderTpl){
  
  ContactManager.module("ContactsApp.Gender.View", function(View, ContactManager, Backbone, Marionette, $, _){
    
    View.GenderView = Marionette.ItemView.extend({
      template : genderTpl
    });

  });

  return ContactManager.ContactsApp.Gender.View;
  
});
