class MovingObject {
  constructor(x, y, angle, sightRange, nbrSensors, sensorPrecision, movementDataError) {
    this.pos = (x == undefined || y == undefined) ? createVector(random(width), random(height)) : createVector(x, y);
    this.angle = (angle == undefined) ? random(TWO_PI) : angle;
    this.dir = p5.Vector.fromAngle(this.angle);
    
    this.nbrSensors = nbrSensors;
    this.sightRange = sightRange; //  A positive value defining the maximum distance up to which the sensor can detect a wall/obstacle.
    this.sensorPrecision = sensorPrecision; //  A positive value defining the precision of the sensor when collecting data.
    this.movementDataError = movementDataError;
    this.sensors = []; //  The first sensor being at 3.00 o'clock. The next sensors are listed clockwise.
    const angleIncrement = Math.floor(360/this.nbrSensors);
    for (let a = 0; a < 360; a += angleIncrement) {
      this.sensors.push(new Sensor(this.pos, radians(a)));
    }
    this.sensorData = []; //  The same order as the one for the sensors list is applied.
  }
  
  move(angle, distance) {
    this.updateAngle(angle);
    this.updatePosition(distance);
  }

  updatePosition(distance) {
    let magnitude = (distance == undefined) ? random(0, 25) : distance;
    this.dir.setMag(magnitude);
    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;
  }
  
  updateAngle(angleRad) {
    let rotation = (angleRad == undefined) ? random(-PI/4, PI/4) : angleRad;
    this.dir.rotate(rotation);
    this.angle = this.dir.heading();
  }

  detect(walls, draw=false) {
    this.sensorData = [];
    for (let sensor of this.sensors) {
      let closest = null;
      let recordDistance = this.sightRange;
      for (let wall of walls) {
        const intersectionPoint = sensor.cast(wall);
        if (intersectionPoint) {
          const d = p5.Vector.dist(this.pos, intersectionPoint);
          if (d <= recordDistance) {
            recordDistance = d;
            closest = intersectionPoint;
          }
        }
      }
      /*  The distance to closest obstacle is saved sensorData. 
      If no obstacle is met then the saved distance is equal to
      the sightRange. A slight randomness is added to this
      distance if sensorPrecision > 0.  */
      this.sensorData.push(recordDistance + (random(-this.sensorPrecision, this.sensorPrecision)));
      if (draw == true) {
        if (closest) { //  An obstacle was detected
          stroke(252, 186, 3);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        } else { //  No obstacle was detected
          const endRange = createVector(this.pos.x + sensor.dir.x*this.sightRange, this.pos.y + sensor.dir.y*this.sightRange)
          stroke(191);
          line(this.pos.x, this.pos.y, endRange.x, endRange.y);
        }
      }
      }
  }
  
  getSensorData() {
    return this.sensorData
  }
  
  show() {
    fill(252, 186, 3);
    ellipse(this.pos.x, this.pos.y, 4);
    stroke(158, 51, 61);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x, this.dir.y);    
    pop();
  }
}


class Robot extends MovingObject {
  
  detect(walls) {
    super.detect(walls, true)
  }

  isArrived(landmark) {
    const deltax = Math.abs(landmark.pos.x - this.pos.x);
    const deltay = Math.abs(landmark.pos.y - this.pos.y);
    return (deltax <= landmark.r && deltay <= landmark.r);
  }
  
}


class Particle extends MovingObject {
  constructor(x, y, angle, weight, sightRange, nbrSensors, sensorPrecision) {
    super(x, y, angle, sightRange, nbrSensors, sensorPrecision, 0);
    this.weight = weight;
  }
  
  show() {
    let r;
    noStroke();
    if (this.bestPrediction) {
      fill(113, 181, 29);
      r = 5;
    } else {
      fill(173, 173, 173, 33);
      r = 2;
    }
    ellipseMode(RADIUS);
    ellipse(this.pos.x, this.pos.y, r);
  }
}

class Particles {
  constructor(nbrParticles, sightRange, nbrSensors, sensorPrecision) {
    this.particles = [];
    this.nbrParticles = nbrParticles;
    for (let i = 0; i < this.nbrParticles; i++) {
      this.particles[i] = new Particle(random(width), random(height), random(TWO_PI), 1/this.nbrParticles, sightRange, nbrSensors, sensorPrecision);
    }
    this.sightRange = sightRange;
    this.nbrSensors = nbrSensors;
    this.sensorPrecision = sensorPrecision;
    this.bestParticle = this.particles[0];
    this.weightsNormalized = []; // In the same order as this.particles
  }
  
  move(angle, distance) {
    for (let particle of this.particles) {
      particle.move(angle, distance);
    }
  }
  
  detect(walls) {
    for (let particle of this.particles) {
      particle.detect(walls, false)
    }
  }
  
  updateWeights(robotData) {
    let weights = [];
    let weightsSum = 0.0;
    this.weightsNormalized = [];
    for (let particle of this.particles) {
      const w = getWeight(particle.sensorData, robotData, particle.sensorPrecision*20);
      weights.push(w);
      weightsSum += w;
    }
    for (let i = 0; i < this.nbrParticles; i++) {
      let weightNorm = weights[i] / weightsSum;
      this.particles[i].weight = weightNorm;
      this.weightsNormalized.push(weightNorm);
    }
  }
  
  findBestParticle() {
    let bestParticle = this.particles[0]
    for (let particle of this.particles) {
      particle.bestPrediction = false;
      if (particle.weight > bestParticle.weight) {
        bestParticle = particle
      }
    }
    bestParticle.bestPrediction = true;
    this.bestParticle = bestParticle;
  }
  
  resample(angleRadStd, positionStd, elist) {
    let resampledParticles = [];
    let cumulativeWeights = [];
    let increment = 0.0;
    for (let i = 0; i < this.nbrParticles; i++) {
      increment += this.weightsNormalized[i];
      cumulativeWeights.push(increment);
    }
    for (let i = 0; i < this.nbrParticles; i++) {
      if (elist && i == 0) {
        resampledParticles.push(this.bestParticle);
      } else {
        let r = random();
        let j = 0;

        while (cumulativeWeights[j] < r) {
          j += 1;
        }
        let angle = this.particles[j].angle + randomGaussian(0, angleRadStd);
        let x = this.particles[j].pos.x + int(randomGaussian(0, positionStd));
        let y = this.particles[j].pos.y + int(randomGaussian(0, positionStd));
        resampledParticles.push(new Particle(x, y, angle, 0.0, this.sightRange, this.nbrSensors, this.sensorPrecision, 0));
      } 
    }
    /*// Removing all particles from previous generation
    for (let particle of this.particles) {
      particle.remove();
    }*/
    
    // Copying all new particles
    this.particles = resampledParticles;
  }
  
  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
