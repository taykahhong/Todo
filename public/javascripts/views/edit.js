App.Views.Edit = Backbone.View.extend({
  events: {
    "submit form": "save"
  },
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.render();
  },
  
  save: function() {
    var self = this;
    var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
    done = this.model.isNew() ? 'false' : this.model.get('done');
    status = this.model.isNew() ? 'live' : this.model.get('status');

    this.model.save({ task: this.$('[name=task]').val(), done: done, status: status }, {
      success: function(model, resp) {
        new App.Views.Notice({ message: msg });        
    	  $(document).unbind();	    
        window.location.hash = '';
        return false;
      },
      error: function() {
        new App.Views.Error();
      }
    });

    return false;
  },
  
  render: function() {
    $(this.el).html(JST.item({ model: this.model }));
    $('#app').html(this.el);
    
    this.$('[name=task]').val(this.model.get('task')).focus();

    this.delegateEvents();
  }
});