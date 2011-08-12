App.Controllers.Items = Backbone.Controller.extend({
   routes: {
    "items/:id":                "edit",
    "":                         "index",
    "new":                      "newItem"
  },
  
  edit: function(id) {
    var item = new Item({ id: id });
    item.fetch({
      success: function(model, resp) {
        new App.Views.Edit({ model: item });
      },
      error: function() {
        new Error({ message: 'Could not find that item.' });
        window.location.hash = '#';
      }
    });
  },
  
  index: function() {
    var items = new App.Collections.Items();
    items.fetch({
	    success: function() {
		    new App.Views.Index({ collection: items });
    	},
      error: function() {
	      new Error({ message: "Error loading items." });
      }
    });
  },
  
  newItem: function() {
    new App.Views.Edit({ model: new Item() });
  }
});