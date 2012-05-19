
abstract class Actor {
  
  num x, y, width, height, degree;
  String name;
  bool toRemove = false;
  Group parent;
  
  Actor(this.name) : degree = 0;
  
  abstract void act(num delta);
  void draw(CanvasRenderingContext2D ctx) {
    ctx.translate(x+width/2, y+height/2);
    ctx.rotate(degree * (Math.PI / 180));
  }

  bool isMarkedToRemove() {
    toRemove;
  }
  
  bool markToRemove() {
    toRemove = true;
  }
  
}
