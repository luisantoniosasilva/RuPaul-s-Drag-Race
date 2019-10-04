function nome() { 
  var nome = prompt("Qual o seu nome?"); 
  if (nome != null) { 
      document.getElementById("nome").innerHTML = 
          "<h2>Vamos começar a jogar, " + nome + "</h2>"; 
  } 
} 

var intervalo;

function tempo(op) {
	if (op == 1) {
		document.getElementById('parar').style.display = "block";
		document.getElementById('comeca').style.display = "none";
	}
	var s = 1;
	var m = 0;
	var h = 0;
	intervalo = window.setInterval(function() {
		if (s == 60) { m++; s = 0; }
		if (m == 60) { h++; s = 0; m = 0; }
		if (h < 10) document.getElementById("hora").innerHTML = "0" + h + "h"; else document.getElementById("hora").innerHTML = h + "h";
		if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + "s"; else document.getElementById("segundo").innerHTML = s + "s";
		if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + "m"; else document.getElementById("minuto").innerHTML = m + "m";		
		s++;
	},1000);
}
window.onload=tempo;

function parar() {
	window.clearInterval(intervalo);
}

document.getElementById("header").onload = nome();

function embaralhar (lista) {
    let valor_temporario;
    let indice_aleatorio;
  
  
    for(let i = lista.length - 1; i !== 0; i--){
        indice_aleatorio = Math.floor(Math.random()* i);
  
        valor_temporario = lista[i];
        lista[i] = lista[indice_aleatorio];
        lista[indice_aleatorio] = valor_temporario;
        
  
    }
    return lista;
  
  }
  function fechar(carta){
  carta.style.backgroundImage = "url('img/capinha.jpg')";
  carta.onclick = processarClique;
  }
  function abrir(carta){
    carta.style.backgroundImage = `url('img/${imagens[Number(carta.id)]}' )`;
    carta.onclick = null;
  }
  
  function travarCliques(){
    for(let carta of cartas){
      carta.onclick = null;
    }
  }
  function destravarCliques(){
    for(let carta of cartas){
        if(!carta.classList.contains("correta")){
          fechar(carta);
        }
    }
  }
  
  function processarClique(event) {
    abrir(event.target);
    if (cartaUm) {
      cartaDois = event.target;
      travarCliques();
      verificarIguais();
    }
    else {
      cartaUm = event.target;
    }
  }

  var contwinner = 0;
  var clique = 0;
  document.getElementById("acertos").innerHTML = "<h2>Acertos:" + contwinner + " Tentativas: " + clique + "</h2>"; 
  function verificarIguais(){
    clique++;
    if (cartaUm.style.backgroundImage !== cartaDois.style.backgroundImage) {
      setTimeout(function(){
        document.getElementById("acertos").innerHTML = "<h2>Acertos:" + contwinner + " Tentativas: " + clique + "</h2>"; 
        alert("+1 erro, mas continue tentando");
        fechar(cartaUm);
        fechar(cartaDois);
        iniciarJogada();
      }, 100);
    }
    else{
      cartaUm.classList.add("correta");
      cartaDois.classList.add("correta");
      iniciarJogada();
      setTimeout(() => {
        contwinner++;
        document.getElementById("acertos").innerHTML = "<h2>Acertos:" + contwinner + " Tentativas: " + clique + "</h2>"; 
        if (contwinner == 12){
          alert("Parabéns! Você venceu essa partida! Sua porcentagem de acertos: "+ clique/contwinner + "%");
          var refresh = confirm ("Deseja jogar uma nova partida?");
          if (refresh == true){
            window.location.reload();
          }
          parar();
        } else {
          alert("+1 acerto");
        }
      }, 10);
    }
  }
  
  function iniciarJogada(){
    cartaUm = null;
    cartaDois = null;
    destravarCliques();
  }
  let cartas = document.querySelectorAll(".carta");
  
  let cartaUm;
  let cartaDois;
  
  let imagensSalvas = [ "w.jpg", "ws1.jpg", "ws2.jpg", "ws3.jpg", "ws4.jpg", "ws5.jpg", "ws6.jpg", "ws7.jpg", "ws8.jpg", "ws9.jpg", "ws10.jpg", "ws11.jpg"];
  let imagens = imagensSalvas.concat(imagensSalvas);
  
  imagens = embaralhar(imagens);
  for (carta of cartas){
    abrir(carta);
  }
  
  setTimeout(function () {
    iniciarJogada();
  }, 0);