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
    
    /*
    * doh.robot.sequence (may need to look into doh.Deferred)
        doh.robot.typeKeys ***done***
        doh.robot.keyPress ***done***
        doh.robot.keyDown ***done***
        doh.robot.keyUp ***done***
        doh.robot.mouseClick
        doh.robot.mousePress
        doh.robot.mouseMove
        doh.robot.mouseRelease
        doh.robot.mouseWheelSize
        doh.robot.mouseWheel
        doh.robot.setClipboard
    */
    
    //helper functions

    var arrayToObj = function (array) {
        var obj = {};
        array = array || [];
        $.each(array, function (idx, item) {
            obj[item] = true;
        });
        return obj;
    };

    var moveMouseToCoordinate = function (x, y, options) {
        var opts = options || {};
        
        doh.robot.mouseMove(x, y, opts.delay, opts.duration);
    };

    var moveMouse = function (selector, options) {
        var sel = $(selector);
        var coor = sel.offset();
        
        moveMouseToCoordinate(coor.left, coor.top, options);
    };

    var mouseFuncWithCoordinate = function (func, x, y, buttons, options) {
        var opts = options || {};
        var btns = arrayToObj(buttons);
        
        moveMouseToCoordinate(x, y, opts);
        
        doh.robot[func](btns, opts.delay);
    };
    
    var mouseFuncWithSelector = function (func, selector, buttons, options) {
        var opts = options || {};
        var btns = arrayToObj(buttons);
        var sel = $(selector);
        
        sel.focus();
        moveMouse(sel, opts);
        
        doh.robot[func](btns, opts.delay);
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
            $(selector).focus();
            
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
            
            $(selector).focus();
            
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
            $(selector).focus();
            
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
            $(selector).focus();
            
            doh.robot.keyUp(character, opts.delay);
        }, 
        
        /**
         * Moves the mouse over the specified element and performs a click.
         * 
         * @param {Object} selector, a selector for the element to click
         * @param {Object} buttons, an array of mouse buttons to be clicked, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseClick: function (selector, buttons, options) {
            mouseFuncWithSelector("mouseClick", selector, buttons, options);
        },

        /**
         * Moves the mouse over the specified coordinate and performs a click.
         * 
         * @param {Object} x, the x coordinate to move to.
         * @param {Object} y, the y coordinate to move to.
         * @param {Object} buttons, an array of mouse buttons to be clicked, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseClickAt: function (x, y, buttons, options) {
            mouseFuncWithCoordinate("mouseClick", x, y, buttons, options);
        },

        mouseDrag: function () {
            
        },
        
        mouseDragAt: function () {
            
        },

        /**
         * Moves the mouse over the specified element and performs a press.
         * 
         * @param {Object} selector, a selector for the element for the mouse to be pressed over
         * @param {Object} buttons, an array of mouse buttons to be pressed, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mousePress: function (selector, buttons, options) {
            mouseFuncWithSelector("mousePress", selector, buttons, options);
        }, 

        /**
         * Moves the mouse over the specified coordinate and performs a press.
         * 
         * @param {Object} x, the x coordinate to move to.
         * @param {Object} y, the y coordinate to move to.
         * @param {Object} buttons, an array of mouse buttons to be pressed, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mousePressAt: function (x, y, buttons, options) {
            mouseFuncWithCoordinate("mousePress", x, y, buttons, options);
        },

        /**
         * Moves the mouse over the specified element.
         * 
         * @param {Object} selector, a selector for the element to move to
         * @param {Object} options, an options object with member duration (time to spend moving the mouse to the specified location)
         */
        mouseMove: function (selector, options) {
            moveMouse(selector, options);
        },

        /**
         * Moves the mouse over the specified coordinate.
         * 
         * @param {Object} x, the x coordinate to move to.
         * @param {Object} y, the y coordinate to move to.
         * @param {Object} options, an options object with member duration (time to spend moving the mouse to the specified location)
         */
        mouseMoveTo: function (x, y, options) {
            moveMouseToCoordinate(x, y, options);
        },
        
        /**
         * Moves the mouse over the specified element and performs a release.
         * 
         * @param {Object} selector, a selector for the element for the mouse to be released over
         * @param {Object} buttons, an array of mouse buttons to be released, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseRelease: function (selector, buttons, options) {
            mouseFuncWithSelector("mouseRelease", selector, buttons, options);
        },
        
        /**
         * Moves the mouse over the specified coordinate and performs a release.
         * 
         * @param {Object} x, the x coordinate to move to.
         * @param {Object} y, the y coordinate to move to.
         * @param {Object} buttons, an array of mouse buttons to be released, can be "left", "middle", "right"
         * @param {Object} options, an options object with members delay (time to wait before executing) 
         * and duration (time to spend moving the mouse to the specified location)
         */
        mouseReleaseAt: function (x, y, buttons, options) {
            mouseFuncWithCoordinate("mouseRelease", x, y, buttons, options);
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
        }
    };

    // Mix these compatibility functions into the jqRobot namespace.
    $.extend(jqRobot, dohWrapper);
    
})(jQuery, doh.robot);
