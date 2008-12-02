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
    var selectorMovable = "div[class*='movable']";
    var selectorLocked =  "div[class*='locked']";
    var movablePortlets = iframeContents.find(selectorMovable);
    var lockedPortlets = iframeContents.find(selectorLocked).not("div[class*='toolbar']");
    var numMovable = movablePortlets.length;
    var idSelector = [];
    var i;
    var reset = function () {
        $(window)[0].frames.testFrame.demo.initFluidComponents();
    };
    
    //private functions
    var itemIndex;
    var dragBelowOffset;
    var findPortlets;
    
    //fill arrays
    for (i = 0; i < numMovable; i++) {
        idSelector[i] = "div[id='" + movablePortlets.eq(i).attr("id") + "']";
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
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(0)}, {node: movablePortlets.eq(3)});
        }, 
        assertionFunction: function () {
            fluid.test.assertEqual(3, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Up Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.UP, distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Down Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.DOWN, distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Left Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.LEFT, distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Right Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.RIGHT, distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
 
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (i)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: "i", distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (m)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: "m", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (j)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: "j", distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (k)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardMovement({directionKey: "k", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
 
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Up Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.UP, distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(3, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Down Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.DOWN, distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Left Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(0));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.LEFT, distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Right Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.RIGHT, distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[3]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (i)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: "i", distance: 2});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(4, itemIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (m)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: "m", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[3]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (j)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (k)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(0));
            fluid.test.keyboardDragAndDrop({directionKey: "k", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });


    fluid.test.testCase({
        groupName: "<<Task Oriented Functional Tests>>", 
        name: "**Move portlet below locked portlet**", 
        timeout: 69000, 
        actionFunction: function () {
            var offset = dragBelowOffset(lockedPortlets.eq(0));
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(1)}, {node: lockedPortlets.eq(0), optionsObject: offset});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to first position**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(0)}, {node: movablePortlets.eq(1)});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to last position**", 
        timeout: 69000, 
        actionFunction: function () {
            var offset = dragBelowOffset(movablePortlets.eq(3));
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(2)}, {node: movablePortlets.eq(3), optionsObject: offset});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(4, itemIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Drop out of column**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(0)}, {node: {top: 0, left: 0}});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to an empty column - prep 1**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(1));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[1]));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to an empty column - prep 2**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[2]));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to an empty column - prep 3**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[3]));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to an empty column - mouse**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(0)}, {node: movablePortlets.eq(0), optionsObject: {left: 500}});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(4, itemIndex(idSelector[0]));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to an empty column - prep 4**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(0));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[0]));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to an empty column - keyboard**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(2));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(4, itemIndex(idSelector[2]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Test-to-fail>>", 
        name: "**Move above locked portlet - mouse**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseDragAndDrop({node: movablePortlets.eq(1)}, {node: lockedPortlets.eq(0)});
        },
        assertionFunction: function () {
            fluid.test.assertNotEqual(0, itemIndex(idSelector[1]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Test-to-fail>>", 
        name: "**Move above locked portlet - keyboard**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(movablePortlets.eq(0));
            fluid.test.keyboardDragAndDrop({directionKey: "i", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertNotEqual(0, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Test-to-fail>>", 
        name: "**Move above locked portlet - mouse**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseDragAndDrop({node: lockedPortlets.eq(0)}, {node: movablePortlets.eq(1)});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Test-to-fail>>", 
        name: "**Move locked portlet - keyboard**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.shiftTabTo(lockedPortlets.eq(0));
            fluid.test.keyboardDragAndDrop({directionKey: "k", distance: 1});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(1, itemIndex(idSelector[0]));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findPortlets();
        }
    });

    //runs the tests
    fluid.test.run();
    
    //helper functions
    
    /**
     * Determines the current index of an element
     * It will take into account the iframe
     * 
     * @param {Object} selectorString a jQuery selector to find a single item
     * @return {Object} an integer value of the index
     */
    itemIndex = function (selectorString) {
        var itemSet = iframeContents.find(selectorLocked).not("div[class*='toolbar']").add(iframeContents.find(selectorMovable));
        var index = itemSet.index(iframeContents.find(selectorString));
        
        return index;  
    };
    
    /**
     * Determines the vertical offset required to place a portlet below another one
     * 
     * @param {Object} portlet the portlet that you want to place another portlet below
     * @param {Object} an integer value representing the adjustment if both portlets are in the same column
     * This should be the height of the portlet being moved. The default value is 0
     * 
     * @returns {Object} an object {top} containing the key top with an integer value of the offset
     * to apply to the mouse drag and drop operation 
     */
    dragBelowOffset = function (portlet, sameColumnAdjustment) {
        var midPoint = {top: 0};
        var adjustment = sameColumnAdjustment || 0;
        
        if (portlet) {
            midPoint.top = (portlet.height() / 2) - adjustment;
        } 
        
        return midPoint;
    };
    
    /**
     * Creates the sets of locked and movable portlets and thumbnails
     * 
     * This should be called after a reset, to ensure that the sets are current
     */
    findPortlets = function () {
        movablePortlets = iframeContents.find(selectorMovable);
        lockedPortlets = iframeContents.find(selectorLocked).not("div[class*='toolbar']");
    };
    
}, {iframe: "#testFrame", adjustmentX: 5, adjustmentY: 5});


