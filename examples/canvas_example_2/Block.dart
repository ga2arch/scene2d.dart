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
    num left1 = actor.x;
    num left2 = x;
    num right1 = actor.x+actor.width;
    num right2 = x+width;
    num top1 = actor.y;
    num top2 = y;
    num bottom1 = actor.y+actor.height;
    num bottom2 = y+height;
    
    if (bottom1 < top2) return null;
    if (top1 > bottom2) return null;
    if (right1 < left2) return null;
    if (left1 > right2) return null;
          
    return this;
    
  }
  
}
