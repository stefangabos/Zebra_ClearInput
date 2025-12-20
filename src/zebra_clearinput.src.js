/**
 *  Zebra ClearInput
 *
 *  A tiny jQuery plugin for enhancing web forms by allowing users to easily clear values in input boxes.
 *
 *  Zebra ClearInput is a lightweight jQuery plugin designed to enhance the usability of web forms by adding a
 *  user-friendly feature that allows users to effortlessly clear the content of input fields. This is achieved by
 *  attaching a small icon to input fields. When users click on this icon, it promptly erases any text that has been
 *  entered.
 *
 *  As soon as a user begins typing in the input field, the option to clear the input value becomes visible. Once the
 *  input field loses focus, the option to clear the value reappears when the mouse hovers over the input field.
 *
 *  Features:
 *
 *  -   it works out of the box and has (almost) no configuration options
 *  -   works in all modern browsers
 *
 *  Read more {@link https://github.com/stefangabos/Zebra_ClearInput/ here}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    2.0.0 (last revision: December 20, 2025)
 *  @copyright  (c) 2023 - 2025 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_ClearInput
 */
(function($) {

    'use strict';

    $.Zebra_ClearInput = function(selector, options) {

        var defaults = {
                container_class_name: 'Zebra_ClearInput_Container',
                button_class_name: 'Zebra_ClearInput',
                button_content: '×',
                enable_on_password: false
            },

            plugin = this,

            /**
             *  Constructor method
             */
            init = function() {

                plugin.settings = $.extend({}, defaults, options);

                // create unique namespace for this instance to avoid conflicts with other instances
                plugin.namespace = '.zebra_clear_input_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);

                // track elements for this instance
                plugin.elements = [];

                // iterate over the elements the plugin needs to be attached to
                $(selector).each(function() {

                    var $element = $(this);

                    // only process input and textarea elements
                    if (!$element.is('input, textarea')) return;

                    // skip password fields unless explicitly enabled
                    if ($element.is('input[type="password"]') && !plugin.settings.enable_on_password) return;

                    var // get input's "position" attribute
                        position = $element.css('position'),

                        // the button to clear the input's value
                        $button = $('<a href="javascript: void(0)" tabindex="-1" class="' + plugin.settings.button_class_name + '">').html(plugin.settings.button_content);

                    // track elements for this instance
                    plugin.elements.push($element);

                    // the element the plugin is attached to
                    $element

                        // wrap the input in a container that we're going to use as a container for our button
                        // make sure its position is something other than "static"
                        // (the container inherits the input's display to preserve layout)
                        .wrap($('<div class="' + plugin.settings.container_class_name + '">').css({
                            position: position === 'static' ? 'relative' : position,
                            display: $element.css('display'),
                            verticalAlign: $element.css('vertical-align')
                        }))

                        // add the button and set its visibility to "hidden" for now
                        // because we need to position it after we can get its size
                        .after($button.css({
                            visibility: 'hidden'
                        }));

                    // the button is now in the DOM so we can position it correctly at the right of the input box
                    // limit button height to prevent overflow with 2px spacing from input borders
                    var input_height = $element.outerHeight(),
                        button_height = $button.outerHeight(),
                        button_spacing = parseInt($element.css('borderTopWidth'), 10) + 2, // border width + 2px spacing
                        max_button_height = input_height - (button_spacing * 2);

                    // if button's height is too large compared to the input's height, adjust it so that is also has breathing space
                    if (button_height > max_button_height) $button.css('height', max_button_height);

                    // calculate the button's best position
                    var button_position = (input_height - $button.outerHeight()) / 2;

                    // place the button
                    $button.css({
                        top: button_position,
                        right: button_position,
                        overflow: 'hidden'
                    });

                    // restore visibility but hide from the DOM for now
                    $button.css('visibility', '').hide();

                    // store the reference to the button and the input element on the container
                    $element.data('zci_button', $button);
                    $element.parent().data('zci_input', $element);

                });

                $(document).on('mouseover' + plugin.namespace, '.' + plugin.settings.container_class_name, function() {

                    var $element = $(this).data('zci_input');

                    // we're using this to know when the mouse is over the container
                    $element.data('zci_mouseover', true);

                    // show the button for clearing the value
                    show($element);

                });

                $(document).on('mouseout' + plugin.namespace, '.' + plugin.settings.container_class_name, function() {

                    var $element = $(this).data('zci_input');

                    // we're using this to know when the mouse is over the container
                    $element.data('zci_mouseover', false);

                    // hide the button for clearing the value
                    hide($element);

                });

                $(document).on('blur' + plugin.namespace, '.' + plugin.settings.container_class_name + ' input', function() {

                    // hide the button for clearing the value
                    hide($(this));

                });

                $(document).on('focus' + plugin.namespace + ' keyup' + plugin.namespace, '.' + plugin.settings.container_class_name + ' input', function() {

                    // show the button for clearing the value
                    show($(this));

                });

                $(document).on('click' + plugin.namespace, '.' + plugin.settings.button_class_name, function() {

                    var $element = $(this).prev();

                    // clear value and give focus to the element
                    $element.val('').trigger('focus');

                    // hide the button forcefully
                    hide($element, true);

                });

            },

            /**
             *  Hides the button for clearing the text input element's value.
             *
             *  The button is hidden only if the mouse is not over the text input element and the text input element does
             *  not have focus.
             *
             *  This behavior can be overwritten by setting the {@force} argument to `TRUE`.
             *
             *  @param  jQuery  $element    The text input element, as jQuery object, for which to hide the associated
             *                              button.
             *
             *  @param  boolean force       (Optional) Setting this `TRUE` will hide the button even if the mouse is
             *                              over the text input element and the text input element has the focus.
             *
             *                              Default is `FALSE`
             *
             *  @access private
             *  @return void
             */
            hide = function($element, force) {

                // if "force" is TRUE or the mouse is not over the text input element and the text input element does
                // not have focus, hide the button
                if (force || (!$element.data('zci_mouseover') && !$element.is(':focus'))) $element.data('zci_button').hide();

            },

            /**
             *  Shows the button for clearing the text input element's value *if* the text input element has a value
             *
             *  @param  jQuery  $element    The text input element, as jQuery object, for which to hide the associated
             *                              button.
             *
             *  @access private
             *  @return void
             */
            show = function($element) {

                // if the input field has any value, show the button
                if ($element.val() !== '') $element.data('zci_button').show();

                // hide it otherwise
                else $element.data('zci_button').hide();

            };

        /**
        *  Removes a previously created instance of the plugin.
        *
        *   <code>
        *   // apply to all text input elements
        *   var clearInput = new $.Zebra_ClearInput($('input[type="text"]'));
        *
        *   // remove plugin
        *   clearInput.destroy();
        *   </code>
        *
        *  @return void
        */
        plugin.destroy = function() {

            // remove only this instance's event handlers
            $(document).off(plugin.namespace);

            // iterate over the elements from this instance
            $.each(plugin.elements, function(_, $element) {

                var $button = $element.data('zci_button');

                // if not already removed
                if ($button) {

                    // remove the button
                    $button.remove();

                    // remove the container DIV
                    $element.unwrap();

                    // remove associated data attributes
                    $element.removeData('zci_mouseover');
                    $element.removeData('zci_button');

                }

            });

            // clear the elements array
            plugin.elements = [];

        }

        plugin.settings = {};

        // fire it up!
        init();

    };

})(jQuery);
