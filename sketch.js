var bananaImg, obstacleImg, backgroundJungle, backgroundImg, player_running;
var obstacleGroup,foodGroup
var score
var ground
var monkey

function preload() {
  backgroundImg = loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_04.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_09.png","Monkey_10.png")
  
  bananaImg = loadImage("Banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  backgroundJungle = createSprite(200,200);
  backgroundJungle.addImage(backgroundImg);
  backgroundJungle.velocityX = -3
  backgroundJungle.x = backgroundJungle.width/2;
  
  ground = createSprite(200,380,400,5);
  ground.visible = false;
  
  monkey = createSprite(50,380,10,10);
  monkey.addAnimation("running",player_running);
  monkey.scale = 0.12;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  stroke("white");
  textSize(20);
  fill("white");
}

function draw() {
  background(220);
  
  if(keyWentDown("space") && monkey.y >= 215) {
    monkey.velocityY= -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(backgroundJungle.x < 0){
    backgroundJungle.x = backgroundJungle.width/2;
  }
  
  food();
  stone();
  
  if(foodGroup.isTouching(monkey)) {
    score = score+2;
    foodGroup.destroyEach();
  }
  
  monkey.collide(ground);
  
  switch(score) {
    case 10: monkey.scale = 0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;
    case 30: monkey.scale = 0.16;
            break;
    case 40: monkey.scale = 0.18;
            break;
      default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.08;
    if(score>10) {
      score = score-10;
    }
    
    else {
     score = 0; 
    }
    obstacleGroup.destroyEach();
  }
  
  drawSprites();
  
  text("Score: "+ score, 300,50);
} 

function food() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(400,150,20,50);
    banana.y = random(140,220);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -8;
    banana.lifetime = 55;
    foodGroup.add(banana);
  }
}

function stone() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,360,20,50);
    obstacle.velocityX = -7;
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.lifetime = 65;
    obstacleGroup.add(obstacle);
  }
}






