
_mouseMove in robot.js was modified to allow the x and y paramaters to be called, if they themselves
are functions, when _mouseMove is executed. 

This modification was necessitated by the need to allow the page to be scrolled, using javascript, multiple
times within a single test case. The call to scroll the page and the mouseMove functions are housed
within seperate doh.robot.sequence functions but share the same information.