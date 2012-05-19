class Rectangle extends Actor {
 
  bool jumping = false;
  num jumpVel = 14;
  num gravity = 4;
  num keyDown = 0;
  
  Rectangle(num x, num y, num width, num height) : super('rectangle') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  void act(num delta) {
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.rect(-width/2, y, width, height);
    ctx.fillStyle = "#8ED6FF";
    ctx.fill();
  }
  
}
