const canvas = $("#canvas")[0];
const context = canvas.getContext("2d");

var backatt = 0;


function background(color="#070011"){
  if(backatt++ == 0) context.globalAlpha = 0.25;
  else{
    context.globalAlpha = 0.5;
    backatt = 0;
  }
  
  context.globalCompositeOperation = "destination-out"
  context.fillStyle = color;
  context.fillRect(0,0,screenSizeX,screenSizeY);
  context.globalCompositeOperation = "source-over"
  context.globalAlpha = 1.0;
}


function drawPoly(obj){
  context.translate(obj.x,obj.y);

  context.rotate(obj.angle * Math.PI / 180);
  context.beginPath();
  context.moveTo (obj.size * Math.cos(0), obj.size *  Math.sin(0));          

  for (var i = 1; i <= obj.sides+1;i += 1) {
    context.lineTo (obj.size * Math.cos(i%obj.sides * 2 * Math.PI / obj.sides), obj.size * Math.sin(i%obj.sides * 2 * Math.PI / obj.sides));
  }

  context.strokeStyle = obj.lineColor;
  context.fillStyle = obj.fillColor;
  context.lineWidth = obj.lineWidth;
  context.fill();
  context.stroke();
  context.rotate(-obj.angle * Math.PI / 180);

  context.translate(-obj.size/2,-obj.size/2);
  context.drawImage(obj.image,0,0,100,100,0,0,obj.size,obj.size);
  context.translate(obj.size/2,obj.size/2);


  context.translate(-obj.x,-obj.y);
}

function drawPolyRadial(obj, range=200){
  context.translate(obj.x,obj.y);

  context.rotate(obj.angle * Math.PI / 180);
  context.beginPath();
  context.moveTo ((obj.size+range) * Math.cos(0), (obj.size+range) *  Math.sin(0));          

  for (var i = 1; i <= obj.sides+1;i += 1) {
    context.lineTo ((obj.size+range) * Math.cos(i%obj.sides * 2 * Math.PI / obj.sides), (obj.size+range) * Math.sin(i%obj.sides * 2 * Math.PI / obj.sides));
  }

  context.strokeStyle = obj.lineColor;
  context.lineWidth = obj.lineWidth;
  context.stroke();
  context.rotate(-obj.angle * Math.PI / 180);

  context.translate(-obj.x,-obj.y);
}


function drawPoints(size=4){
  points = String(parseFloat(points));
  while(points.length < size){
    points = "0"+points;
  }
  score = String(parseFloat(score));
  while(score.length < size){
    score = "0"+score;
  }
  $("#points").html(`SIDES: ${points}<br>SCORE: ${score}<br><br>Click to reset`);
};


function newEnemy(enemies, player){
  var middle = points;
  var posX  = Math.floor(Math.random() * (screenSizeX - 150) + 150);
  var posY  = Math.floor(Math.random() * (screenSizeY - 150) + 150);

  while(Math.sqrt(Math.pow(player.x-posX, 2) + Math.pow(player.y-posY, 2)) < player.size + 450){
    posX  = Math.floor(Math.random() * (screenSizeX - 150) + 150);
    posY  = Math.floor(Math.random() * (screenSizeY - 150) + 150);
  }

  var sides = Math.floor(Math.random() * (middle + 2) + (middle - 2));
  sides = sides < 3? 3: sides;
  enemies.push(new Polygon(posX,posY,150,sides,0,"white",15,"red",2));

  var forceX =  Math.floor(Math.random() * 40 - 20);
  var forceY =  Math.floor(Math.random() * 40 - 20);

  if(enemies[enemies.length-1].sides == points) enemies[enemies.length-1].lineColor = "#fcba03";
  if(enemies[enemies.length-1].sides < points)  enemies[enemies.length-1].lineColor = "#638cc9";

  enemies[enemies.length-1].setBorders(0,0,screenSizeX,screenSizeY);
  enemies[enemies.length-1].applyForce(forceX, forceY);
}