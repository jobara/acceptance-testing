/*
Copyright 2008 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

package robotApplet;

import java.applet.Applet;
import java.awt.AWTException;
import java.awt.Color;
import java.awt.Robot;

public class JavaRobot extends Applet {

	/*
	 * Eclipse generated serialVersionUID
	 */
	private static final long serialVersionUID = -6144607690243212865L;
	private Robot robot;
	
	public void init(){
		try{
			robot = new Robot();
		}catch(AWTException e){
			stop();
			destroy();
		}
	}
	
	/*
	 * The code below exposes the robot API to javascript
	 * 
	 * View the java.awt.Robot API for specific information about methods
	 */
	
	//createScreenCapture not implemented
	
	public void delay(int ms){
		robot.delay(ms);
	}
	
	public int getAutoDelay(){
		return robot.getAutoDelay();
	}
	
	public int[] getPixelColor(int x, int y){
		Color colour = robot.getPixelColor(x, y);
		int[] colourValues = {colour.getAlpha(), colour.getBlue(), colour.getGreen(), colour.getRed()};
		
		return colourValues;
	}
	
	public boolean isAutoWaitForIdle(){
		return robot.isAutoWaitForIdle();
	}
	
	public void keyPress(int keycode){
		robot.keyPress(keycode);
	}
	
	public void keyRelease(int keycode){
		robot.keyRelease(keycode);
	}
	
	public void mouseMove(int x, int y){
		robot.mouseMove(x, y);
	}
	
	public void mousePress(int buttons){
		robot.mousePress(buttons);
	}
	
	public void mouseRelease(int buttons){
		robot.mouseRelease(buttons);
	}
	
	public void mouseWheel(int wheelAmt){
		robot.mouseWheel(wheelAmt);
	}
	
	public void setAutoDelay(int ms){
		robot.setAutoDelay(ms);
	}
	
	public void setAutoWaitForIdle(boolean  isOn){
		robot.setAutoWaitForIdle(isOn);
	}
	
	public String toString(){
		return robot.toString();
	}
	
	public void waitForIdle(){
		robot.waitForIdle();
	}
}
