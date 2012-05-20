class Floor extends Actor {
  
  num length;
  
  Floor(num x, num y, this.length, num width) : super('line') {
    this.x = x;
    this.y = y;
    this.width = width;
  }
  
  void act(num delta) {
    super.act(delta);
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+length, y);
    ctx.lineWidth = width;
    ctx.stroke();
  }
}
