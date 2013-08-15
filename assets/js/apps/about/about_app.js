define(["app", "marionette"], function(ContactManager, Marionette){
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about" : "showAbout"
    }
  });

  var API = {
    showAbout: function(){
      require(["apps/about/show/show_controller"], function(ShowController){
        ContactManager.startSubApp(null);
        ShowController.showAbout();
        ContactManager.execute("set:active:header", "about");
      });
    }
  };

  ContactManager.on("about:show", function(){
    ContactManager.navigate("about");
    API.showAbout();
  });

  ContactManager.addInitializer(function(){
    new Router({
      controller: API
    });
  });

  return Router;
});
