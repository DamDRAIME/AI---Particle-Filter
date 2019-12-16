class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class LevelGenerator {
  constructor (levelId, nbrOfWalls) {
    this.walls = [];
    this.levelId = levelId;
    if (this.levelId == 1) {
      this.walls.push(new Boundary(45, 0, 45, 150));
      this.walls.push(new Boundary(45, 150, 65, 150));
      this.walls.push(new Boundary(100, 150, 170, 150));
      this.walls.push(new Boundary(150, 150, 150, 50));
      this.walls.push(new Boundary(150, 50, 230, 50));
      this.walls.push(new Boundary(230, 50, 230, 0));
      this.walls.push(new Boundary(230, 50, 230, 150));
      this.walls.push(new Boundary(170, 150, 195, 135));
      this.walls.push(new Boundary(190, 90, 190, 80));
      this.walls.push(new Boundary(190, 80, 180, 80));
      this.walls.push(new Boundary(180, 80, 180, 90));
      this.walls.push(new Boundary(180, 90, 190, 90));
      this.walls.push(new Boundary(190, 90, 180, 80));
      this.walls.push(new Boundary(190, 80, 180, 90));
      this.walls.push(new Boundary(210, 150, 400, 150));
      this.walls.push(new Boundary(400, 150, 400, 125));
      this.walls.push(new Boundary(400, 125, 450, 125));
      this.walls.push(new Boundary(495, 125, 600, 125));
      this.walls.push(new Boundary(495, 125, 460, 105));
      this.walls.push(new Boundary(375, 100, 375, 50));
      this.walls.push(new Boundary(375, 75, 345, 75));
      this.walls.push(new Boundary(250, 150, 230, 130));
      this.walls.push(new Boundary(570, 40, 570, 10));
      this.walls.push(new Boundary(570, 10, 540, 10));
      this.walls.push(new Boundary(540, 10, 540, 40));
      this.walls.push(new Boundary(540, 40, 570, 40));
      this.walls.push(new Boundary(570, 40, 540, 10));
      this.walls.push(new Boundary(570, 10, 540, 40));
      this.walls.push(new Boundary(600, 275, 400, 275));
      this.walls.push(new Boundary(400, 275, 400, 250));
      this.walls.push(new Boundary(400, 250, 370, 250));
      this.walls.push(new Boundary(335, 250, 250, 250));
      this.walls.push(new Boundary(500, 245, 500, 275));
      this.walls.push(new Boundary(500, 275, 440, 275));
      this.walls.push(new Boundary(440, 275, 440, 245));
      this.walls.push(new Boundary(440, 245, 500, 245));
      this.walls.push(new Boundary(500, 245, 440, 275));
      this.walls.push(new Boundary(500, 275, 440, 245));
      this.walls.push(new Boundary(460, 275, 460, 340));
      this.walls.push(new Boundary(460, 340, 510, 340));
      this.walls.push(new Boundary(550, 340, 600, 340));
      this.walls.push(new Boundary(550, 340, 530, 310));
      this.walls.push(new Boundary(270, 250, 270, 400));
      this.walls.push(new Boundary(330, 330, 360, 370));
      this.walls.push(new Boundary(200, 250, 140, 250));
      this.walls.push(new Boundary(140, 400, 140, 250));
      this.walls.push(new Boundary(190, 290, 190, 280));
      this.walls.push(new Boundary(190, 280, 150, 280));
      this.walls.push(new Boundary(150, 280, 150, 290));
      this.walls.push(new Boundary(150, 290, 190, 290));
      this.walls.push(new Boundary(190, 290, 150, 280));
      this.walls.push(new Boundary(190, 280, 150, 290));
      this.walls.push(new Boundary(270, 350, 240, 350));
      this.walls.push(new Boundary(240, 350, 240, 335));
      this.walls.push(new Boundary(90, 280, 50, 290));
      this.walls.push(new Boundary(90, 290, 50, 280));
      this.walls.push(new Boundary(70, 285, 70, 265));
      this.walls.push(new Boundary(30, 310, 30, 380));
      this.walls.push(new Boundary(30, 380, 110, 380));
      this.walls.push(new Boundary(110, 380, 110, 310));
    } else if (this.levelId == 2) {
      this.walls.push(new Boundary(0, 60, 5, 60));
      this.walls.push(new Boundary(5, 90, 5, 60));
      this.walls.push(new Boundary(0, 90, 5, 90));
      this.walls.push(new Boundary(60, 10, 120, 10));
      this.walls.push(new Boundary(60, 40, 60, 10));
      this.walls.push(new Boundary(60, 40, 120, 40));
      this.walls.push(new Boundary(120, 10, 120, 40));
      this.walls.push(new Boundary(80, 60, 100, 60));
      this.walls.push(new Boundary(80, 75, 100, 75));
      this.walls.push(new Boundary(80, 75, 80, 60));
      this.walls.push(new Boundary(100, 60, 100, 75));
      this.walls.push(new Boundary(60, 95, 75, 110));
      this.walls.push(new Boundary(45, 110, 60, 125));
      this.walls.push(new Boundary(45, 110, 60, 95));
      this.walls.push(new Boundary(75, 110, 60, 125));
      this.walls.push(new Boundary(120, 95, 105, 110));
      this.walls.push(new Boundary(120, 125, 105, 110));
      this.walls.push(new Boundary(120, 125, 135, 110));
      this.walls.push(new Boundary(120, 95, 135, 110));
      this.walls.push(new Boundary(60, 200, 60, 300));
      this.walls.push(new Boundary(120, 200, 120, 300));
      this.walls.push(new Boundary(120, 200, 60, 200));
      this.walls.push(new Boundary(60, 300, 120, 300));
      this.walls.push(new Boundary(70, 190, 110, 190));
      this.walls.push(new Boundary(70, 310, 110, 310));
      this.walls.push(new Boundary(50, 210, 50, 240));
      this.walls.push(new Boundary(50, 260, 50, 290));
      this.walls.push(new Boundary(130, 210, 130, 240));
      this.walls.push(new Boundary(130, 260, 130, 290));
      this.walls.push(new Boundary(0, 400, 60, 370));
      this.walls.push(new Boundary(250, 370, 60, 370));
      this.walls.push(new Boundary(250, 370, 250, 400));
      this.walls.push(new Boundary(200, 0, 200, 230));
      this.walls.push(new Boundary(530, 230, 200, 230));
      this.walls.push(new Boundary(600, 230, 545, 205));
      this.walls.push(new Boundary(300, 400, 300, 315));
      this.walls.push(new Boundary(330, 300, 300, 315));
      this.walls.push(new Boundary(325, 275, 600, 275));
      this.walls.push(new Boundary(300, 375, 330, 375));
      this.walls.push(new Boundary(330, 345, 330, 375));
      this.walls.push(new Boundary(330, 345, 300, 345));
      this.walls.push(new Boundary(470, 400, 470, 330));
      this.walls.push(new Boundary(450, 390, 450, 340));
      this.walls.push(new Boundary(440, 390, 440, 340));
      this.walls.push(new Boundary(450, 390, 440, 390));
      this.walls.push(new Boundary(450, 340, 440, 340));
      this.walls.push(new Boundary(600, 310, 550, 310));
      this.walls.push(new Boundary(600, 330, 550, 330));
      this.walls.push(new Boundary(550, 330, 550, 310));
      this.walls.push(new Boundary(200, 50, 350, 50));
      this.walls.push(new Boundary(200, 140, 350, 140));
      this.walls.push(new Boundary(350, 50, 350, 140));
      this.walls.push(new Boundary(210, 210, 375, 210));
      this.walls.push(new Boundary(210, 210, 210, 230));
      this.walls.push(new Boundary(375, 230, 375, 210));
      this.walls.push(new Boundary(200, 20, 225, 20));
      this.walls.push(new Boundary(200, 40, 225, 40));
      this.walls.push(new Boundary(225, 20, 225, 40));
      this.walls.push(new Boundary(200, 150, 225, 150));
      this.walls.push(new Boundary(200, 170, 225, 170));
      this.walls.push(new Boundary(225, 150, 225, 170));   
      this.walls.push(new Boundary(225, 150, 225, 170));
      this.walls.push(new Boundary(225, 150, 225, 170));
      this.walls.push(new Boundary(225, 150, 225, 170));
      this.walls.push(new Boundary(225, 150, 225, 170));
      this.walls.push(new Boundary(425, 70, 425, 120));
      this.walls.push(new Boundary(425, 120, 445, 120));
      this.walls.push(new Boundary(445, 70, 445, 120));
      this.walls.push(new Boundary(425, 70, 445, 70));
    } else if (this.levelId ==3 && nbrOfWalls > 0) {
      for (let i = 0; i < nbrOfWalls; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        this.walls[i] = new Boundary(x1, y1, x2, y2);
      }
    }
    /*  Four edges of the canvas  */
    this.walls.push(new Boundary(0, 0, width, 0));
    this.walls.push(new Boundary(width-1, 0, width-1, height));
    this.walls.push(new Boundary(width, height-1, 0, height-1));
    this.walls.push(new Boundary(0, height, 0, 0));  
  }
  
  robotInitializationPosition() {
    if (this.levelId == 1) {
      return {x:width/2, y:height/2, angle:PI}
    } else if (this.levelId == 2) {
      return {x:300, y:175, angle:0}
    }
  }
  
  * robotMovements() {
    let a;
    let d;
    if (this.levelId == 1) {
      a = [0, 0, 0, 0, -1/4*PI, 0, 0, 1/8*PI, 0, 0, -1/4*PI, 0, 0, 0, 0, 0, 0, 0];
      d = [5, 10, 7, 11, 8, 12, 2, 7, 5, 6, 1, 9, 11, 10, 9, 6, 8, 3];
    } else if (this.levelId == 2) {
      a = [0, 0, 0, 0, 0, 0, -1/4*PI, 0, -1/4*PI, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1/2*PI, 0, 1/8*PI, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1/4*PI, 0];
      d = [5, 10, 7, 11, 8, 12, 2, 9, 8, 5, 2, 14, 13, 4, 7, 12, 18, 9, 10, 2, 3, 4, 11, 12, 7, 15, 2, 3, 7, 4, 5, 1, 9, 6, 4, 3, 12, 3, 9, 10, 2, 1, 6, 12, 14 ];
    }
    for (var i = 0; i < a.length; i++) {
      yield {angle:a[i], distance:d[i]};
    }
  }
  
  getWalls() {
    return this.walls
  }
  
  show() {
    for (let wall of this.walls) {
      wall.show()
    }
  }
} 