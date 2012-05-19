class MyTriangle extends Triangle {
  
  MyTriangle(num x, num y, num width, num height) 
          : super(x, y, width, height);
  
  void act(num delta) {    
    if (Input.isKeyPressed(Keys.SPACE))
      degree -= 20 * delta;
    
    x = Input.mouseX - width/2;
    y = Input.mouseY - height/2;
  }
}
