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
    var selector = "li[id^='myUniquePrefix.']";
    var listItems = iframeContents.find(selector);
    var numListItems = listItems.length;
    var idSelector = [];
    var currentPosition;
    var i;
    var reset = function () {
        $(window)[0].frames.testFrame.demo.initTodoList();
    };
    
    //private functions
    var listItemsIndex;
    var calculatedPosition;
    var findListItems;
    
    //fill array
    for (i = 0; i < numListItems; i++) {
        idSelector[i] = "li[id='" + listItems.eq(i).attr("id") + "']";
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
            currentPosition = listItemsIndex(idSelector[1]);
            fluid.test.mouseDragAndDrop({node: listItems.eq(1)}, {node: listItems.eq(7)});
        }, 
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 6), listItemsIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Up Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[2]);
            
            listItems.eq(2).focus();
//            fluid.test.shiftTabTo(listItems.eq(2));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.UP, distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, listItemsIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Down Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[8]);
            
            listItems.eq(8).focus();
//            fluid.test.shiftTabTo(listItems.eq(8));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.DOWN, distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, listItemsIndex(idSelector[8]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (i)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[2]);
            
            listItems.eq(2).focus();
//            fluid.test.shiftTabTo(listItems.eq(2));
            fluid.test.keyboardMovement({directionKey: "i", distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, listItemsIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (m)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[8]);
            
            listItems.eq(8).focus();
//            fluid.test.shiftTabTo(listItems.eq(8));
            fluid.test.keyboardMovement({directionKey: "m", distance: 4});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, listItemsIndex(idSelector[8]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
 
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Up Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[3]);
            
            listItems.eq(3).focus();
//            fluid.test.shiftTabTo(listItems.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.UP, distance: 5});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -5), listItemsIndex(idSelector[3]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Down Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[7]);
            
            listItems.eq(7).focus();
//            fluid.test.shiftTabTo(listItems.eq(7));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.DOWN, distance: 5});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 5), listItemsIndex(idSelector[7]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (i)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[3]);
            
            listItems.eq(3).focus();
//            fluid.test.shiftTabTo(listItems.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: "i", distance: 5});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -5), listItemsIndex(idSelector[3]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (m)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[7]);
            
            listItems.eq(7).focus();
//            fluid.test.shiftTabTo(listItems.eq(7));
            fluid.test.keyboardDragAndDrop({directionKey: "m", distance: 5});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 5), listItemsIndex(idSelector[7]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to first position**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[8]);
            fluid.test.mouseDragAndDrop({node: listItems.eq(8)}, {node: listItems.eq(0)});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -8), listItemsIndex(idSelector[8]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to last position**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[2]);
            fluid.test.mouseDragAndDrop({node: listItems.eq(2)}, {node: listItems.eq(9)});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, 7), listItemsIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Drop on white space**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = listItemsIndex(idSelector[6]);
            fluid.test.mouseDragAndDrop({node: listItems.eq(6)}, {node: {top: 0, left: 0}});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedPosition(currentPosition, -6), listItemsIndex(idSelector[6])); 
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findListItems();
        }
    });
    

    //runs the tests
    fluid.test.run();
    
    //helper functions
    
    /**
     * Determines the current index of an element
     * It will take into account the iframe
     * 
     * @param {String} selectorString a jQuery selector to find a single item in the DOM
     * @return {int} value of its index
     */
    listItemsIndex = function (selectorString) {
        var listItemSet = iframeContents.find(selector);
        var index = listItemSet.index(iframeContents.find(selectorString));
        return index;  
    };
    
    /**
     * Calculates what the new position should be
     * 
     * @param {Object} current an integer value of the current position
     * @param {Object} change an integer value representing the number of positions moved
     * They represent the current index location and the number of positions moved
     * Positions moved is passed as a positive integer for moving down and negative for up
     * 
     * @return {int} value of the new position
     */
    calculatedPosition = function (current, change) {
        var newPosition;
        var result;
        
        newPosition = current + change;
        
        result = newPosition % numListItems;
        if (result < 0) {
            result += numListItems;
        }
        
        return result;
        
    };
    
    /**
     * Creates the set of list items
     * 
     * This should be called after a reset, to ensure that the set is current
     */
    findListItems = function () {
        listItems = iframeContents.find(selector);
    };
    
}, {iframe: "#testFrame", adjustmentX: 2, adjustmentY: 2});

