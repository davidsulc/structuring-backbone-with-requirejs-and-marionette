define(["marionette", "jquery-ui"], function(Marionette){
  var ContactManager = new Marionette.Application();

  ContactManager.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  ContactManager.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  ContactManager.startSubApp = function(appName, args){
    var currentApp = appName ? ContactManager.module(appName) : null;
    if (ContactManager.currentApp === currentApp){ return; }

    if (ContactManager.currentApp){
      ContactManager.currentApp.stop();
    }

    ContactManager.currentApp = currentApp;
    if(currentApp){
      currentApp.start(args);
    }
  };

  ContactManager.on("before:start", function(){
    var RegionContainer = Marionette.LayoutView.extend({
      el: "#app-container",

      regions: {
        header: "#header-region",
        main: "#main-region",
        dialog: "#dialog-region"
      }
    });

    ContactManager.regions = new RegionContainer();
    ContactManager.regions.dialog.onShow = function(view){
      var self = this;
      var closeDialog = function(){
        self.stopListening();
        self.empty();
        self.$el.dialog("destroy");
      };

      this.listenTo(view, "dialog:close", closeDialog);

      this.$el.dialog({
        modal: true,
        title: view.title,
        width: "auto",
        close: function(e, ui){
          closeDialog();
        }
      });
    };
  });

  ContactManager.on("start", function(){
    if(Backbone.history){
      require(["apps/contacts/contacts_app", "apps/about/about_app"], function () {
        Backbone.history.start();

        if(ContactManager.getCurrentRoute() === ""){
          ContactManager.trigger("contacts:list");
        }
      });
    }
  });

  return ContactManager;
});
