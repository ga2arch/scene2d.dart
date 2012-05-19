class Triangle extends Actor {
  
  Triangle(num x, num y, num width, num height) : super('triangle') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  void act(num delta) {    
    if (Input.isKeyPressed(Keys.SPACE))
      degree -= 20 * delta;
    
    x = Input.mouseX - width/2;
    y = Input.mouseY - height/2;
    
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(0, -height/2);        // Top Corner
    ctx.lineTo(-width/2, height/2); // Bottom Right
    ctx.lineTo(width/2, height/2);         // Bottom Left
    ctx.closePath();
    ctx.fillStyle = "#ffc821";
    ctx.fill();
  }  
}
