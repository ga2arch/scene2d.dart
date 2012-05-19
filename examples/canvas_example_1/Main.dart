#import('dart:html');
#import('../../src/Scene2d.dart');
#source('MyTriangle.dart');
#source('MyRectangle.dart');

void main() {
  var m = new GameScreen();
  m.show();
  m.render(new Date.now().value);
}

class GameScreen extends AbstractScreen {
  
  void show() {
    var canvas = document.query("#canvas");
    stage = new Stage(document.window.innerWidth, 
      document.window.innerHeight, canvas);
    var rect = new MyRectangle(100,100,50,50);
    var tri = new MyTriangle(100, 100, 50, 50);
    rect.degree = 0;
    tri.degree = 0;
    stage.addActor(rect);    
    stage.addActor(tri);
  }
  
  void render(num lastTime) {
    super.render(lastTime);
  }
  
}
