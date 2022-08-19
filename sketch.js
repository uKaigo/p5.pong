// Variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 27;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// Posições das raquetes
ESQUERDA = 1;
DIREITA = -1;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound('assets/trilha.mp3')
  ponto = loadSound('assets/ponto.mp3')
  raquetada = loadSound('assets/raquetada.mp3')
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete, DIREITA);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente, ESQUERDA);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio >= width || xBolinha - raio <= 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio >= height || yBolinha - raio <= 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }

  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}


// function movimentaRaqueteOponente() {
//   velocidadeYOponente =
//     yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
//   yRaqueteOponente += velocidadeYOponente;
// }

function verificaColisaoRaquete(x, y, posicaoRaquete) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    diametro
  );
  if (colidiu) {
    // Isso é usado para impedir que a bola fique
    // presa atrás da raquete.
    velocidadeXBolinha = abs(velocidadeXBolinha) * -posicaoRaquete;
    raquetada.play()
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  rect(450, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha + raio >= 600) {
    meusPontos += 1;
    ponto.play()
  }

  if (xBolinha - raio <= 0) {
    pontosDoOponente += 1;
    ponto.play()
  }
}

