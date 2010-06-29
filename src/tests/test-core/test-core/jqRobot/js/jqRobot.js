/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

/*global jQuery, doh*/
var jqRobot = jqRobot || {};

(function ($, robot) {
    
    /*********************
     * doh.robot wrapper *
     *********************/
    
    //helper functions

    var arrayToObj = function (array) {
        var obj = {};
        array = array || [];
        $.each(array, function (idx, item) {
            obj[item] = true;
        });
        return obj;
    };

    var moveMouseToCoordinate = function (position, options) {
        var opts = options || {};
        
        doh.robot.mouseMove(position.x, position.y, opts.delay, opts.duration);
    };

    var moveMouse = function (selector, options) {
        var sel = $(selector);
        var offset = sel.offset();
        
        moveMouseToCoordinate({x: offset.left, y: offset.top}, options);
    };
    
    var moveToLocation = function (location, options) {
        if (location.x && location.y) {
            moveMouseToCoordinate(location, options);
        } else {
            location = $(location);
            location.focus();
            moveMouse(location, options);
        }
    };

    var mouseFunc = function (funcName, location, buttons, options) {
        var opts = options || {};
        var btns = arrayToObj(buttons);
        
        moveToLocation(location, options);
        doh.robot[funcName](btns, opts.delay);
    };

    //doh.robot wrapper functions
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
            var opts = options || {};
			
            jqRobot.sequence($(selector).focus);
            doh.robot.typeKeys(string, opts.delay, opts.duration);
        },

        /**
         * Executes a keyPress of a specified key, optionally with modifiers.
         * 
         * @param {Object} selector, selector, a selector for the field to type into
         * @param {Object} character, a single character string or keycode
         * @param {Object} options, an options object with members delay (time to wait before executing),
         * asynchronous (a boolean value indicating it should type outside of the javascript thread),
         * and modifiers an array of modifier keys to be pressed can be "alt", "ctrl", "shift", "meta"
         */
        keyPress: function (selector, character, options) {
            var opts = options || {};
            opts.modifiers = arrayToObj(opts.modifiers);
            
            jqRobot.sequence($(selector).focus);
            doh.robot.keyPress(character, opts.delay, opts.modifiers, opts.asynchronous);
        },

        /**
         * Executes a keyDown event of a specified key
         * 
         * @param {Object} selector, selector, a selector for the field to type into
         * @param {Object} character, a single character string or keycode
         * @param {Object} options, an options object with members delay (time to wait before executing)
         */
        keyDown: function (selector, character, options) {
            var opts = options || {};
            
			jqRobot.sequence($(selector).focus);
            doh.robot.keyDown(character, opts.delay);
        },
        
        /**
         * Executes a keyUp event of a specified key
         * 
         * @param {Object} selector, selector, a selector for the field to type into
         * @param {Object} character, a single character string or keycode
         * @param {Object} options, an options object with members delay (time to wait before executing)
         */
        keyUp: function (selector, character, options) {
            var opts = options || {};
			
			jqRobot.sequence($(selector).focus);
            doh.robot.keyUp(character, opts.delay);
        }, 
        
        /**
         * Moves the mouse over the specified location and performs a click.
         * 
         * @param {Object} location, a selector or a position object with members x and y
         * @param {Object} buttons, an array of mouse buttons to be clicked, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseClick: function (location, buttons, options) {
            mouseFunc("mouseClick", location, buttons, options);
        },
        
        /**
         * Convenience method to perform a drag operation
         * 
         * @param {Object} startLocation, (drag begins) a selector or a position object with members x and y
         * @param {Object} endeLocation, (drag ends) a selector or a position object with members x and y
         * @param {Object} buttons, an array of mouse buttons to be clicked, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseDrag: function (startLocation, endLocation, buttons, options) {
            jqRobot.mousePress(startLocation, buttons, options);
            jqRobot.mouseMove(endLocation, buttons, options);
        },
        
        /**
         * Convenience method to perform a drag and drop operation
         * 
         * @param {Object} startLocation, (drag begins) a selector or a position object with members x and y
         * @param {Object} endeLocation, (drop location) a selector or a position object with members x and y
         * @param {Object} buttons, an array of mouse buttons to be clicked, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseDragAndDrop: function (startLocation, endLocation, buttons, options) {
            jqRobot.mousePress(startLocation, buttons, options);
            jqRobot.mouseRelease(endLocation, buttons, options);
        },

        /**
         * Moves the mouse over the specified location and performs a press.
         * 
         * @param {Object} location, a selector or a position object with members x and y
         * @param {Object} buttons, an array of mouse buttons to be pressed, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mousePress: function (location, buttons, options) {
            mouseFunc("mousePress", location, buttons, options);
        }, 

        /**
         * Moves the mouse over the specified location.
         * 
         * @param {Object} location, a selector or a position object with members x and y
         * @param {Object} options, an options object with member duration (time to spend moving the mouse to the specified location)
         */
        mouseMove: function (location, options) {
            moveToLocation(location, options);
        },
        
        /**
         * Moves the mouse over the specified location and performs a release.
         * 
         * @param {Object} location, a selector or a position object with members x and y
         * @param {Object} buttons, an array of mouse buttons to be released, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseRelease: function (location, buttons, options) {
            mouseFunc("mouseRelease", location, buttons, options);
        },
        
        /**
         * Scrolls the mouse wheel the specified amount.
         * 
         * @param {Object} scrollAmount, the amount to scroll the wheel. Positive = Down, Negative = Up
         * @param {Object} options, an options object with members delay (time to wait before executing),
         * duration (time to spend scrolling the mouse wheel),
         * scrollSize (the size of each notch on the scroll wheel)
        */
        mouseScroll: function  (scrollAmount, options) {
            var opts = options || {};
            
            if (opts.scrollSize) {
                doh.robot.mouseWheelSize = opts.scrollSize;
            }
            
            doh.robot.mouseWheel(scrollAmount, opts.delay, opts.duration);
        },
        
		/**
		 * Sets the system's clipboard data
		 * 
		 * @param {Object} data, the data to save to the clipboard
		 * @param {Object} options, an options object with member format specifing html ("ext/html")
		 * otherwise it will assume the format is plain text.
		 */
        setClipboard: function (data, options) {
            var opts = options || {};
            opts.format = opts.format === "html" ? "text/html" : "";
            
            doh.robot.setClipboard(data, opts.format);
        }, 
		
		/**
		 * Used to defer a function call.
		 * This is useful for adding in javascript functions that must be executed synchronously with
		 * the robot actions.
		 * 
		 * @param {Object} func, a function to be executed
		 * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend executing the function)
		 */
		sequence: function (func, options) {
			var opts = options || {};
			
			doh.robot.sequence(func, opts.delay, opts.duration);
		}
    };

    // Mix these compatibility functions into the jqRobot namespace.
    $.extend(jqRobot, dohWrapper);
    
})(jQuery, doh.robot);
