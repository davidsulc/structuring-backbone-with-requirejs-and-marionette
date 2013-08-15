define(["app", "apps/about/show/show_view"], function(ContactManager, View){
  return {
    showAbout: function(){
      var view = new View.Message();
      ContactManager.mainRegion.show(view);
    }
  };
});
