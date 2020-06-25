const screenSizeX = 6400;
const screenSizeY = 3200;

var enemies = [];
var enemyDelay = 500;

var points = 3;


function resetgame(){
  console.log("teste");
  window.location.reload(false);
}


$(document).ready(function(){
  $(canvas).attr("width", screenSizeX);
  $(canvas).attr("height", screenSizeY);

  var player  = new Polygon(3200,1600, 100, 3, 0, "white", 15, "#aaaaaa");
  player.setBorders(0,0,screenSizeX,screenSizeY);
  var control = new Control();
  control.start();
  
  background();
  var lastSeemPoints = 3;

  var enemySpawn = setInterval(newEnemy, enemyDelay, enemies);

  setInterval(function(){
    background();

    if(lastSeemPoints != points){
      player.sides = points;

      lastSeemPoints = points;
    }
    
    player.draw();

    for(var e in enemies){
      if(enemies[e].dead) continue;
      enemies[e].draw();
      var collision = player.collides(enemies[e]);
      if(collision){
        if(collision ==  2){
          enemies[e].kill();
          points++;
        }
        else if(collision == 1){
          enemies[e].kill();
        }
        else if(collision == -1){
          player.kill();
          clearInterval(enemySpawn);
          drawPoints(points);
          $(canvas).click(resetgame);
        }
      }
    }

    for(var c in control.keysPressed){
      switch(control.keysPressed[c]){
        case 87: // W
          player.pullTo(0,-20);
          break;
        case 65: // A
          player.pullTo(-20,0);
          break;
        case 83: // S
          player.pullTo(0,20);
          break;
        case 68: // D
          player.pullTo(20,0);
          break;
      }
    }


  }, 1000/60);
});