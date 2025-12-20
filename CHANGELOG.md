## version 2.0.0 (December 20, 2025)

This release represents a complete refactoring of the plugin with significant performance improvements, better architecture, and enhanced functionality.

- implemented instance isolation by adding unique namespace per instance to support multiple independent plugin instances without conflicts
- optimized event binding by using delegated events to reduce the number of event listeners
- added `update()` method  to initialize clear buttons on inputs added to the DOM after plugin initialization
- added `button_content` configurable option for customizing the clear button's HTML content
- fixed layout issues in responsive designs by inheriting display properties
- password fields don't get the clear input button anymore by default - this can be enabled through the newly added `enable_on_password` configurable option

## version 1.0.2 (May 09, 2024)

- minor maintenance release

## version 1.0.1 (September 17, 2023)

- improved management of button and text overlapping

## version 1.0.0 (September 16, 2023)

- initial release
