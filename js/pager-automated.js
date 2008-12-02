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
    
    var selectorTop = "ul#pager-top li a";
    var selectorBottom =  "ul#pager-bottom li a";
    var selectorTable = "table";
    var pagerLinksTop = iframeContents.find(selectorTop);
    var pagerLinksBottom = iframeContents.find(selectorBottom);
    var pagerTable = iframeContents.find(selectorTable);
    var reset = function () {
        $(window)[0].frames.testFrame.demo.initPager();
    };
    
    //private functions
    var isOnlyVisible;
    var isPreviousEnabled;
    var isNextEnabled;
    var isOnlyCurrent;
    var findSelectors;
    
    
    /*
     * Automated Tests
     */
    
    //State Tests
    
    fluid.test.testCase({
        groupName: "<<State Tests: Initial state>>", 
        name: "**Initial State**", 
        timeout: 79000, 
        actionFunction: function () {
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Next (Top)**", 
        timeout: 79000, 
        actionFunction: function () {
            var topNextParent = pagerLinksTop.parent("[class*='next']");
            var topNext = topNextParent.children();
            fluid.test.mouseClick(topNext);
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(1)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(2));
        }
    }); 
    
    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Previous (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            var topPreviousParent = pagerLinksTop.parent("[class*='previous']");
            var topPrevious = topPreviousParent.children();
            fluid.test.mouseClick(topPrevious);
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Next (Bottom)**", 
        timeout: 79000, 
        actionFunction: function () {
            var bottomNextParent = pagerLinksBottom.parent("[class*='next']");
            var bottomNext = bottomNextParent.children();
            fluid.test.mouseClick(bottomNext);
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(1)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(2));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Mouse>>", 
        name: "**Previous (Bottom)**", 
        timeout: 69000, 
        actionFunction: function () {
            var bottomPreviousParent = pagerLinksBottom.parent("[class*='previous']");
            var bottomPrevious = bottomPreviousParent.children();
            fluid.test.mouseClick(bottomPrevious);
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    }); 

    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Next (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            var topNextParent = pagerLinksTop.parent("[class*='next']");
            var topNext = topNextParent.children();
            fluid.test.tabTo(topNext);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(1)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(2));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Previous (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            var topPreviousParent = pagerLinksTop.parent("[class*='previous']");
            var topPrevious = topPreviousParent.children();
            fluid.test.tabTo(topPrevious);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Next (Bottom)**", 
        timeout: 69000, 
        actionFunction: function () {
            var bottomNextParent = pagerLinksBottom.parent("[class*='next']");
            var bottomNext = bottomNextParent.children();
            fluid.test.tabTo(bottomNext);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(1)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(2));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<State Tests: Keyboard>>", 
        name: "**Previous (Bottom)**", 
        timeout: 69000, 
        actionFunction: function () {
            var bottomPreviousParent = pagerLinksBottom.parent("[class*='previous']");
            var bottomPrevious = bottomPreviousParent.children();
            fluid.test.tabTo(bottomPrevious);
            fluid.test.typeKeyCode(fluid.test.keys.ENTER);
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Task Oriented Functional Tests>>", 
        name: "**Click Page (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(pagerLinksTop.eq(4));
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(4)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(5));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    });

    fluid.test.testCase({
        groupName: "<<Task Oriented Functional Tests>>", 
        name: "**Click Page (Bottom)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(pagerLinksBottom.eq(2));
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(2)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(3));
        }
    });

    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Click First Page (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(pagerLinksTop.eq(0));
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Click Previous while on first page (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            var topPreviousParent = pagerLinksTop.parent("[class*='previous']");
            var topPrevious = topPreviousParent.children();
            fluid.test.mouseClick(topPrevious);
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(0)));
            fluid.test.assertTrue(isNextEnabled());
            fluid.test.assertFalse(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent(1));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    }); 
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Click Last Page (Top)**", 
        timeout: 69000, 
        actionFunction: function () {
            fluid.test.mouseClick(pagerLinksTop.eq(6));
        },
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(6)));
            fluid.test.assertFalse(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent("7 (last)"));
        }
    });
    
    fluid.test.testCase({
        groupName: "<<Boundary Tests>>", 
        name: "**Click Next while on last page (Top)**", 
        timeout: 79000, 
        actionFunction: function () {
            var topNextParent = pagerLinksTop.parent("[class*='next']");
            var topNext = topNextParent.children();
            fluid.test.mouseClick(topNext);
        }, 
        assertionFunction: function () {
            fluid.test.assertTrue(isOnlyVisible(pagerTable.eq(6)));
            fluid.test.assertFalse(isNextEnabled());
            fluid.test.assertTrue(isPreviousEnabled());
            fluid.test.assertTrue(isOnlyCurrent("7 (last)"));
        },
        tearDown: function () {
            fluid.test.refreshIframe(function () {
                reset();
            });
            findSelectors();
        }
    }); 

    //runs the tests
    fluid.test.run();
    
    //helper functions
    
    /**
     * determines if both of the previous links are enabled
     * 
     * @return {boolean} false if either are disabled, and true if they are both enabled
     */
    isPreviousEnabled = function () {
        var prev = pagerLinksBottom.add(pagerLinksTop).parent("[class*='previous']");
        var enabled = prev.not("[class*='disabled']");

        if (enabled.length === 2) {
            return true;
        } else {
            return false;
        }
    };
    
    /**
     * determines if both of the next links are enabled
     * 
     * @return {boolean} false if either are disabled, and true if they are both enabled
     */
    isNextEnabled = function () {
        var next = pagerLinksBottom.add(pagerLinksTop).parent("[class*='next']");
        var enabled = next.not("[class*='disabled']");

        if (enabled.length === 2) {
            return true;
        } else {
            return false;
        }
    };
    
    /**
     * deterimes if the passed table is the only one visible
     * 
     * @param {Object} table the only table that should be visible
     * @return {boolean} false if it is hidden or there are other tables that are visible
     */
    isOnlyVisible = function (table) {
        var notHidden = pagerTable.not("[class*='hidden']");
        var result = false;
        
        if (notHidden.length === 1 && notHidden.eq(0)[0] === table[0]) {
            result = true;
        }
        
        return result;
    };
    
    /**
     * deterimes if the passed page number is the only one which is marked as current
     * 
     * @return {boolean} false if it is hidden or there are other page numbers which are marked as current
     */
    isOnlyCurrent = function (pageNumber) {
        var links = pagerLinksBottom.add(pagerLinksTop);
        var current = links.parent("[class*='current']");
        var values  = current.children();
        var result = false;
        
        if (values.length === 2 && values.eq(0).text() == pageNumber && values.eq(1).text() == pageNumber) {
            result = true;
        }
        
        return result;
    };
    
    /**
     * Creates the sets of the top page links, bottom page links, and tables
     * 
     * This should be called after a reset, to ensure that the sets are current
     */
    findSelectors = function () {
        pagerLinksTop = iframeContents.find(selectorTop);
        pagerLinksBottom = iframeContents.find(selectorBottom);
        pagerTable = iframeContents.find(selectorTable);
    };
    
}, {iframe: "#testFrame", adjustmentX: 5, adjustmentY: 5});


