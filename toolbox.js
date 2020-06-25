const canvas = $("#canvas")[0];
const context = canvas.getContext("2d");


function background(color="#00000055"){
  context.fillStyle = color;
  context.fillRect(0,0,6400,3200);
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


function drawPoints(points, size=3){
  points = String(parseFloat(points));
  while(points.length < size){
    points = "0"+points;
  }
  $("#points").html(`SIDES<br>${points}`);
};


function newEnemy(enemies){
  var middle = points;
  var posX  = Math.floor(Math.random() * (screenSizeX - 150) + 150);
  var posY  = Math.floor(Math.random() * (screenSizeY - 150) + 150);

  var sides = Math.floor(Math.random() * (middle + 2) + (middle - 2));
  sides = sides < 3? 3: sides > 15? 15: sides;
  enemies.push(new Polygon(posX,posY,150,sides,0,"white",15,"red",2));

  var forceX =  Math.floor(Math.random() * 40 - 20);
  var forceY =  Math.floor(Math.random() * 40 - 20);

  enemies[enemies.length-1].setBorders(0,0,screenSizeX,screenSizeY);
  enemies[enemies.length-1].applyForce(forceX, forceY);
}