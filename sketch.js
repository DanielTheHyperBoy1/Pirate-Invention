const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var cannon;

var canvas, angle, tower, ground, cannon;
var ball=[];
var boats=[];
function preload(){
  
  backgroundImg=loadImage("./assets/background.gif");

  towerImage=loadImage("./assets/tower.png");

}

function setup(){

  canvas=createCanvas(1200,600);
  
  engine=Engine.create();

  world=engine.world;

  var options={
    
    isStatic:true

  };
  angleMode(DEGREES);
  angle=15;
  ground=Bodies.rectangle(0,height-1,width*2,1,options);
  World.add(world,ground);

  tower=Bodies.rectangle(160,350,160,310,options);
  World.add(world,tower);

  cannon=new Cannon(180,110,130,100,angle);
  boat=new Boat(width-80,height-60,170,170,-80);

  
}

function draw(){
  
  image(backgroundImg,0,0,1200,600);

  Engine.update(engine);
  //push();
  //rectMode(CENTER)
  rect(ground.position.x,ground.position.y,width*2,1);
  //pop();
  push();

  imageMode(CENTER);
  
  image(towerImage,tower.position.x,tower.position.y,160,350);

  pop();

  cannon.display();
  for(var i=0;i<ball.length;i++){
    showCannonBalls(ball[i]);
    collisionWithBoat(i);
  }
 showBoats();

} 

function keyPressed(){
  if (keyCode===DOWN_ARROW){
    cannonBall=new CannonBall(cannon.x,cannon.y);
    ball.push(cannonBall);
  }
}
function keyReleased(){
  if(keyCode===DOWN_ARROW){
    ball[ball.length-1].shoot();
  }
}
function showCannonBalls(ball,i){
  if (ball){
    cannonBall.display();
  }
}
function showBoats(){
  if (boats.length>0){
    if (boats[boats.length-1]===undefined ||
       boats[boats.length-1].body.position.x<width-300){
  var positions=[-40,-60,-70,-20];
  var position_1=random(positions);
  boat=new Boat(width,height-60,170,170,position_1);
  boats.push(boat);
    }
    for(var i=0;i<=boats.length;i++){
      if(boats[i]){
        Matter.Body.setVelocity(boat.body,{
          x:-0.9,y:0
        });
        boat.display(); 
      }
      else{
        boats[i];

      }
    }

  }
  else{
    boat=new Boat(width,height-60,170,170,-80);
    boats.push(boat);
  }
}

function collisionWithBoat(index){
  for(var i=0;i<boats.length;i++){
    if(balls[index] !== undefined && boats[i]!== undefined ){
      var collision=Matter.SAT.collides(balls[index].body,boats[i].body);
      if(collision.collided){
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}