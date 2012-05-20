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

class GameScreen {
  
  Stage stage;
  Player player;
  
  void show() {
    var canvas = document.query("#canvas");
    stage = new Stage(480, 240, canvas);
    Floor floor = new Floor(0, 240, 480, 20);
    player = new Player(10, canvas.height-35-25);
    Block block1 = new Block(200, 240-35-25, 25, 25);
    Block block2 = new Block(225, 240-35-50, 25, 25);
    Block block3 = new Block(250, 240-35-50, 25, 25);
    Block block4 = new Block(275, 240-35-50, 25, 25);
    Block block5 = new Block(300, 240-35-75, 25, 25);

    stage.addActor(floor);
    stage.addActor(player);
    stage.addActor(block1);
    stage.addActor(block2);
    stage.addActor(block3);
    stage.addActor(block4);
    stage.addActor(block5);
  }
  
  void render(num lastTime) {
    num time = new Date.now().value;
    num delta = (time - lastTime) / 1000;
    
    stage.act(delta);
 
    var hits = stage.hits(player);
    if (hits != null) {
      hits.forEach((actor) => handleHit(actor, delta));
    } else if (!player.jumping)
      player.fall(delta);
    
    stage.draw();

    lastTime = time;
    window.webkitRequestAnimationFrame((_) => render(lastTime));
  }
  
  void handleHit(Actor hitted, num delta) {
    if (hitted is Floor) {
      player.stopJump();
      player.y = hitted.y-35-25;
    }
    if (hitted is Block) {
      if (player.y < hitted.y) {
        player.stopJump();
        player.y = hitted.y-player.height;
      } else if (player.x > hitted.x)
        player.x = hitted.x+hitted.width;
      else
        player.x = hitted.x-player.width;
    }      
  }
}
