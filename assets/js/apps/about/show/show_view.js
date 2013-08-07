define(["app", "tpl!apps/about/show/templates/message.tpl"], function(ContactManager, messageTpl){
  ContactManager.module("AboutApp.Show.View", function(View, ContactManager, Backbone, Marionette, $, _){
    View.Message = Marionette.ItemView.extend({
      template: messageTpl
    });
  });

  return ContactManager.AboutApp.Show.View;
});
