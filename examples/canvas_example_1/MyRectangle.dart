class MyRectangle extends Rectangle {

  MyRectangle(num x, num y, num width, num height) 
             : super(x, y, width, height);
  
  void act(num delta) {
    if (Input.isKeyPressed(Keys.RIGHT))
      x += 100 * delta;
    if (Input.isKeyPressed(Keys.LEFT))
      x -= 100 * delta;
    if (Input.isKeyPressed(Keys.CTRL))
      jumping = true;
    
    if (jumping) {
      y -= jumpVel;
      jumpVel -= gravity;
      if (jumpVel < -10) {
        jumping = false;
        jumpVel = 10;
      }
    }
  }
}
