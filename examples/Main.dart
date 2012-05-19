#import('dart:html');

#source('Stage.dart');
#source('Actor.dart');
#source('Rectangle.dart');
#source('Triangle.dart');
#source('Group.dart');
#source('Input.dart');
#source('Keys.dart');

void main() {
  var m = new GameScreen();
  m.show();
  m.render(new Date.now().value);
}

class GameScreen {
   
  Stage stage;
  
  void show() {
    var canvas = document.query("#canvas");
    stage = new Stage(document.window.innerWidth, 
      document.window.innerHeight, canvas);
    var rect = new Rectangle(100,100,50,50);
    var tri = new Triangle(100, 100, 50, 50);
    rect.degree = 0;
    tri.degree = 0;
    stage.addActor(rect);    
    stage.addActor(tri);
  }
  
  void render(num lastTime) {
    num time = new Date.now().value;
    num delta = (time - lastTime) / 1000;
    
    stage.act(delta);
    stage.draw();
    lastTime = time;
    window.webkitRequestAnimationFrame((_) => render(lastTime));
  }
}
