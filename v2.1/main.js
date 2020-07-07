const screenSizeX = 6400;
const screenSizeY = 3200;

var gameInterval;

var enemies = [];
var enemyDelay = 400;

var points = 3;
var score = 0;



function resetgame(){
  
  clearInterval(gameInterval);
  
  points = 3;
  enemies = [];

  background("black");
  $("#points").html("");
  $(canvas).unbind("click");

  run();
}


function run(){
  enemies = [];
  points  = 3;
  score   = 0;

  var player  = new Polygon(3200,1600, 100, 3, 0, "white", 15, "#aaaaaa");
  player.setBorders(0,0,screenSizeX,screenSizeY);
  var control = new Control();
  control.start();
  
  background();
  var lastSeemPoints = 3;

  var enemySpawn = setInterval(newEnemy, enemyDelay, enemies, player);

  gameInterval = setInterval(function(){
    background();

    if(lastSeemPoints != points){
      lastSeemPoints = points;
      player.sides = points;

      for(var e in enemies){
        if(enemies[e].sides == points) enemies[e].lineColor = "#fcba03";
        if(enemies[e].sides < points)  enemies[e].lineColor = "#638cc9";
      }
    }
    
    player.draw();

    for(var e=0; e < enemies.length; e++){
      if(enemies[e].dead) {
        enemies.splice(e,1);
        e--;
        continue;
      }
      enemies[e].draw();
      var collision = player.collides(enemies[e]);
      if(collision){
        if(collision ==  2){
          enemies[e].kill();
          points++;
          score+=20;
        }
        else if(collision == 1){
          enemies[e].kill();
          score++;
        }
        else if(collision == -1){
          player.kill();
          clearInterval(enemySpawn);
          drawPoints();
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
}


$(document).ready(function(){
  $(canvas).attr("width", screenSizeX);
  $(canvas).attr("height", screenSizeY);

  run();
});