define(["marionette", "tpl!apps/about/show/templates/message.tpl"], function(Marionette, messageTpl){
  return {
    Message: Marionette.ItemView.extend({
      template: messageTpl
    })
  };
});
