define(["app", "apps/header/list/list_view"], function(ContactManager, View){
  ContactManager.module("HeaderApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
      listHeader: function(){
        require(["entities/header"], function(){
          var links = ContactManager.request("header:entities");
          var headers = new View.Headers({collection: links});

          headers.on("brand:clicked", function(){
            ContactManager.trigger("contacts:list");
          });

          headers.on("itemview:navigate", function(childView, model){
            var trigger = model.get("navigationTrigger");
            ContactManager.trigger(trigger);
          });

          ContactManager.headerRegion.show(headers);
        });
      },

      setActiveHeader: function(headerUrl){
        var links = ContactManager.request("header:entities");
        var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
        headerToSelect.select();
        links.trigger("reset");
      }
    };
  });

  return ContactManager.HeaderApp.List.Controller;
});
