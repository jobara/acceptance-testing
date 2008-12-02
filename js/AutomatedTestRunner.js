/*
Copyright 2008 University of Cambridge
Copyright 2008 University of Toronto
Copyright 2008 University of California, Berkeley

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

/*global jQuery, doh*/
var fluid = fluid || {};

(function ($) {
    fluid.test = fluid.test || {};
    
    var testToRun;
    var context;
    var iframeOffsetTop = 0;
    var iframeOffsetLeft = 0;
    var adjustmentTop = 0;
    var adjustmentLeft = 0;
    var bodyClone;
    var iFrame;
    
    //private functions
    var setContext;
    var adjustedPosition;
    var setDelay;
    var iframeScrollOffset;
    var isInView;
    var scrollIntoView;
    var calculateViewTop;
    var calculateViewBottom;
    var calculateViewLeft;
    var calculateViewRight;
    
    //Sets context and binds the test to a button
    $(document).ready(function () {
        $("button").click(function () {
            $("button").parent().css('display', 'none');
            iFrame = $(context.iframe).contents();
            bodyClone = $("body", iFrame).clone();
            setContext(context);
            testToRun();
        });
        $(window).resize(function () {
            setContext(context);
        });
    });
    
    /**
     * Assigns the testFn so that it is attached to and can be called by a button click. 
     * Assigns the context for which the test is run in.
     * 
     * @param {Function} testFn contains all of the automated tests
     * @param {Object} contextObject sets the context of the test, the information about the iframe
     * contextObject has the following keys: iframe, adjustmentX, adjustmentY
     * 
     * iframe is the iframe node or jquery object containing it. If not provided, it will be assumed that there is no iframe.
     * adjustmentX is a numeric value specifying any additional x offset. The default is 0.
     * adjustmentY is a numeric value specifying any additional y offset. The default is 0.
     */
    fluid.test.runAutomatedTest = function (testFn, contextObject) {
        testToRun = testFn;
        context = contextObject;
    };
    
    
      //-----------------\\
     //Test Case Functions\\
    //---------------------\\
    
    
    /**
     * Assembles a test case by assigning the passed values to the doh.register function
     * 
     * @param {Object} testCaseObject contains the values to set up the test case
     * testCaseObject has the following keys: groupName, name, timeout, setUp, actionFunction, assertionFunction, tearDown
     * 
     * groupName is the name for which the test case belongs to (e.g. "mouse", "keyboard", etc). The default is "Automated Test Suite"
     * name is the name of the specific test case. This should be descriptive (e.g. "Edit Text"). The default is "Automated Test"
     * timeout is the maximum length of time,in milliseconds, a test can run before timing out. The default is 9000 milliseconds
     * setUp is a function called to setUp the test environment. The default is an empty function.
     * actionFunction is a function containing all of the actions you want to perform (e.g. <code>functions () {fluid.test.mouseClick(node)};</code>)
     * assertionFunction is an assertion function (e.g. fluid.test.assertTrue(expected, actual))
     * tearDown is a function called to reset the test environment. The default is an empty function.
     */
    fluid.test.testCase = function (testCaseObject) {
        var testGroupName;
        var testName;
        var timeoutValue;
        var setUpFunction;
        var testFunction;
        var tearDownFunction;
        
        if (testCaseObject) {
            testGroupName = testCaseObject.groupName || "Automated Test Suite";
            testName = testCaseObject.name || "Automated Test";
            timeoutValue = testCaseObject.timeout || 9000;
            setUpFunction = testCaseObject.setUp || function () {};
            testFunction = testCaseObject.test || function () {};
            tearDownFunction = testCaseObject.tearDown || function () {};
            
            doh.register(testGroupName, {
                name: testName,
                timeout: timeoutValue,
                setUp: function () {
                    setUpFunction();
                },
                runTest: function () {
                    var actions;
                    var assertions;
                    var d = new doh.Deferred();
                    
                    actions = testCaseObject.actionFunction || function () {};
                    assertions = testCaseObject.assertionFunction || function () {fluid.test.assertTrue(false); };
                    
                    actions();
                    
                    doh.robot.sequence(d.getTestCallback(assertions), 900);
                    return d;
                    
                },
                tearDown: function () {
                    tearDownFunction();
                }
            });
        }
    };
    
    /**
     * Must be called after all fluid.test.testCases, for the tests to run
     */
    fluid.test.run = function () {
        doh.run();
    };
    
    
      //--------------\\
     //Action Functions\\
    //------------------\\
    
    
    /**
     * Moves the mouse over the specified location on the screen by calling the doh.robot.mouseMove. 
     * This is a system level event.
     * 
     * If the location to move to is not in view, scrollIntoView is called.
     * Note that scrollIntoView is placed inside of a doh.robot.sequence function so that it will fire at the correct time.
     * 
     * @param {element||jQuery||Object} node a DOM element, a single jQuery elment, or an object containing coordinates with the keys left and top
     * @param {Object} optionsObject (optional) contains options to fine tune the coordinate offset and to set a delay 
     * optionsObject has the following keys: left, top, delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.mouseHover = function (location, optionsObject) {
        var delay = setDelay(optionsObject); 
        var position = adjustedPosition(location, optionsObject);
        
        if (!isInView(position)) {
            doh.robot.sequence(function () {
                scrollIntoView(position);
                position = adjustedPosition(location, optionsObject);
            }, 200, 200);
        }
        doh.robot.mouseMove(function () {
            return position.left;
        }, 
        function () {
            return position.top;
        }, delay);
    };
    
    /**
     * Moves the mouse over the specified location on the screen and clicks there with the left mouse button
     * It will attempt to scroll the screen to the correct location before performing the action
     * 
     * @param {element||jQuery||Object} node a DOM element, a single jQuery elment, or an object containing coordinates with the keys left and top
     * @param {Object} optionsObject (optional) contains options to fine tune the coordinate offset and to set a delay 
     * optionsObject has the following keys: left, top, delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.mouseClick = function (location, optionsObject) {
        var delay = setDelay(optionsObject);
        fluid.test.mouseHover(location, optionsObject);
        doh.robot.mouseClick({left: true}, delay);
    };
    
    /**
     * Moves the mouse over the specified draggable item on the screen and attempts to picks it up with a left mouse down
     * It will attempt to scroll the screen to the correct location before performing the action
     * 
     * @param {element||jQuery||Object} node a DOM element, a single jQuery elment, or an object containing coordinates with the keys left and top
     * @param {Object} optionsObject (optional) contains options to fine tune the coordinate offset and to set a delay 
     * optionsObject has the following keys: left, top, delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.mouseDrag = function (location, optionsObject) {
        var delay = setDelay(optionsObject);
        fluid.test.mouseHover(location, optionsObject);
        doh.robot.mousePress({left: true}, delay);
    };
    
    /**
     * Moves the mouse and draggable item to the specified location and releases the item with a left mouse up
     * 
     * @param {element||jQuery||Object} node a DOM element, a single jQuery elment, or an object containing coordinates with the keys left and top
     * @param {Object} optionsObject (optional)contains options to fine tune the coordinate offset and to set a delay 
     * optionsObject has the following keys: left, top, delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.mouseDrop = function (location, optionsObject) {
        var delay = setDelay(optionsObject);
        fluid.test.mouseHover(location, optionsObject);
        doh.robot.mouseRelease({left: true}, delay);
    };
    
    /**
     * Picks up the draggable item, and drops it at the specified location using mouse up and down 
     * It calls the mouseDrag and mouseDrop functions to perform the action
     * 
     * The drag and drop locations are specified as dragLocationObject and dropLocationObject
     * @param {Object} dragLocationObject contains the arguements for a mouseDrag as the following keys: location, optionsObject
     * @see fluid.test.mouseDrag
     * @param {Object} dropLocationObject contains the arguements for a mouseDrop as the following keys: location, optionsObject
     * @see fluid.test.mouseDrop
     */
    fluid.test.mouseDragAndDrop = function (dragLocationObject, dropLocationObject) {
        fluid.test.mouseDrag(dragLocationObject.node, dragLocationObject.optionsObject);
        fluid.test.mouseDrop(dropLocationObject.node, dropLocationObject.optionsObject);
    };
    
    /**
     * Presses down the key specified by the keyCode. Use in conjunction with fluid.test.keyUp
     * This is a system level event called through doh.robot.keyUp
     * 
     * @param {int} keyCode contains an integer value representing the keyCode
     * @see fluid.test.keys for keyCode assignments
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.keyDown = function (keyCode, optionsObject) {
        var delay = setDelay(optionsObject);
        doh.robot.keyDown(keyCode, delay);
    };
    
    /**
     * Releases the key specified by the keyCode. Use in conjunction with fluid.test.keyDown
     * This is a system level event called through doh.robot.keyDown
     * 
     * @param {int} keyCode contains an integer value representing the keyCode
     * @see fluid.test.keys for keyCode assignments
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.keyUp = function (keyCode, optionsObject) {
        var delay = setDelay(optionsObject);
        doh.robot.keyUp(keyCode, delay);
    };
    
    /**
     * Types the value specified by the keyCode
     * This is a system level event called through doh.robot.keyPress
     * This is analagous to performing a keyUp and keyDown operation in direct succession
     * Typing characters (a-z) is better done through typeString
     * @see fluid.tst.typeString
     * 
     * @param {int} keyCode contains an integer value representing the keyCode
     * @see fluid.test.keys for keyCode assignments
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.typeKeyCode = function (keyCode, optionsObject) {
        var delay = setDelay(optionsObject);
        doh.robot.keyPress(keyCode, delay);
    };
    
    /**
     * Types the value of string
     * This is a system level event called through doh.robot.typeKeys
     * 
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.typeString = function (string, optionsObject) {
        var delay = setDelay(optionsObject);
        doh.robot.typeKeys(string, delay);
    };
    
    /**
     * Peforms keyboard drag and drop. A keyboard drag and drop action involves holding down a modifier key
     * while tapping a direction key.
     * 
     * Assumes that the keyboard draggable item has already been selected
     * 
     * @param {Object} keyboardDragObject contains values specifying how and where to drag the item
     * keyboardDragObject has the following keys: directionKey, distance, modifierKey
     * modifierKey is a key such as CTRL that needs to be pushed to allow keyboard drag and drop
     * directionKey is a key that indicates which direction to move in, it can be either a keyCode or a String (keyCodes coresponding to letters won't work)
     * distance is the number of times to press the direction key
     * @see fluid.test.keys for keyCode assignments
     * The default values are modifierKey = CTRL, directionKey = Left, distance = 1
     * 
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.keyboardDragAndDrop = function (keyboardDragObject, optionsObject) {
        if (keyboardDragObject) {
            var direction = keyboardDragObject.directionKey || fluid.test.keys.LEFT;
            var modKey = keyboardDragObject.modifierKey || fluid.test.keys.CTRL;
            var numPresses = keyboardDragObject.distance || 1;
            var i;
        
            fluid.test.keyDown(modKey, optionsObject);
            if (typeof(direction) === "number") {
                for (i = 0; i < numPresses; i++) {
                    fluid.test.typeKeyCode(direction, optionsObject);
                }
            } else {
                for (i = 0; i < numPresses; i++) {
                    fluid.test.typeString(direction, optionsObject);
                }
            }
            fluid.test.keyUp(modKey, optionsObject); 
        }   
    };
    
    /**
     * Peforms keyboard movement. It is very similar to the keyboardDragAndDrop function except
     * it only moves selection, and not an item
     * 
     * Assumes that focus is in the correct position
     * 
     * @param {Object} keyboardMoveObject contains values specifying how and where to move selection
     * keyboardMoveObject has the following keys: directionKey, distance
     * 
     * directionKey is a key that indicates which direction to move it can be either a keyCode or a String (keyCodes coresponding to letters won't work)
     * distance is the number of times to press the direction key
     * 
     * @see fluid.test.keys for keyCode assignments
     * The default values are directionKey = Left, distance = 1
     * 
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.keyboardMovement = function (keyboardMoveObject, optionsObject) {
        if (keyboardMoveObject) {
            var direction = keyboardMoveObject.directionKey || fluid.test.keys.LEFT;
            var numPresses = keyboardMoveObject.distance || 1;
            var i;
            
            if (typeof(direction) === "number") {
                for (i = 0; i < numPresses; i++) {
                    fluid.test.typeKeyCode(direction, optionsObject);
                }
            } else {
                for (i = 0; i < numPresses; i++) {
                    fluid.test.typeString(direction, optionsObject);
                }
            }
        } 
    };
    
    /**
     * Tabs to the specified element.
     * This is somewhat artificial as it applies focus to the passed element, shift-tabs off, and tabs back onto the element
     * 
     * @param {element||jQuery} node is a DOM element or single jQuery element
     * 
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.tabTo = function (node, optionsObject) {
        $(node).focus();
        
        fluid.test.keyDown(fluid.test.keys.SHIFT, optionsObject);
        fluid.test.typeKeyCode(fluid.test.keys.TAB, optionsObject);
        fluid.test.keyUp(fluid.test.keys.SHIFT, optionsObject);
        fluid.test.typeKeyCode(fluid.test.keys.TAB, optionsObject);
    };
    
    /**
     * Shift-tabs to the specified element.
     * This is somewhat artificial as it applies focus to the passed element, tabs off, and shift-tabs back onto the element
     * 
     * @param {element||jQuery} node is a DOM element or single jQuery element
     * 
     * @param {Object} optionsObject (optional) contains an option to set the delay
     * optionsObject has the following key: delay
     * delay defualts to 500 milliseconds and used to specify the time to wait before firing
     */
    fluid.test.shiftTabTo = function (node, optionsObject) {
        $(node).focus();
        
        fluid.test.typeKeyCode(fluid.test.keys.TAB, optionsObject);
        fluid.test.keyDown(fluid.test.keys.SHIFT, optionsObject);
        fluid.test.typeKeyCode(fluid.test.keys.TAB, optionsObject);
        fluid.test.keyUp(fluid.test.keys.SHIFT, optionsObject);
    };
    
    /**
     * Provedes a set of keyCode values to use in place of the integer values
     * @final
     */
    fluid.test.keys = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        META: 19,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
    };
    
    
      //-----------------\\
     //Assertion Functions\\
    //---------------------\\
    
    
    /**
     * Asserts that the passed object is truethy
     * Calls doh.assertTrue to perform the assertion
     * 
     * @param {Object} object contains the object to test
     */
    fluid.test.assertTrue = function (object) {
        doh.assertTrue(object);
    };
    
    /**
     * Asserts that the passed object is falsey
     * Calls doh.assertFalse to perform the assertion
     * 
     * @param {Object} object contains the object to test
     */
    fluid.test.assertFalse = function (object) {
        doh.assertFalse(object);
    };
    
    /**
     * Asserts that the expected value equals the actual value
     * Calls doh.assertEqual to perform the assertion
     * 
     * @param {Object} object contains the object to test
     */
    fluid.test.assertEqual = function (expected, actual) {
        doh.assertEqual(expected, actual);
    };
    
    /**
     * Asserts that the notExpected value does not equal the actual value
     * Calls doh.assertNotEqual to perform the assertion
     * 
     * @param {Object} object contains the object to test
     */
    fluid.test.assertNotEqual = function (notExpected, actual) {
        doh.assertNotEqual(notExpected, actual);
    };
    
      //--------------\\
     //Public Functions\\
    //------------------\\
        
    /**
     * Refreshes the iframe by replacing the body with a cloned version of the original body
     * After replacing the body, it runs the passed refreshFn and updates the clone
     * 
     * @param {Function} refreshFn is a function which tells it what other refresh operations need to take place.
     */
    fluid.test.refreshIframe = function (refreshFn) {
        var refresh = refreshFn || function () {};
        $("body", iFrame).replaceWith(bodyClone);
        refresh();
        bodyClone = $("body", iFrame).clone();
    };

    
      //---------------\\
     //Private Functions\\
    //-------------------\\
    
    
    /**
     * Calculates the absolute position of a node, taking into account the offsets passed in the contextObject
     * 
     * @param {element||jQuery||Object} node a DOM element, a single jQuery elment, or an object containing coordinates with the keys left and top
     * @param {Object} optionsObject (optional) contains options to fine tune the coordinate offset
     * optionsObject has the following keys: left, top
     * 
     * @return {Object} containing the adjusted coordinates with the following keys: left, top
     * @private
     */  
    adjustedPosition = function (node, offsetObject) {
        var leftPosition;
        var topPosition;
        var nodeLeft = 0;
        var nodeTop = 0;
        var offsetLeft = 0;
        var offsetTop = 0;
        var position = {};
        var scrollWindow = $(document);
        var scrollIframe = iframeScrollOffset(context.iframe);
        var offsets;
        
        if (offsetObject) {
            offsetLeft = offsetObject.left || 0;
            offsetTop = offsetObject.top || 0;
        }
        
        if (node.jquery || node.nodeType !== undefined) {
            offsets = $(node).offset();

            nodeLeft = offsets.left;
            nodeTop = offsets.top;
        } else if (node) {
            nodeLeft = node.left || 0;
            nodeTop = node.top || 0; 
        }
        
        leftPosition = nodeLeft + offsetLeft + adjustmentLeft + iframeOffsetLeft - scrollWindow.scrollLeft() - scrollIframe.left;
        topPosition = nodeTop + offsetTop + adjustmentTop + iframeOffsetTop - scrollWindow.scrollTop() - scrollIframe.top;
        
        position = {
            left: leftPosition,
            top: topPosition
        };
        
        return position;
    };
    
    /**
     * Sets the delay. The actions won't happen until after the delay time has passed.
     * 
     * @param {Object} delayObject contains the value specifying the delay time in milliseconds
     * delayObject has the following key: delay
     * The default value is 500 milliseconds.
     * 
     * @return an integer value of the delay time
     * @private
     */
    setDelay = function (delayObject) {
        var delayTime = 500;
        if (delayObject) {
            delayTime = delayObject.delay || 500;
        }
        return delayTime;
    };
    
    /**
     * Sets the context variables
     * Context variables are the iframe and additional offsets
     * 
     * @param {Object} contextObject containing values specifying the iframe and any other offsets necessary
     * iframe is the iframe node or jquery object containing it. If not provided, it will be assumed that there is no iframe.
     * adjustmentX is a numeric value specifying any additional x offset. The default is 0.
     * adjustmentY is a numeric value specifying any additional y offset. The default is 0.
     * @private
     */
    setContext = function (contextObject) {
        var offsets;
        
        if (contextObject) {
            if (contextObject.iframe) {
                offsets = $(contextObject.iframe).offset();
                iframeOffsetTop = offsets.top || 0;
                iframeOffsetLeft = offsets.left || 0;
            }
            adjustmentTop = contextObject.adjustmentY || 0;
            adjustmentLeft = contextObject.adjustmentX || 0;
        }
    };
    
    /**
     * Determines the scroll offset of the iframe
     * 
     * @param {element||jQuery} frame is a DOM element or a single jQuery element representing an iframe
     * @return {Object} containing the scroll offsets with the following keys: top, left
     * @private
     */
    iframeScrollOffset = function (frame) {
        var scrollOffsetTop = 0;
        var scrollOffsetLeft = 0;
        var scrolledFrame;
        var scrollOffset;
        
        if (frame) {
            scrolledFrame = $(frame).contents().find("html");
            scrollOffsetTop = scrolledFrame.scrollTop();
            scrollOffsetLeft = scrolledFrame.scrollLeft();
        }
        
        scrollOffset = {
            top: scrollOffsetTop,
            left: scrollOffsetLeft
        };
        
        return scrollOffset;
    };
    
    /**
     * Determines whether or not a given position is currently visible in the viewport
     * 
     * @param {Object} positionObject containing the the coordinates of position to test
     * positionObject has the following keys: top, left
     * 
     * @return a boolean value of true if the position is in view and false otherwise
     * @private
     */
    isInView = function (positionObject) {
        var positionTop;
        var positionLeft;
        var frame;
        var pageHeight;
        var pageWidth;
        var viewAreaVertical;
        var viewAreaHorizontal;
        
        if (positionObject) {
            positionTop = positionObject.top || 0;
            positionLeft = positionObject.left || 0;
            
            frame = $(context.iframe);
            pageHeight = $(window).height();
            pageWidth = $(window).width();
            
            viewAreaVertical = {
                top: calculateViewTop(),
                bottom: calculateViewBottom()
            };
            
            viewAreaHorizontal = {
                left: calculateViewLeft(),
                right: calculateViewRight()
            };
            
            if (positionTop >= viewAreaVertical.top && positionTop <= viewAreaVertical.bottom && positionLeft >= viewAreaHorizontal.left && positionLeft <= viewAreaHorizontal.right) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    
    /**
     * Adjusts the scroll of the iframe to attempt to centre the passed position within the viewport
     * 
     * @param {Object} positionObject contains the coordinates of the position to centre the viewport on
     * positionObject has the following keys: top, left
     * @private
     */
    scrollIntoView = function (positionObject) {
        var positionTop;
        var positionLeft;
        var frame;
        var frameScroll;
        var frameScrollTop;
        var frameScrollLeft;
        var frameHeight;
        var frameWidth;
        var page;
        var pageHeight;
        var pageWidth;
        var viewHeight;
        var viewWidth;
        var midVert;
        var midHor;
        var newScrollTop;
        var newScrollLeft;
        
        if (positionObject) {
            positionTop = positionObject.top || 0;
            positionLeft = positionObject.left || 0;
            
            frame = $(context.iframe);
            frameHeight = frame.innerHeight();
            frameWidth = frame.innerWidth();
            frameScroll = frame.contents().find("html");
            frameScrollTop = frameScroll.scrollTop();
            frameScrollLeft = frameScroll.scrollLeft();
            
            page = $(window);
            pageHeight = page.height();
            pageWidth = page.width();
            
            viewHeight = Math.min(pageHeight, frameHeight);
            viewWidth = Math.min(pageWidth, frameWidth);
            
            midVert = (viewHeight / 2);
            midHor = (viewWidth / 2);
            
            if (positionTop < midVert) {
                if (positionTop < 0) {
                    newScrollTop = 0;
                } else {
                    newScrollTop = Math.max(0, frameScrollTop - (midVert - positionTop));  
                }
                
            } else {
                newScrollTop = positionTop - midVert + frameScrollTop;
            }
            
            if (positionLeft < midHor) {
                if (positionLeft < 0) {
                    newScrollLeft = 0;
                } else {
                    newScrollLeft = Math.max(0, frameScrollLeft - (midHor - positionLeft));  
                }
                
            } else {
                newScrollLeft = positionLeft - midHor  + frameScrollLeft;
            }
            
            frameScroll.scrollTop(newScrollTop);
            page.scrollLeft(newScrollLeft);
        }
    };
    
    /**
     * Calculates what the top of the current viewport is
     * 
     * @return the integer value of its position
     * @private
     */
    calculateViewTop = function () {
        var pageHeight = $(window).height();
        var frame = $(context.iframe);
        var pageTop; 
        
        pageTop = Math.max(0, pageHeight - frame.innerHeight());
        
        return pageTop;
        
    };
    
    /**
     * Calculates what the bottom of the current viewport is
     * 
     * @return the integer value of its position
     * @private
     */
    calculateViewBottom = function () {
        var pageHeight = $(window).height();
        var pageBottom;
        
        pageBottom = pageHeight;
        
        return pageBottom;
    };
    
    /**
     * Calculates what the left of the current viewport is
     * 
     * @return the integer value of its position
     * @private
     */
    calculateViewLeft = function () {
        var pageWidth = $(window).width();
        var frame = $(context.iframe);
        var pageLeft;
        
        pageLeft = Math.max(0, pageWidth - frame.innerWidth());
        
        return pageLeft;
    };
    
    /**
     * Calculates what the right of the current viewport is
     * 
     * @return the integer value of its position
     * @private
     */
    calculateViewRight = function () {
        var pageWidth = $(window).width();
        var pageRight;
        
        pageRight = pageWidth;
        
        return pageRight;
    };
    
})(jQuery);
