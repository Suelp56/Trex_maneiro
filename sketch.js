var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;

var gameOver;
var cabo;
var restart;
var recomecar;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu);
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  //sprites do começar e recomeçar
  cabo = createSprite(300,100);
  cabo.addImage(gameOver);
  recomecar = createSprite(300,150);
  recomecar.addImage(restart);
   
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();
  
  console.log("Oi" + 5);
   
  trex.setCollider("circle",0,0,40);
  trex.debug = true
  
  pontuacao = 0;
}

function draw() {
  background(180);
  //exibindo pontuação
  text("Pontuação: "+ pontuacao, 500,50);
  posx = mouseX;
  posy = mouseY;
  console.log("posição X = "+posx);
  console.log("posição Y = "+posy);
  
  console.log("isto é ",estadoJogo)
  
  
  if(estadoJogo === JOGAR){
    //mover o solo
    solo.velocityX = -4;
    //marcando pontuação
    pontuacao = pontuacao + Math.round(frameRate()/60);
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //saltar quando a tecla de espaço é pressionada
    if(keyDown("space")&& trex.y >= 165) {
       trex.velocityY = -13;
      
      
  }
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
   
    //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
    
    if(grupodeobstaculos.isTouching(trex)){
        estadoJogo = ENCERRAR;
    }
    
    cabo.visible=false;
    recomecar.visible=false;
  }
     else if (estadoJogo === ENCERRAR) {
      solo.velocityX = 0;
     grupodeobstaculos.setLifetimeEach(-1);
     grupodeobstaculos.setVelocityXEach(0);
     grupodenuvens.setLifetimeEach(-1);
     grupodenuvens.setVelocityXEach(0);
     trex.changeAnimation("collided",trex_colidiu);
       
     cabo.visible=true;
     recomecar.visible=true;
   }
  
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

  
  
  drawSprites();
  
  if (mousePressedOver(recomecar)) {
    tokEstok();
}
}
function tokEstok(){
  estadoJogo=JOGAR;
  grupodeobstaculos.destroyEach();
  grupodenuvens.destroyEach();
  trex.changeAnimation("running", trex_correndo);
  pontuacao=0;
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(600,165,10,40);
  obstaculo.velocityX = -6;
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 100;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 200;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adiciondo nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
}
