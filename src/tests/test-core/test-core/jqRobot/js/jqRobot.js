/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

/*global jquery*/
var jqRobot = jqRobot || {};

(function ($, robot) {
    
    /*********************
     * doh.robot wrapper *
     *********************/
	
	/*
	 * doh.robot.sequence (may need to look into doh.Deferred)
		doh.robot.typeKeys ***done***
		doh.robot.keyPress ***done***
		doh.robot.keyDown ***done***
		doh.robot.keyUp
		doh.robot.mouseClick
		doh.robot.mousePress
		doh.robot.mouseMove
		doh.robot.mouseRelease
		doh.robot.mouseWheelSize
		doh.robot.mouseWheel
		doh.robot.setClipboard
	 */
	
	var dohWrapper = {
		
		/**
		 * Types a specified string of characters into the specified field
		 * 
		 * @param {Object} selector, a selector for the field to type into
		 * @param {Object} string, characters to be typed
		 * @param {Object} options, an options object with members delay (time to wait before executing) 
		 * and duration (time to spend executing the command)
		 */
		typeKeys: function (selector, string, options) {
			opts = options || {};
			$(selector).focus();
			
			doh.robot.typeKeys(string, opts.delay, opts.duration);
		},
		
		/**
		 * Executes a keyPress on a specified key, optionally with modifiers.
		 * 
		 * @param {Object} selector, selector, a selector for the field to type into
		 * @param {Object} character, a single character string or keycode
		 * @param {Object} options, an options object with members delay (time to wait before executing),
		 * asynchronous (a boolean value indicating it should type outside of the javascript thread),
		 * and modifiers an array of modifier keys to be pressed can be "alt", "ctrl", "shift", "meta"
		 */
		keyPress: function (selector, character, options) {
			opts = options || {};
			if (opts.modifiers) {
				var obj = {};
				$.each(opts.modifiers, function (idx, modifier) {
					obj[modifier] = true;
				});
			}
			
            $(selector).focus();
            
            doh.robot.keyPress(character, opts.delay, opts.modifiers, opts.asynchronous);
		},
		
		/**
		 * Executes a keyDown event on a specified key
		 * 
		 * @param {Object} selector, selector, a selector for the field to type into
		 * @param {Object} character, a single character string or keycode
		 * @param {Object} options, an options object with members delay (time to wait before executing)
		 */
		keyDown: function (selector, character, options) {
			opts = options || {};
            $(selector).focus();
			
			doh.robot.keyDown(character, opts.delay);
		},
        
        /**
         * Executes a keyUp event on a specified key
         * 
         * @param {Object} selector, selector, a selector for the field to type into
         * @param {Object} character, a single character string or keycode
         * @param {Object} options, an options object with members delay (time to wait before executing)
         */
        keyUp: function (selector, character, options) {
            opts = options || {};
            $(selector).focus();
            
            doh.robot.keyUp(character, opts.delay);
        }
	};
	
	// Mix these compatibility functions into the jqRobot namespace.
    $.extend(jqRobot, dohWrapper);
    
})(jQuery, doh.robot);
