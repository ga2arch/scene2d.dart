class Player extends Rectangle {

  num MAX_JUMP_VELOCITY = 13;
  num gravity = 1;
  
  bool jumping = false;
  num  jumpVel = 13;
  
  Player(num x, num y) : super(x, y, 25, 25);
  
  void act(num delta) {
    if (Input.isKeyPressed(Keys.RIGHT))
      x += 100 * delta;
    if (Input.isKeyPressed(Keys.LEFT))
      x -= 100 * delta;
    if (Input.isKeyPressed(Keys.SPACE))
      if (!jumping) jumping = true;
    
    if (jumping) {
      y -= jumpVel;
      jumpVel -= gravity;
    }
  }
  
  void draw(ctx) {
    super.draw(ctx);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
  
  void stopJump() {
    jumping = false;
    jumpVel = MAX_JUMP_VELOCITY;
  }
  
  void fall(num delta) {
    y += 400 * delta;
  }
}
