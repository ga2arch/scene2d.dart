class Player extends Rectangle {

  bool jumping = false;
  num jumpVel = 13;
  num gravity = 1;
  
  Player(num x, num y) : super(x, y, 25, 25);
  
  void act(num delta) {
    if (Input.isKeyPressed(Keys.RIGHT))
      x += 100 * delta;
    if (Input.isKeyPressed(Keys.LEFT))
      x -= 100 * delta;
    if (Input.isKeyPressed(Keys.SPACE))
      jumping = true;
    
    if (jumping) {
      y -= jumpVel;
      jumpVel -= gravity;
      if (jumpVel < -13) {
        jumping = false;
        jumpVel = 13;
      }
    }
  }
}
