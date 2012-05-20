class Rectangle extends Actor {
 
  var style = "#8ED6FF";
  
  Rectangle(num x, num y, num width, num height) : super('rectangle') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  void act(num delta) {
    super.act(delta);
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.rect(-width/2, height/2, width, height);
    ctx.fillStyle = style;
    ctx.fill();
  }
  
}
