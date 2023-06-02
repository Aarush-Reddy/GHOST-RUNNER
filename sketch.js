var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() 
{
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite (200,200,50,50);
  ghost.addImage (ghostImg);
  ghost.scale = 0.3;

  
}

function draw() 
{
  
  background(0);
  if (gameState === "play")
  {
    if(tower.y > 400)
    {
      tower.y = 300
    }
    if (keyDown ("space"))
    {
      ghost.velocityY = -3;
    }
    ghost.velocityY += 0.7;
    if (keyDown (LEFT_ARROW))
    {
      ghost.x -= 3;
    }
    if (keyDown (RIGHT_ARROW))
    {
      ghost.x += 3;
    }

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY =0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end";
    }
  
    spawnDoors();
    drawSprites();
}
if(gameState === "end")
{
  stroke("yellow");
  fill ("yellow");
  textSize (30);
  text ("Game Over", 200, 300);
}   

}

function spawnDoors()
{
  if (frameCount% 240 === 0)
  {
   door = createSprite (Math.round(random(120,420)),-50);
   door.addImage (doorImg);
   door.velocityY = 1;
   door.lifetime = 650;
   doorsGroup.add (door);
  
   climber = createSprite(door.x,10);
   climber.addImage(climberImg);
   climber.velocityY =1;
   climber.lifetime =650;
   climbersGroup.add (climber);

   invisibleBlock = createSprite(door.x,15)
   invisibleBlock.height = 2;
   invisibleBlock.width =  climber.width;
   invisibleBlock.debug = true;
   invisibleBlock.lifetime = 650;
   invisibleBlockGroup.add (invisibleBlock);
   invisibleBlock.velocityY = 1;
   
   ghost.depth =door.depth;
   ghost.depth=ghost.depth+1
  }

}

