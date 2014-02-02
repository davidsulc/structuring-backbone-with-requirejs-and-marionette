define(["app", "apps/contacts/gender/gender_view", "tpl!apps/contacts/gender/templates/gender.tpl"],
 function(ContactManager, GenderView, tpl){
  ContactManager.module("ContactsApp.Gender", function(Gender, ContactManager, Backbone, Marionette, $, _){
    Gender.Controller = {
      genderContact: function(){
        var genderView = new GenderView.GenderView();
        ContactManager.mainRegion.show( genderView );
      }
    }
  });

  return ContactManager.ContactsApp.Gender.Controller;
});
