'use strict';

(function(window, $){
    window.RepLogApp = function($wrapper) {
        this.$wrapper = $wrapper;
        this.helper = new Helper($wrapper);

        console.log(this.helper, Object.keys(this.helper));
        console.log(Helper, Object.keys(Helper));
        this.$wrapper.on(
            'click',
            '.js-delete-rep-log',
            this.handleRepLogDelete.bind(this)
        );
        this.$wrapper.on(
            'click', 
            'tbody tr',
            this.handleRowClick.bind(this)
        );

        this.$wrapper.on(
            'submit',
            '.js-new-rep-log-form',
            this.handleNewFormSubmit.bind(this)

        );
    };

    $.extend(window.RepLogApp.prototype, {

    updateTotalWeightLifted: function () {
        this.$wrapper.find('.js-total-weight').html(
            this.helper.calculateTotalWeight()
        );
    },

    handleRepLogDelete: function (e) {
        e.preventDefault();
        var $link = $(e.currentTarget);
        $link.addClass('text-danger');
        $link.find('.fa')
            .removeClass('fa-trash')
            .addClass('fa-spinner')
            .addClass('fa-spin');
        console.log(e.currentTarget === this);
        // console.dir(e.target);
        // console.log(e.target.className);
        // target is a property on the event object that points to the actual element that was clicked
        // return false;
        var deleteUrl = $link.data('url');
        // var deleteUrl = $(this)[0].dataset.url
        var $row = $link.closest('tr');
        var self = this;
        $.ajax({
            url: deleteUrl,
            method: 'DELETE',
            success: function(){
                $row.fadeOut('normal', function(){
                    $(this).remove();
                    self.updateTotalWeightLifted();
                });
            }
        });
    },

    handleRowClick: function () {
        console.log('row clicked');
    },

    handleNewFormSubmit: function(e){
        e.preventDefault();
        console.log('submitting');
        var $form = $(e.currentTarget);
        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize()
        });
    }
});

    var Helper = function($wrapper) {
        this.$wrapper = $wrapper;
    };

    $.extend(Helper.prototype, {
        calculateTotalWeight: function () {
            var totalWeight = 0;
            this.$wrapper.find('tbody tr').each(function(){
                totalWeight += $(this).data('weight');
            });
            return totalWeight;
        }
    });

})(window, jQuery);