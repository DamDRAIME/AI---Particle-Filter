/*
-----------------------
PARTICLE FILTER
-----------------------

Damien Draime
25/09/2019


Some credits to Daniel Shiffman - [ https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html]

*/
let levelId = 1; // 1 and 2: prebuilt maps; 3: randomly generated map
let nbrOfWalls = 5; //  Only meaningful if levelId == 3

let nbrOfParticles = 1000;

let sightRange = 150;
let sensorError = 0.05;
let sensorPrecision = sightRange *  sensorError;
let nbrSensors = 36;

function setup() {
  frameRate(3);
  createCanvas(600, 400);
  
  /*  Generating the level  */
  levelGen = new LevelGenerator(levelId, nbrOfWalls);
  
  /*  Adding the robot  */
  robotInit = levelGen.robotInitializationPosition()
  robot = new Robot(robotInit.x, robotInit.y, robotInit.angle, sightRange, nbrSensors, sensorPrecision);
  movGen = levelGen.robotMovements();
  
  /*  Initializing the particles  */
  particles = new Particles(nbrOfParticles, sightRange, nbrSensors, sensorPrecision);
  
  /*  Creating a target for the robot (Optional)  */
  //target = new Landmark();
}

function draw() {
  background(255);
  
  /*  Displaying the walls/boundaries  */
  levelGen.show();
  
  /*  Displaying the robot's target (Optional)  */
  //target.show();
    
  //if (robot.isArrived(target)) {console.log("Arrived")}
  
  /*  Displaying the particles and detecting walls */
  particles.detect(levelGen.getWalls());
  particles.show();
  
  /*  Displaying the robot and detecting walls */
  robot.detect(levelGen.getWalls());  
  robot.show();
  
  /*  Updating particles' weights */
  particles.updateWeights(robot.getSensorData());
  particles.findBestParticle();
  
  /*  Resampling the particles */
  particles.resample(5*PI/180, 2, true);
  
  /*  Updating robot's and particles' position and direction */
  let newMovement = movGen.next().value;
  robot.move(newMovement.angle, newMovement.distance);
  particles.move(newMovement.angle, newMovement.distance);
  




}

function gaussianProb(mu, sigma, x) { 
    // calculate the probability of x for 1-dim Gaussian with mean mu and var sigma 
    return exp( -((mu - x) ** 2) / (sigma ** 2) / 2.0) / sqrt( 2.0 * PI * (sigma ** 2))
}

function getWeight(particleData, robotData, noise) {  

  let w = 1.0;
  for (var i = 0; i < particleData.length; i++){
    w *= gaussianProb(particleData[i], noise, robotData[i]);
  }
  return w + 1.0e-300 // avoid round-off to zero
}