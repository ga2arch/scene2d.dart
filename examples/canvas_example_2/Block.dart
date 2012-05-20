class Block extends Rectangle {
  
  Block(num x, num y, num width, num height) : super(x, y, width, height) {
    this.style = 'green';
  }
  
  void act(num delta) {
    //x -= 200 * delta;
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    super.draw(ctx);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
  
  Actor hit(Actor actor) {
    if (actor.y+actor.height > y && 
        actor.x+actor.width > x)
      return this;
    else
      return null;
  }
  
}
