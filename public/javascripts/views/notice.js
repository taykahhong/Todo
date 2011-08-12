App.Views.Notice = Backbone.View.extend({
    className: "success",
    displayLength: 5000,
    defaultMessage: '',
    
    initialize: function() {
        _.bindAll(this, 'render');
        this.message = this.options.message || this.defaultMessage;
        this.render();
    },
    
    render: function() {
        var view = this;
        
        $(this.el).html(this.message);
        $(this.el).hide();
        $('#notice').html(this.el);
        $(this.el).fadeIn();
        $.doTimeout(this.displayLength, function() {
            $(view.el).fadeOut();
            $.doTimeout(1000, function() {
                view.remove();
            });
        });
        
        return this;
    }
});

App.Views.Error = App.Views.Notice.extend({
    className: "error",
    defaultMessage: 'Uh oh! Something went wrong. Please try again.'
});
