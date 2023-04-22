var PLAY=1,END=0;
var bgImg, bg;
var pipeupImg, pipe1;
var pipedownImg, pipe2;
var birdImg, bird;
var score=0;
var gameState=PLAY;
var restartImg, restart;
var diamond,diamondImg

function preload(){

 birdImg=loadImage("bird.png");
 bgImg=loadImage("bg.png");
 pipeupImg=loadImage("pipeUp.png");
 pipedownImg=loadImage("pipedown.png")
 restartImg=loadImage("restart.png");
 diamondImg=loadImage("diamond.png")
}

function setup() {

createCanvas(600,600);
bg=createSprite(300,300,600,600);
bg.addImage(bgImg);
bg.scale=2.5


bird=createSprite(20,256);

bird.addImage(birdImg);
bird.debug=true;



restart=createSprite(300,250);
restart.addImage(restartImg );
restart.scale=0.2
restart.visible=false;
pipe1Group=new Group();
pipe2Group=new Group();
}

function draw() {
if(gameState===PLAY){
    pipe_move();

if(keyDown("space")){
    bird.velocityY=-10;
}
bird.velocityY+=0.8
if(pipe1Group.isTouching(bird)|| pipe2Group.isTouching(bird)||bird.y>=600){
    gameState=END;
}
if(frameCount%2===0){
    score++;
}}
if(gameState===END){
    bird.y=300
    bird.visible=false;
    restart.visible=true;
    pipe1Group.setVelocityXEach(0);
    pipe2Group.setVelocityXEach(0);
    pipe1Group.setLifetimeEach(-1);
    pipe2Group.setLifetimeEach(-1);
}
if(mousePressedOver(restart)){
    reset();

}
drawSprites();
textSize(30);
text("score: "+score,450,50);

}

function pipe_move(){
if(frameCount%90===0){
    pipe1 = createSprite(600,0);
    pipe1.addImage(pipeupImg);
    pipe1.y = random(0,45);
    pipe1.debug=true;
    pipe1.velocityX = -2;
    pipe1Group.add(pipe1);
    pipe1Group.setLifetimeEach(144);
    
    pipe2 = createSprite(600,600);
    pipe2.addImage(pipedownImg);
    pipe2.y = random(462,512);
    pipe2.velocityX = -2;
    pipe2.debug=true;
    pipe2Group.add(pipe2);
    pipe2Group.setLifetimeEach(100);
 }

}
function reset(){
    gameState=PLAY;
    pipe1Group.destroyEach();
    pipe2Group.destroyEach();
    score = 0;
    bird.visible=true;
    restart.visible=false
  }

  function treasure() {
    if (World.frameCount % 50 == 0) {
    var treasure = createSprite(Math.round(random(200, 450),40, 10, 10));
    treasure.addImage(diamondImg);
    treasure.scale=0.12;
    treasure.velocityY = 3;
    treasure.lifetime = 150;
    
    }
  }
  