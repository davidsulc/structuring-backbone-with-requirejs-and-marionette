define(["app"], function(ContactManager){
  ContactManager.module("AboutApp", function(AboutApp, ContactManager, Backbone, Marionette, $, _){
    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "about" : "showAbout"
      }
    });

    var API = {
      showAbout: function(){
        require(["apps/about/show/show_controller"], function(ShowController){
          ShowController.showAbout();
        });
      }
    };

    ContactManager.on("about:show", function(){
      ContactManager.navigate("about");
      API.showAbout();
    });

    ContactManager.addInitializer(function(){
      new AboutApp.Router({
        controller: API
      });
    });
  });

  return ContactManager.AboutApp;
});
