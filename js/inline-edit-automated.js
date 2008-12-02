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
    var inlineEditFields = iframeContents.find("span.editContainer").prev();
    var undoLink = iframeContents.find("a.undoControl");
    var redoLink = iframeContents.find("a.redoControl");
    var numFields = inlineEditFields.length;
    var initialValues = [];
    var i;
    var reset = function () {
        $(window)[0].frames.testFrame.inlineEditSetup();
    };
    
    //private functions
    var deleteAllText;
    var findInlineEdits;
    
    //Input values which can be used by all tests
    var invitationText = "Click here to edit";
    var singleChar = "a";
    var letters = "aAbBcC";
    var digits = "0123456789";
    var symbols = "~`!@#$%^&*()_-+=|\\[]{}\'\": ;?/<>,.";
    var manyNonSeperatedChars = "qqqqqqqqqqqqqwwwwwwwwwwwweeeeeeeeeeeeerrrrrrrrrrrrrrrrtttttttttttttttttyyyyyyyyyyyyyyyyyyyyy";
    var manySeperatedChars = "qqqqqqqqqqqqq wwwwwwwwwwww eeeeeeeeeeeee rrrrrrrrrrrrrrrr ttttttttttttttttt yyyyyyyyyyyyyyyyyyyyy";
    
    //fill initialValues array
    for (i = 0; i < numFields; i++) {
        initialValues[i] = inlineEditFields.eq(i).text();
    }
    
    /*
     * Automated Tests
     */
    
    //State Tests
    
    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Edit Text**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(inlineEditFields.eq(0));
            fluid.test.typeString(singleChar);
            fluid.test.mouseClick({left: 0, top: 0}, {adjustmentX: -2, adjustmentY: -2});
        }, 
        assertionFunction: function () {
            fluid.test.assertEqual(initialValues[0] + singleChar, inlineEditFields.eq(0).text());
        }
    });
   
    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Undo**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(undoLink.eq(0));
        },
        assertionFunction: function () {
            fluid.test.assertEqual(initialValues[0], inlineEditFields.eq(0).text());
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Redo**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(redoLink.eq(0));
        },
        assertionFunction: function () {
            fluid.test.assertEqual(initialValues[0] + singleChar, inlineEditFields.eq(0).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Edit Text**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.tabTo(inlineEditFields.eq(1));
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
            fluid.test.typeString(singleChar);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertEqual(initialValues[1] + singleChar, inlineEditFields.eq(1).text());
        }
    });

    fluid.test.testCase({
            groupName: "<<State Tests: Keyboard>>", 
            name: "**Undo**", 
            timeout: 69000, 
            actionFunction: function () {
                fluid.test.typeKeyCode(fluid.test.keys.TAB);
                fluid.test.typeKeyCode(fluid.test.keys.ENTER);
            },
            assertionFunction: function () {
                fluid.test.assertEqual(initialValues[1], inlineEditFields.eq(1).text());
            }
        });

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Redo**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertEqual(initialValues[1] + singleChar, inlineEditFields.eq(1).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });

    
    // Task Oriented Functional Tests
    
    fluid.test.testCase({
        groupName: "<<Task Oriented Functional Tests>>", 
        name: "**Edit with letters**", 
        timeout: 69000, 
        actionFunction: function () {
            var field = inlineEditFields.eq(0);
            
            fluid.test.mouseClick(field);
            deleteAllText(field);
            fluid.test.typeString(letters);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
            
        },
        assertionFunction: function () {
            fluid.test.assertEqual(letters, inlineEditFields.eq(0).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Task Oriented Functional Tests>>", 
        name: "**Edit with numbers**", 
        timeout: 69000, 
        actionFunction: function () {
            var field = inlineEditFields.eq(1);
            
            fluid.test.mouseClick(field);
            deleteAllText(field);
            fluid.test.typeString(digits);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertEqual(digits, inlineEditFields.eq(1).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });

    fluid.test.testCase({
        groupName: "<<Task Oriented Functional Tests>>", 
        name: "**Edit with Symbols**", 
        timeout: 69000, 
        actionFunction: function () {
            var field = inlineEditFields.eq(2);
            
            fluid.test.mouseClick(field);
            deleteAllText(field);
            fluid.test.typeString(symbols);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertEqual(symbols, inlineEditFields.eq(2).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });

    
    //Boundary Tests
    
    fluid.test.testCase({
        groupName: "<<Boundary tests>>", 
        name: "**Empty Field**", 
        timeout: 69000, 
        actionFunction: function () {
            var field = inlineEditFields.eq(0);
            
            fluid.test.mouseClick(field);
            deleteAllText(field);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertEqual(invitationText, inlineEditFields.eq(0).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary tests>>", 
        name: "**Many Characters (Not Seperated)**", 
        timeout: 69000, 
        actionFunction: function () {
            var field = inlineEditFields.eq(2);
            fluid.test.mouseClick(field);
            deleteAllText(field);
            fluid.test.typeString(manyNonSeperatedChars);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER, {delay: 2000});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(manyNonSeperatedChars, inlineEditFields.eq(2).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary tests>>", 
        name: "**Many Characters (Seperated)**", 
        timeout: 69000, 
        actionFunction: function () {
            var field = inlineEditFields.eq(1);
            fluid.test.mouseClick(field);
            deleteAllText(field);
            fluid.test.typeString(manySeperatedChars);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER, {delay: 2000});
        },
        assertionFunction: function () {
            fluid.test.assertEqual(manySeperatedChars, inlineEditFields.eq(1).text());
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findInlineEdits();
        }
    });

    
    //runs the tests
    fluid.test.run();
    
    //private functions
    
    /**
     * Calls BACKSPACE.
     * This is useful to empty an inline edit field
     * 
     * @param {Object} field is a specific inline edit field to empty
     */
    deleteAllText = function (field) {
        var inlineField = field || $();
        var numChars = inlineField.text().length;
        
        for (i = 0; i < numChars; i++) {
            fluid.test.typeKeyCode(fluid.test.keys.BACKSPACE, {delay: 100});
        }
    };
    
    /**
     * Recreates the set of inline edit fields
     * 
     * This should be called after a reset, to ensure that the set is current
     */
    findInlineEdits = function () {
        inlineEditFields = iframeContents.find("span.editContainer").prev();
    };
    
}, {iframe: "#testFrame", adjustmentX: 2, adjustmentY: 2});
