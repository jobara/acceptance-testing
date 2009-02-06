/*
Copyright 2009 University of Cambridge
Copyright 2009 University of Toronto
Copyright 2009 University of California, Berkeley

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

/*global jQuery, doh*/

var fluid = fluid || {};

(function ($){
    fluid.test = fluid.test || {};
    var applet = document.fluidRobotApplet;
    
    fluid.test.delay = function (miliseconds) {
        applet.delay(miliseconds);
    };
    
    fluid.test.getAutoDelay= function () {
          return applet.getAutoDelay();
    };
    
    fluid.test.getPixelColor = function (x, y) {
        return applet.getPixelColor(x, y);
    };
    
    fluid.test.isAutoWaitForIdle = function () {
        return applet.isAutoWaitForIdle();
    };
    
    fluid.test.keyPress = function (keycode) {
        applet.keyPress(keycode);    
    };
    
    fluid.test.keyRelease = function (keycode) {
        applet.keyRelease(keycode);    
    };
    
    fluid.test.mouseMove = function (x, y) {
        applet.mouseMove(x, y);
    };
    
    fluid.test.mousePress = function (buttons) {
        applet.mousePress(buttons);
    };
    
    fluid.test.mouseRelease = function (buttons) {
        applet.mouseRelease(buttons);  
    };
    
    fluid.test.mouseWheel = function (wheelAmt) {
        applet.mouseWheel(wheelAmt);    
    };
    
    fluid.test.setAutoDelay = function (miliseconds) {
        applet.setAutoDelay(miliseconds);    
    };
    
    fluid.test.setAutoWaitForIdle = function (isON) {
        applet.setAutoWaitForIdle(isOn);
    };
    
    fluid.test.toString = function () {
        return applet.toString();
    };
    
    fluid.test.waitForIdle = function () {
        applet.waitForIdle();
    };
    
})(jQuery);
