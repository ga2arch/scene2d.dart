#import('dart:html');
#import('../../src/Scene2d.dart');

#source('Floor.dart');
#source('Player.dart');
#source('Block.dart');

void main() {
  var m = new GameScreen();
  m.show();
  m.render(new Date.now().value);
}

class GameScreen extends AbstractScreen {
  
  Player player;
  
  void show() {
    var canvas = document.query("#canvas");
    stage = new Stage(480, 240, canvas);
    Floor floor = new Floor(0, canvas.height, canvas.width, 20);
    player = new Player(10, canvas.height-50-10);
    Block block = new Block(200, canvas.height-50-10, 25, 25);
    stage.addActor(floor);
    stage.addActor(player);
    stage.addActor(block);
  }
  
  void render(num lastTime) {
    super.render(lastTime);
    
    var hitted = stage.hit(player);
    if (hitted != null) {
      if (hitted is Block) {
        player.x = hitted.x-player.width;
      }
    }
    
  }
  
}
