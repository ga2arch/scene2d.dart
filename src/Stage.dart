class Stage {
  
  List<Actor> actors;
  num width, height;
  CanvasElement canvas;
  CanvasRenderingContext2D ctx;
  Group root;
  
  Stage(this.width, this.height, this.canvas) {
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext('2d');
    this.root = new Group('root', canvas);
    Input.getInstance(canvas);
  }
  
  void act(num delta) {
    root.act(delta);
  }
  
  void draw() {
    ctx.clearRect(0, 0, width, height);
    root.draw(ctx);
  }
  
  List<Actor> hits(Actor actor) {
    return root.hits(actor);
  }
  
  void addActor(Actor actor) {
    root.addActor(actor);
  }
  
  void removeActor(Actor actor) {
    root.removeActor(actor);
  }
}
