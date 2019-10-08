class Sensor {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show() {
    stroke(252, 186, 3);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x, this.dir.y);
    pop();
  }

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;
    
    /*  Checking if there is an intersection between the
    given wall and the fictive infinite ray of the sensor
    https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    */
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return; //  No intersection point
    } else { 
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
      if (t > 0 && t < 1 && u > 0) {
        const intersectionPoint = createVector();
        intersectionPoint.x = x1 + t * (x2 - x1);
        intersectionPoint.y = y1 + t * (y2 - y1);
        return intersectionPoint;
      } else {
        return;
      }
    }
  }
}
