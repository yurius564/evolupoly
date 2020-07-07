const faces = [
"faces/f1.png",
"faces/f2.png",
"faces/f3.png",
"faces/f4.png",
"faces/f5.png",
"faces/f6.png",
"faces/f7.png",
"faces/f8.png"
];


class Polygon{
  #borderStartX;
  #borderEndX;
  #borderStartY;
  #borderEndY;

  constructor(x,y,size,sides,angle,fillColor,lineWidth,lineColor, rotating=1){
    this.x         = x;
    this.y         = y;
    this.size      = size;
    this.sides     = sides;
    this.angle     = angle;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.rotating  = rotating;
    this.dead     = false;

    if(this.rotating){
      var rotationInterval = setInterval(function(self){
        self.angle += self.rotating;

        if(!self.rotating){
          clearInterval(rotationInterval);
        }
      },10, this);
    }

    this.image = new Image;
    this.image.src = faces[parseInt(Math.random()*8)];
    // this.image.src = faces[parseInt(Math.random()*6)];

  }

  draw() {
    drawPoly(this);
  }

  pullTo(x,y, force=false) {
    if(x && !((this.x + x) < this.#borderStartX+this.size) && !((this.x + x) > this.#borderEndX-this.size) || force){
      this.x += x;
    }
    if(y && !((this.y + y) < this.#borderStartY+this.size) && !((this.y + y) > this.#borderEndY-this.size) || force){
      this.y += y;
    }
  }

  setBorders(x1,y1,x2,y2) {
    this.#borderStartX = x1;
    this.#borderEndX = x2;
    this.#borderStartY = y1;
    this.#borderEndY = y2;
  }

  applyForce(x,y){
    var moveme = setInterval(function(self){
      self.pullTo(x,y,true);
      if((self.x < (self.#borderStartX-self.size-self.lineWidth) || self.x > (self.#borderEndX+self.size+self.lineWidth))
      ||(self.y < (self.#borderStartY-self.size-self.lineWidth) || self.y > (self.#borderEndY+self.size+self.lineWidth))){
        clearInterval(moveme);
        self.kill();
      }
    },20, this);
  }

  kill() {
    drawPolyRadial(this);
    this.dead = true;
    var killme = setInterval(function(self){
      self.size -= 10;
      if(self.size <= 0){
        self.size = 0;
        clearInterval(killme);
      }
    }, 50, this);
  }


  collides(other) {
    if(other.dead || this.dead) return 0;
    var hasCollision = Math.sqrt(Math.pow(this.x-other.x, 2) + Math.pow(this.y-other.y, 2)) < this.size + other.size;
    if(hasCollision) {
      drawPolyRadial(this);
      drawPolyRadial(this, 150);
      drawPolyRadial(this, 180);
      drawPolyRadial(other);
      drawPolyRadial(other, 150);
      drawPolyRadial(other, 180);
      return this.sides >= other.sides? this.sides > other.sides? 1: 2: -1;
    }
    else return 0;
  }
}