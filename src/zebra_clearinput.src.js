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
 *  @version    1.0.2 (last revision: May 09, 2024)
 *  @copyright  (c) 2023 - 2024 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_ClearInput
 */
(function($) {

    'use strict';

    $.Zebra_ClearInput = function(element, options) {

        var defaults = {
                container_class_name: 'Zebra_ClearInput_Container',
                button_class_name: 'Zebra_ClearInput'
            },

            plugin = this,

            /**
             *  Constructor method
             */
            init = function() {

                plugin.settings = $.extend({}, defaults, options);

                // iterate over the elements the plugin is attached to
                $(element).each(function() {

                    var $element = $(this),

                        // get input's "position" attribute
                        position = $element.css('position'),

                        // the button to clear the input's value
                        $button = $('<a href="javascript: void(0)" tabindex="-1" class="' + plugin.settings.button_class_name + '">').html('×').on({

                            mouseover: function() {

                                // we're using this to know when the mouse is over the input field
                                $element.data('zci_mouseover', true);

                                // show the button for clearing the value
                                show($element);

                            },

                            mouseout: function() {

                                // we're using this to know when the mouse is over the input field
                                $element.removeData('zci_mouseover');

                                // hide the button for clearing the value
                                hide($element);

                            },

                            click: function() {

                                // clear value and give focus to the element
                                $element.val('').focus();

                                // hide the button forcefully
                                hide($element, true);

                            }

                        });

                    // the element the plugin is attached to
                    $element

                        // wrap the input in a container that we're going to use as a container for our button
                        // make sure its position is something other than "static"
                        .wrap($('<div class="' + plugin.settings.container_class_name + '">').css({
                            position: position === 'static' ? 'relative' : position
                        }))

                        // add the button and set its visibility to "hidden" for now
                        // because we nee to position it after we can get its size
                        .after($button.css({
                            visibility: 'hidden'
                        }))

                        // attach event listeners
                        // (we namespace them so we can easily remove them if destroyed)
                        .on({

                            'mouseover.Zebra_ClearInput': function() {

                                // we're using this to know when the mouse is over the input field
                                $element.data('zci_mouseover', true);

                                // show the button for clearing the value
                                show($element);

                            },

                            'mouseout.Zebra_ClearInput': function() {

                                // we're using this to know when the mouse is over the input field
                                $element.removeData('zci_mouseover');

                                // hide the button for clearing the value
                                hide($element);

                            },

                            'blur.Zebra_ClearInput': function() {

                                // hide the button for clearing the value
                                hide($element);

                            },

                            'keyup.Zebra_ClearInput': function() {

                                // show the button for clearing the value
                                show($element);

                            }

                        });

                    // the button is now in the DOM so we can position it correctly at the right of the input box
                    // and centered vertically
                    $button.css({
                        top: ($element.outerHeight() - $button.outerHeight()) / 2,
                        right: parseInt($element.css('paddingTop'), 10)
                    });

                    // restore visibility but hide from the DOM for now
                    $button.css('visibility', '').hide();

                    // store the reference to the button
                    $element.data('zci_button', $button);

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

                // get the reference to the button associated with the element given as argument
                var $button = $element.data('zci_button');

                // if "force" is TRUE or the mouse is not over the text input element and the text input element does
                // not have focus, hide the button
                if (force || (!$element.data('zci_mouseover') && !$element.is(':focus'))) $button.hide();

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

                // get the reference to the button associated with the element given as argument
                var $button = $element.data('zci_button');

                // if the input field has any value, show the button
                if ($element.val() !== '') $button.show();

                // hide it otherwise
                else $button.hide();

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

            // iterate over the elements the plugin is attached to
            $(element).each(function() {

                var $element = $(this),
                    $button = $element.data('zci_button');

                // if not already removed
                if ($button) {

                    // remove the button
                    $button.remove();

                    // remove the container DIV
                    $element.unwrap();

                    // remove event handlers attached to the input element
                    $element.off('.Zebra_ClearInput');

                    // remove associated data attribute
                    $element.removeData('zci_mouseover');
                    $element.removeData('zci_button');

                }

            });

        }

        plugin.settings = {};

        // fire it up!
        init();

    };

})(jQuery);
