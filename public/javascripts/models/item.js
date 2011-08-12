var Item = Backbone.Model.extend({
  url : function() {
    var base = 'items';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  },

  toggle: function() {
	  this.save({ done: !this.get("done") });
  },

  clear: function() {
	  this.save({ status: 'dead' })
  }
});