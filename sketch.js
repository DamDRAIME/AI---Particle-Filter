/*
-----------------------
PARTICLE FILTER
-----------------------

Damien Draime
25/09/2019


Some credits to Daniel Shiffman - [ https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html]

*/
let levelId = 2; // 1 and 2: prebuilt maps; 3: randomly generated map
let nbrOfWalls = 5; //  Only meaningful if levelId == 3

let nbrOfParticles = 10;

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
  particles = new Particles(nbrOfParticles);
  
  /*  Creating a target for the robot (Optional)  */
  //target = new Landmark();
}

function draw() {
  background(255);
  
  /*  Displaying the walls/boundaries  */
  levelGen.show();
  
  /*  Displaying the particles  */
  particles.show();
  
  /*  Displaying the robot's target (Optional)  */
  //target.show();
    
  //if (robot.isArrived(target)) {console.log("Arrived")}
  
  robot.detect(levelGen.getWalls());
  robot.show();
  let newMovement = movGen.next().value;
  console.log(newMovement.angle, newMovement.distance);
  robot.move(newMovement.angle, newMovement.distance);
  
  //console.log(robot.getSensorData());


}