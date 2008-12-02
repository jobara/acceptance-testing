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
    var selector = "div[id^='gallerylightbox-cell:']";
    var thumbnails = iframeContents.find(selector);
    var numImages = thumbnails.length;
    var currentPosition;
    var locations = [];
    var i;
    var reset = function () {
            $(window)[0].frames.testFrame.fluid.reorderImages("#gallery");
        };
    
    //Private functions
    var imageIndex;
    var calculatedHorizontalPosition;
    var calculatedVerticalPosition;
    var findThumbs;
    
    //fill array
    for (i = 0; i < numImages; i++) {
        locations[i] = thumbnails.eq(i).offset(); 
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
            fluid.test.mouseDragAndDrop({node: locations[3]}, {node: locations[7]});
        }, 
        assertionFunction: function () {
            fluid.test.assertEqual(7, imageIndex("div[id*=':3:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Right Arrow)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':6:']");
            
            thumbnails.eq(6).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(6));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.RIGHT, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':6:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Left Arrow)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':7:']");
            
            thumbnails.eq(7).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(7));
            fluid.test.keyboardMovement({distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':7:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Up Arrow)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':8:']");
            
            thumbnails.eq(8).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(8));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.UP, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':8:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (Down Arrow)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':9:']");
            
            thumbnails.eq(9).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(9));
            fluid.test.keyboardMovement({directionKey: fluid.test.keys.DOWN, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':9:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (k)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':10:']");
            
            thumbnails.eq(10).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(10));
            fluid.test.keyboardMovement({directionKey: "k", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':10:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (j)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':11:']");
            
            thumbnails.eq(11).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(11));
            fluid.test.keyboardMovement({directionKey: "j", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':11:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection (i)**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':12:']");
            
            thumbnails.eq(12).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(12));
            fluid.test.keyboardMovement({directionKey: "i", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':12:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Selection**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':5:']");
            
            thumbnails.eq(5).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(5));
            fluid.test.keyboardMovement({directionKey: "m", distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(currentPosition, imageIndex("div[id*=':5:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
 
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Right Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':3:']");
            
            thumbnails.eq(3).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(3));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.RIGHT, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, 3), imageIndex("div[id*=':3:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Left Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':4:']");
            
            thumbnails.eq(4).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(4));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.LEFT, distance: 3});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, -3), imageIndex("div[id*=':4:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Up Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':5:']");
            
            thumbnails.eq(5).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(5));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.UP, distance: 3});
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(11, imageIndex("div[id*=':5:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (Down Arrow)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':6:']");
            
            thumbnails.eq(6).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(6));
            fluid.test.keyboardDragAndDrop({directionKey: fluid.test.keys.DOWN, distance: 3});
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(6, imageIndex("div[id*=':6:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (i)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':7:']");
            
            thumbnails.eq(7).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(7));
            fluid.test.keyboardDragAndDrop({directionKey: "i", distance: 3});
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(7, imageIndex("div[id*=':7:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (m)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':8:']");
            
            thumbnails.eq(8).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(8));
            fluid.test.keyboardDragAndDrop({directionKey: "m", distance: 3});
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(2, imageIndex("div[id*=':8:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (k)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':9:']");
            
            thumbnails.eq(9).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(9));
            fluid.test.keyboardDragAndDrop({directionKey: "k", distance: 3});
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, 3), imageIndex("div[id*=':9:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Drag and Drop (j)**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':10:']");
            
            thumbnails.eq(10).focus();
//            fluid.test.shiftTabTo(thumbnails.eq(10));
            fluid.test.keyboardDragAndDrop({directionKey: "j", distance: 3});
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, -3), imageIndex("div[id*=':10:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to first position**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':5:']");
            fluid.test.mouseDragAndDrop({node: locations[5]}, {node: locations[0]});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, -5), imageIndex("div[id*=':5:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Move to last position**", 
        timeout: 69000, 
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':1:']");
            fluid.test.mouseDragAndDrop({node: locations[1]}, {node: locations[13]});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, 12), imageIndex("div[id*=':1:']"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Drop on white space**", 
        timeout: 69000,
        actionFunction: function () {
            currentPosition = imageIndex("div[id*=':10:']");
            fluid.test.mouseDragAndDrop({node: locations[10]}, {node: {top: 0, left: 0}});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(calculatedHorizontalPosition(currentPosition, -10), imageIndex("div[id*=':10:']")); 
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findThumbs();
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
    imageIndex = function (selectorString) {
        var images = iframeContents.find(selector);
        var index = images.index(iframeContents.find(selectorString));
        
        return index;  
    };
    
    /**
     * Calculates what the new position should be
     * can't handle up and down position changes, only left and right
     * 
     * @param {Object} current an integer value of the current position
     * @param {Object} change an integer value representing the number of positions moved
     * They represent the current index location and the number of positions moved
     * Positions moved is passed as a positive integer for moving right and negative for left
     * 
     * @return {int} value of the new position
     */
    calculatedHorizontalPosition = function (current, change) {
        var newPosition;
        var result;
        
        newPosition = current + change;
        
        result = newPosition % numImages;
        if (result < 0) {
            result += numImages;
        }
        
        return result;
    };
    
    /**
     * DOESN'T WORK. DON'T USE.
     * NEED TO DEVELOP A STRATEGY TO PROGRAMATICALLY CALCULATE UP/DOWN MOVEMENT
     * 
     * Calculates what the new position should be
     * can't handle left and right position changes, only up and down
     *
     */
    calculatedVerticalPosition = function () {};
    
    /**
     * Creates the set of thumbnails
     * 
     * This should be called after a reset, to ensure that the set is current
     */
    findThumbs = function () {
        thumbnails = iframeContents.find(selector);
    };
    
}, {iframe: "#testFrame", adjustmentX: 10, adjustmentY: 10});
