App.Views.Index = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  
  render: function() {
	  var self = this;
    $(this.el).html(JST.items_collection({ collection: this.collection }));
    $('#app').html(this.el);

		var max_items = this.collection.reject(function(item){ return item.get('status') == 'dead' });
		var max_id = max_items.length;
		
		var curr_index = 0;
    var curr_id = max_items[curr_index].get('id');		
		$('#' + curr_id).parent().addClass('selected');
		
		
	  // Press escape key to return to home
		$(document).keydown(function(e) {
	    if (e.keyCode == 27)
	      window.location.hash = '';
	 
	    if (e.keyCode == 9)
	      window.location.hash = 'new';
	  });

		// Press return key to edit selected item
    $(document).bind('keydown', 'return', function() {
	    window.location.hash = 'items/' + curr_id;
    });
 
    // Press space to toggle between done and undone
    $(document).bind('keydown', 'space', function() {
	    console.log(curr_id);
	    self.mark(curr_id);
	  });
	
	  // Press delete to remove an item
		$(document).bind('keydown', 'del', function() {
			$('#' + curr_id).parent().fadeOut(500, function() {
				
				max_items.splice(curr_index,1);
				
				curr_index == max_items.length ? curr_index-- : curr_index;
			  curr_id = max_items[curr_index].get('id');		
	      $('#' + curr_id).parent().addClass('selected');				   
			  
			  max_id = max_items.length;
		  });
		
	    self.clear(curr_id);
	  });
	
	  // Press up arrow to scroll up
		$(document).bind('keydown', 'up', function() {
			console.log(max_items.length);
	    if (curr_index != 0) {
		    $('li').removeClass('selected');
		
        curr_id = max_items[--curr_index].get('id');		
	      $('#' + curr_id).parent().addClass('selected');
      }
	  });
	
	  // Press down arrow to scroll down
		$(document).bind('keydown', 'down', function() {
	    if (curr_index != max_items.length - 1) {
	      $('li').removeClass('selected');
	
	      curr_id = max_items[++curr_index].get('id');		
	      $('#' + curr_id).parent().addClass('selected');
	    }
	  });	
  },

  mark: function(id) {
	  var item = $('#' + id);
	  item.hasClass('line-through') ? item.removeClass('line-through') : item.addClass('line-through');
    
    this.collection.get(id).toggle();
  },

  clear: function(id) {	  
	  this.collection.get(id).clear();
  }
});