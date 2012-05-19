abstract class AbstractScreen {
  
  Stage stage;
  
  abstract void show();
  
  void render(num lastTime) {
    num time = new Date.now().value;
    num delta = (time - lastTime) / 1000;
    
    stage.act(delta);
    stage.draw();
    
    lastTime = time;
    window.webkitRequestAnimationFrame((_) => render(lastTime));
  }
  
}
