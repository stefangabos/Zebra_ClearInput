$(document).ready(function() {

    var clearInput,

        enable = function() {
            clearInput = new $.Zebra_ClearInput('input[type="text"]');
        },

        disable = function() {
            clearInput.destroy();
        };

    $('#destroy').on('click', function() {
        disable();
        $.Zebra_Dialog('Plugin removed', {type: 'error'});
    });

    $('#enable').on('click', function() {
        enable();
        $.Zebra_Dialog('Plugin enabled');
    });

    enable();

});