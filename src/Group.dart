class Group extends Actor {
  static var texture;
  
  CanvasElement canvas;
  List<Actor> children, groups;
  Map<String, Actor> namesToActor;
  
  Group(String name, this.canvas) : super(name) {
    children = [];
    groups = [];
    namesToActor = new Map();
  }
  
  void act(num delta) {
    children.forEach((actor) => actor.act(delta));
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    children.forEach((actor) => drawActor(ctx, actor));  
  }
  
  void drawActor(CanvasRenderingContext2D ctx, Actor actor) {
    //if (actor.x+actor.width > canvas.width || 
    //    actor.y > canvas.height) return;
    
    ctx.save(); 
    actor.draw(ctx);
    ctx.restore();
  }
  
  void addActor(Actor actor) {
    children.add(actor);
    if (actor is Group) groups.add(actor);
    if (actor.name != null) namesToActor.putIfAbsent(actor.name, () => actor);
    actor.parent = this;
  }
  
  void removeActor(Actor actor) {
    children = children.filter((a) => a != actor);
    if (actor is Group) groups = groups.filter((g) => g != actor);
    if (actor.name != null) namesToActor.remove(actor.name);
  }  
  
  Actor hit(Actor actor) {
    for (final child in children) {
      Actor hitted = child.hit(actor);
      if (hitted != null)
        return hitted;
    }
    return null;
  }
}
