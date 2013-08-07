define(["app", "apps/about/show/show_view"], function(ContactManager, View){
  ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
      showAbout: function(){
        var view = new View.Message();
        ContactManager.mainRegion.show(view);
      }
    };
  });

  return ContactManager.AboutApp.Show.Controller;
});
