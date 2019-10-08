class Landmark {
  constructor() {
    this.pos = createVector(random(width-2), random(height-2));
    this.r = 10
    }
  
  show() {
    fill(158, 51, 61);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, this.r);
    //text('target', this.pos.x - this.r, this.pos.y + this.r + 15);
    }
  }
