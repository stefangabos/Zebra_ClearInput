$(document).ready(function() {

    $('#destroy').on('click', function() {
        clearInput.destroy();
    });

    $('#enable').on('click', function() {
        clearInput = new $.Zebra_ClearInput('input[type="text"]');
    }).trigger('click');



});