var backgroundImage, bg
var SoldadoImage, Soldado
var Zombie1,Zombie2,Zombie3
var Laser,LaserImg
var GroundInv, Ground
var PLAY = 0
var END = 1
var WIN = 2
var Vida = 3
var Score = 0
var gameState = PLAY
var ZumbiGroup, LaserGroup
var Bullet = 35;
var BalaImg

function preload(){
  backgroundImage = loadImage("./assets/Teste.jpg")
  SoldadoImage = loadImage("./assets/Soldado.gif")
  LaserImg = loadImage("./assets/Laser.png")
  BalaImg = loadImage("./assets/Bullet.png")
  Zombie1 = loadImage("./assets/Zumbi.gif")
  Zombie2 = loadImage("./assets/Zumbi_Rapido.gif")
  Zombie3 = loadImage("./assets/Zumbi_Mulher.gif")
}

function setup() {
  createCanvas(1600,1000);

  bg = createSprite(800,500)
  bg.addImage("backgroundd", backgroundImage)
  //bg.scale = 0.95
  
  LaserGroup = new Group()
  ZumbiGroup = new Group()
  BulletGroup = new Group()

  Soldado = createSprite(100,height-100)
  Soldado.addImage("soldadoo", SoldadoImage)
  Soldado.scale = 0.7
  //Soldado.debug = true
  Soldado.setCollider("rectangle",0,0,100,200)

  GroundInv = createSprite(950,800,700,10)
  GroundInv.visible = false
  Ground = createSprite(800,990,1600,10)
  Ground.visible = false
}

function draw() {
  background(0);

  if(gameState == PLAY){
    MoveSoldier();
    CreateZombie();
    SpawnBullet();

    if(Soldado.x < 50){
      Soldado.x = 50
    }
    if(Soldado.x > 1000){
      Soldado.x = 1000
    }

    for(var i = 0; i < BulletGroup.length ;i++){
      if(BulletGroup[i].isTouching(Soldado)){
        Bullet = Bullet + Math.round(random(5,15))
        BulletGroup[i].destroy()
      }
    }

    for(var i = 0; i < ZumbiGroup.length ;i++){
      if(ZumbiGroup[i].isTouching(LaserGroup)){
        LaserHit()
        ZumbiGroup[i].destroy()
        Score = Score + 1
      }
    }


    for(var i = 0; i < ZumbiGroup.length ;i++){
      if(ZumbiGroup[i].isTouching(Soldado)){
        ZumbiGroup[i].destroy()
        Vida = Vida - 1
      }
    }


   if(Vida <= 0){
    gameState = END
   }
   if(Score >= 50){
    gameState = WIN
   }
  }

  Soldado.collide(Ground);
  Soldado.collide(GroundInv);

  drawSprites();
  textSize(35)
  text("Vida: "+ Vida,30,150);
  text("Zumbis Derrotados: "+ Score,30,100);
  text("Quantidade de Balas: "+ Bullet,30,50);

  if(gameState == END){
    ZumbiGroup.setVelocityXEach(0)
    Soldado.velocityY = 0
    Soldado.velocityX = 0
    textSize(100)
    text("Game over",500,500)
    
  }
  else if(gameState == WIN){
    ZumbiGroup.destroyEach();
    textSize(100);
    text("PARABENSSS",500,500);
  }
}

function MoveSoldier(){
  if(keyDown(LEFT_ARROW)){
    Soldado.x = Soldado.x - 8
  }
  if(keyDown(RIGHT_ARROW)){
    Soldado.x = Soldado.x + 8
  }
  if(keyDown(UP_ARROW) && Soldado.y >= height - 320){
    Soldado.velocityY = -10
  }
  Soldado.velocityY = Soldado.velocityY + 0.5
// Atirar
  if(keyWentDown("SPACE") && Bullet > 0) {
    Laser = createSprite(Soldado.x + 60, Soldado.y + 8) 
    Laser.addImage("Laserzin", LaserImg)
    Laser.scale = 0.08
    Laser.velocityX = 15
    LaserGroup.add(Laser)
    Bullet = Bullet - 1
  }
}

function CreateZombie(){
  if(frameCount % 90 == 0){
    var y = [height - 78, height - 250]
    var Zumbi = createSprite(width,random(y))
    Zumbi.velocityX = -(4 + frameCount/60)
    Zumbi.scale = 0.13
    Zumbi.setCollider("rectangle",0,0,600,800)
    ZumbiGroup.add(Zumbi)
    var x = Math.round(random(1,3))
    switch(x){
      case 1: Zumbi.addImage("Zumbi_1", Zombie1)
      break
      case 2: Zumbi.addImage("Zumbi_2", Zombie2)
      break
      case 3: Zumbi.addImage("Zumbi_3", Zombie3)
      break
      default:
      break
    } 
  }
}

function LaserHit(){
  for(var i = 0; i < LaserGroup.length ;i++){
    if(LaserGroup[i].isTouching(ZumbiGroup)){
      LaserGroup[i].destroy();
    }
  }
}

function SpawnBullet(){
if(frameCount % 180 == 0){
    var Balas = createSprite(random(800,100),10)
    Balas.velocityY = Math.round(random(2,10))
    Balas.addImage("Bala_1", BalaImg)
    Balas.scale = 0.2
    BulletGroup.add(Balas)
}
}