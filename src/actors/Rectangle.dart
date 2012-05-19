class Rectangle extends Actor {
 
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
