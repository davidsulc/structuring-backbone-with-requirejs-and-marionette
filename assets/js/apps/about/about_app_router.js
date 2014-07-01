define(["app"], function(ContactManager){
  ContactManager.module("Routers.AboutApp", function(AboutAppRouter, ContactManager, Backbone, Marionette, $, _){
    AboutAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "about" : "showAbout"
      }
    });

    var API = {
      showAbout: function(){
        require(["apps/about/show/show_controller"], function(ShowController){
          ContactManager.startSubApp("AboutApp");
          ShowController.showAbout();
          ContactManager.execute("set:active:header", "about");
        });
      }
    };

    ContactManager.on("about:show", function(){
      ContactManager.navigate("about");
      API.showAbout();
    });

    ContactManager.Routers.on("start", function(){
      new AboutAppRouter.Router({
        controller: API
      });
    });
  });

  return ContactManager.AboutAppRouter;
});
