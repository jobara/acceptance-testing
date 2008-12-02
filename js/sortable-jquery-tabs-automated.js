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

/*global jQuery, $, fluid*/
fluid.test.runAutomatedTest(function () {   
 
    //Variables which can be used by all tests
    var iframe = $("#testFrame");
    var iframeContents = iframe.contents();
    var selector = "li[id^='tab_']";
    var tabs = iframeContents.find(selector);
    var numTabs = tabs.length;
    var currentPosition;
    var locations = [];
    var i;
    var reset = function () {
        $(window)[0].frames.testFrame.demo.initJqueryTabs();
    };
    
    //private functions
    var calculatedPosition;
    var tabsIndex;
    var findTabs;
    
    //Input values which can be used by all tests
    
    //fill array
    for (i = 0; i < numTabs; i++) {
        locations[i] = tabs.eq(i).offset(); 
    }
    
    /*
     * Automated Tests
     */
    
    //State Tests
    
    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Drag and Drop**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_1']");
            fluid.test.mouseDragAndDrop({node: locations[1]}, {node: locations[3]});
        }, 
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 2), tabsIndex("li[id*='_1']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Right Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_3']");
            
            tabs.eq(3).focus();
//            fluid.test.shiftTabTo(tabs.eq(3));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.RIGHT, distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, tabsIndex("li[id*='_3']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Left Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_3']");
            
            tabs.eq(3).focus();
//            fluid.test.shiftTabTo(tabs.eq(3));
            fluid.test.keyboardMovement({distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, tabsIndex("li[id*='_3']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (k)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_3']");
            
            tabs.eq(3).focus();
//            fluid.test.shiftTabTo(tabs.eq(3));
            fluid.test.keyboardMovement({directionKey: "k", distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, tabsIndex("li[id*='_3']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_3']");
            
            tabs.eq(3).focus();
//            fluid.test.shiftTabTo(tabs.eq(3));
            fluid.test.keyboardMovement({directionKey: "j", distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, tabsIndex("li[id*='_3']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
 
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Right Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_2']");
            
            tabs.eq(2).focus();
//            fluid.test.shiftTabTo(tabs.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.RIGHT, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 3), tabsIndex("li[id*='_2']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Left Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_2']");
            
            tabs.eq(2).focus();
//            fluid.test.shiftTabTo(tabs.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.LEFT, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -3), tabsIndex("li[id*='_2']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (k)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_2']");
            
            tabs.eq(2).focus();
//            fluid.test.shiftTabTo(tabs.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: "k", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 3), tabsIndex("li[id*='_2']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (j)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_2']");
            
            tabs.eq(2).focus();
//            fluid.test.shiftTabTo(tabs.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -3), tabsIndex("li[id*='_2']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to first position**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_3']");
            fluid.test.mouseDragAndDrop({node: locations[3]}, {node: locations[0]});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -3), tabsIndex("li[id*='_3']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to last position**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_2']");
            fluid.test.mouseDragAndDrop({node: locations[2]}, {node: locations[4]});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 2), tabsIndex("li[id*='_2']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Drop on white space**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = tabsIndex("li[id*='_4']");
            fluid.test.mouseDragAndDrop({node: locations[4]}, {node: {top: 0, left: 0}});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -4), tabsIndex("li[id*='_4']")); 
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findTabs();
        }
    });

    //runs the tests
    fluid.test.run();
    
    //helper functions
    
    /**
     * Determines the current index of an element
     * It will take into account the iframe
     * 
     * @param {Object} selectorString a jQuery selector to find a single item in the DOM
     * @return {int} value of its index
     */
    tabsIndex = function (selectorString) {
        var tabSet = iframeContents.find(selector);
        var index = tabSet.index(iframeContents.find(selectorString));
        
        return index;  
    };
    
    /**
     * Calculates what the new position should be
     * 
     * @param {Object} current an integer value of the current position
     * @param {Object} change an integer value representing the number of positions moved
     * They represent the current index location and the number of positions moved
     * Positions moved is passed as a positive integer for moving right and negative for left
     * 
     * @return {int} value of the new position
     */
    calculatedPosition = function (current, change) {
        var newPosition;
        var result;
        
        newPosition = current + change;
        
        result = newPosition % numTabs;
        if (result < 0) {
            result += numTabs;
        }
        
        return result;
        
    };
    
    /**
     * Creates the set of tabs
     * 
     * This should be called after a reset, to ensure that the set is current
     */
    findTabs = function () {
        tabs = iframeContents.find(selector);
    };
    
}, {iframe: "#testFrame", adjustmentX: 5, adjustmentY: 5});
