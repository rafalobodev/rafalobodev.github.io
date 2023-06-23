var jog,dirxJ,diryJ,velJ,pjx,pjy;//dirxJ e Y:direção x e y do jogador variaveis,jog=jogador,velj:velocidade, pjx e y: posição jogador
var ptjx,ptjy,veltj;//veltj=velocidade tiro jogador
var velB;//velocidade bomba(variaveis definidas aqui)
var jogo=true;//true iniciaria o jogo
var frames;//request animation frame para receber controle loop principal
var tamTelaW,tamTelaH;//variaveis incializar tela,,tamtelaw=tamanho tela largura
var freqCriaBomba;//frequencia que cria as bombas
var iec,iea,isom;//indice de explosão bomba q cai no chão e ar e indice som id
var vidaPlaneta,barraPlaneta;//vida do planeta,,barra de vida do planeta var
var contBombas,painelContBombas;//contbombas=contagem bombas,,painel conta as bombas
var tmpCriaIni;
var telaMsg;//variavel das telas msg iniciar jogo e vitoria

function teclaDw(){/*tecla para movimentar o jogo-Dw:tecla pressionada */
	var tecla=event.keyCode;/*keycode evento para ativar as teclas do teclado */
	if(tecla==38){//Cima,,se para cima 
		diryJ=-1;//cima é negativo
	}else if(tecla==40){//Baixo,, se não baixo..
		diryJ=1;//baixo positivo
	}
	if(tecla==39){//Direita,, cada numero equivale a tecla ver na net qual tecla 
		dirxJ=1;//direita positivo
	}else if(tecla==37){//Esquerda
		dirxJ=-1;//esquerda negativo
	}
	if(tecla==32){//Espaço - Tiro
		atiraJ(pjx+17,pjy);/*ato de atirar, posicionamento x e y jogador,,17 fica mais a esquerda a nave? */
	}
}
function teclaUp(){/*tecla para movimentar o jogo- interceptar as teclas-up: tecla liberada */
	var tecla=event.keyCode;
	if((tecla==38)||(tecla==40)){//Cima, baixo
		diryJ=0;/*se ir cima ou baixo =direção y jogador 0,para a movimentação ao saltar a tecla*/
	}
	if((tecla==39)||(tecla==37)){//Direita, esquerda
		dirxJ=0;
	}
}

/*------------------------------------botoes controlam a nave------------------------------------------------- */
function moverCima() {
    diryJ = -1;
}

function moverBaixo() {
    diryJ = 1;
}

function moverEsquerda() {
    dirxJ = -1;
}

function moverDireita() {
    dirxJ = 1;
}

function pararMovimento() {
	dirxJ = 0;
	diryJ = 0; 
}


function atirarK() {
	var tiro = document.createElement("div");
	var som=document.createElement("audio");
	var attClass = document.createAttribute("class");
	var attStyle = document.createAttribute("style");
	var att3=document.createAttribute("src");/*atributo 3 src aponta a imagem */
	var att4=document.createAttribute("id");
	
	attClass.value = "tiroJog";
	attStyle.value = "top:" + pjy + "px;left:" + pjx + "px;";//"top:" + pjy + "px;left:" + pjx + "px;"
	att3.value="tiro.wav?"+new Date();
	att4.value="som"+isom;
	
	som.setAttributeNode(att3);
	som.setAttributeNode(att4);
	tiro.appendChild(som);
	tiro.setAttributeNode(attClass);
	tiro.setAttributeNode(attStyle);
	
	document.body.appendChild(tiro);
	document.getElementById("som"+isom).play();
	isom++;
  }
/*------------------------------------------------------------------------------------- */

function criaBomba(){//criar a bomba caindo
	if(jogo){//if se o jogo estiver rolando cria a bom
		var x=Math.random()*tamTelaW;//posição aleatoriamente q a bomba cai*tamanho largura da tela
		var y=0;//posição 0 y para colocar bomba la emcima
		var bomba=document.createElement("div");//criando a variavel bomba em si como 'div'
		var att1=document.createAttribute("class");//classe da bomba
		var att2=document.createAttribute("style");//estilo css dela
		att1.value="bomba";//valores do atributo
		att2.value="top:"+y+"px;left:"+x+"px;";//fica no topo +y+pixel;left:esquerda recebe x + pixel
		bomba.setAttributeNode(att1);//atribuindo dados a bomba do att1 e 2
		bomba.setAttributeNode(att2);//appendChild()insere element filho(children) ao pai(parent)auxilia criação DOM(acesso html body)
		document.body.appendChild(bomba);//usa body (melhor q container) na deletação das bombas
		contBombas--;//contagem das bombas-- 'var' subtrair cada bomba que é criada
		painelContBombas.innerHTML="Contagem de Bombas: " + contBombas;/*tentando mudar a cor*/
	}
}

function controlaBomba(){//function controlar a bomba direção abaixo
	var bombas=document.getElementsByClassName("bomba");//variavel bombas armazena bombas
	var tam=bombas.length;//length para retornar quantas bombas tem
	for(var i=0;i<tam;i++){//enquanto i for menor q tam'quantidade bombas',,percorre array bombas
		if(bombas[i]){//se a bomba existir
			var pi=bombas[i].offsetTop;//pi indice bomba recebe bombas no topo offsettop posição
			pi+=velB;//pi:encrementa posição + velocidade bomba
			bombas[i].style.top=pi+"px";//style.top recebe pi(guarda a posição da bomba)+ px pixel
			if(pi>tamTelaH){//se a pi posição bomba > telah:altura tela tira vida do planeta 
				vidaPlaneta-=10;//tira 10 de vida do planeta ao atingir o chão 
				criaExplosaoChao(bombas[i].offsetLeft);//cria explosão chão usa leaft e nao precisa o top pq ja ta definido na função
				//document.body.removeChild(bombas[i]);
				bombas[i].remove();//explode a bomba ao cair nesta posição
			}			
		}
	}
}

function atiraJ(x,y){/*x e y para a ação atirar acompanhar a nave*/ 
	var t=document.createElement("div");/*div do tiro */
	var som=document.createElement("audio");
	var att1=document.createAttribute("class");/*cria o atributo class p formatação div */
	var att2=document.createAttribute("style");/*atributo por style */
	var att3=document.createAttribute("src");/*atributo 3 src aponta a imagem */
	var att4=document.createAttribute("id");
	att1.value="tiroJog";/*att1 recebe getElementsByClassName tirojogo */
	att2.value="top:"+y+"px;left:"+x+"px;";/*posicionamento top recebe y + pixel... */
	att3.value="tiro.wav?"+new Date();
	att4.value="som"+isom;
	t.setAttributeNode(att1);/*t recebe att1... */
	t.setAttributeNode(att2);/*adiciona um atributo */
	som.setAttributeNode(att3);
	som.setAttributeNode(att4);
	t.appendChild(som);
	document.body.appendChild(t);/*colocar na tela anexar t de tiro */
	document.getElementById("som"+isom).play();
	isom++;
}
function controlaJogador(){//posição jogador movimento
	pjy+=diryJ*velJ;//posição do jogadory e abaixo x . velocidade jogador
	pjx+=dirxJ*velJ;// x
	jog.style.top=pjy+"px";//posição css nave do jogador
	jog.style.left=pjx+"px";//posicionamento da tela jog jogador
}

function controlaTirosJogador(){//controle do tiro jogador movimento ...
	var tiros=document.getElementsByClassName("tiroJog");//obter elementos da class do css tirojogo coloca na var
	var tam=tiros.length;//quantidade de tiros com lenght
	for(var i=0;i<tam;i++){//usa o for loop para fazer controle deslocamento direção movimento, quando sai da tela remove o tiro
		if(tiros[i]){//verifica se tiro existe
			var pt=tiros[i].offsetTop;//pt=posição tiro, armazena posição do tiro,,offsettop= tiro vai deslocar para cima apenas
			pt-=veltj;//velocidade do tiro
			tiros[i].style.top=pt+"px";//tiro recebe top=para subir para cima px=pixel
			colisaoTiroBomba(tiros[i]);//coloca function colisão tiro bomba(tiro) em ação.
			if(pt<0){//se tiro for menor q 0 ele é removido
				//document.body.removeChild(tiros[i]);//outra forma de remover se quiser
				tiros[i].remove();// ele é removido quando chega a 0 ou chegar no topo, para não ficar acumulando
			}			
		}
	}
}

function colisaoTiroBomba(tiro){//função para tiro acertar a bomba,,tiro: fica como parametro
	var bombas=document.getElementsByClassName("bomba");
	var tam=bombas.length;//tamanho das bombas
	for(var i=0;i<tam;i++){//para ao tocar tiro na bomba
		if(bombas[i]){//se bomba existir abaixo...
			//TESTES DE COLISÃO  -- calculos baixo causarão o tiro na bomba
			if(
				(
					(tiro.offsetTop<=(bombas[i].offsetTop+40))&&//Cima tiro com baixo bomba,,se tiro atingiu a bomba top 40=tamanho da bomba ponta da bomba
					((tiro.offsetTop+6)>=(bombas[i].offsetTop))//Baixo tiro com cima bomba
				)//+6=tamanho do tiro a parte de baixo,offsettop de cima para baixo invertido,
				&&//e
				(				
					(tiro.offsetLeft<=(bombas[i].offsetLeft+24))&&//Esquerda tiro direita bomba,,+24=largura do tiro+parte direita
					((tiro.offsetLeft+6)>=(bombas[i].offsetLeft))//Direita tiro esquerda bomba
				)
			){
				//console.log("colidiu");
				criaExplosaoAr(bombas[i].offsetLeft-25,bombas[i].offsetTop);//criaExplosaoAr(o 'x' é bombas i.offset-25 para explosão sair corretamente ,'y' é offsetop)
				bombas[i].remove();//se houver colisão remover a bomba 
				tiro.remove();//e remover tiro

			}
		}
	}
} 

function criaExplosaoChao(x){//explosão chão ao tocar na terra recebe x apenas pq n esta no ar
	if(document.getElementById("ec"+(iec-1))){
		document.getElementById("ec"+(iec-1)).remove();
	}
	var ec=document.createElement("div");//elemento div explosão
	var img=document.createElement("img");//elemento imagem gif explosão
	var som=document.createElement("audio");//elemento audio explosão
	var att1=document.createAttribute("class");//atributos de indentificação da div 
	var att2=document.createAttribute("style");//att div
	var att3=document.createAttribute("id");//att div
	var att4=document.createAttribute("src");//atributo4 da imagem
	var att5=document.createAttribute("src");//atributo5 de audio
	var att6=document.createAttribute("id");//atributo de id do audio
	att1.value="explosaoChao";//att1 explosãoar class 
	att2.value="top:"+(tamTelaH-57)+"px;left:"+(x-17)+"px;";//top + tamanho da tela - '57 tamanho bomba',, x - '17descontar tamanho da bomba'
	att3.value="ec"+iec;//iec'indice de explosão chão' + ec 'explosão'
	att4.value="explosao_chao.gif?"+new Date();//gif explosão chão att4  imagem src,,coloca ? new date= para gif animação seja constante diferente para cada chamada
	att5.value="exp1.mp3?"+new Date();//coloca som audio exp1.mp3,,coloca ? new date= para gif animação seja constante
	att6.value="som"+isom;//indice som id som
	ec.setAttributeNode(att1);//atribuindo elementos abaixo adicionados
	ec.setAttributeNode(att2);
	ec.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	ec.appendChild(img);
	ec.appendChild(som);
	document.body.appendChild(ec);
	document.getElementById("som"+isom).play();
	iec++;//soma mais um
	isom++;//encrementa som
}

function criaExplosaoAr(x,y){//posição x e y da posição da bomba explodindo no ar pelo tiro
	if(document.getElementById("ea"+(iea-5))){//se a explosão existir pelo menos 5... 
		document.getElementById("ea"+(iea-5)).remove();//remove a explosão a 6 remove,, sempre tera pelo menos 5 explosoes.
	}//remove criado para não acumular  explosoes no javascript deixando jogo pesado com o tempo.
	var ea=document.createElement("div");//elemento div explosão
	var img=document.createElement("img");//elemento imagem gif explosão
	var som=document.createElement("audio");//elemento audio explosão
	var att1=document.createAttribute("class");//atributos de indentificação da div 
	var att2=document.createAttribute("style");//att div
	var att3=document.createAttribute("id");//att div
	var att4=document.createAttribute("src");//atributo4 da imagem
	var att5=document.createAttribute("src");//atributo5 de audio
	var att6=document.createAttribute("id");//atributo de id do audio
	att1.value="explosaoAr";//att1 explosãoar class 
	att2.value="top:"+(y-0)+"px;left:"+(x-0)+"px;";//x e y 0 ao atingir tiro explode px=pixel,, att2=style
	att3.value="ea"+iea;//explozao ar+indice de explosão no ar
	att4.value="explosao_ar.gif?"+new Date();//imagem exploxão coloca att4 src imagem,,coloca ? new date= para gif animação seja constante
	att5.value="exp1.mp3?"+new Date();//att5 coloca som
	att6.value="som"+isom;//id som
	ea.setAttributeNode(att1);//atribuindo elementos abaixo adicionados
	ea.setAttributeNode(att2);
	ea.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	ea.appendChild(img);// insere um elemento filho (children) ao elemento pai (parent) 
	ea.appendChild(som);//add som
	document.body.appendChild(ea);//add div no documento
	document.getElementById("som"+isom).play();//getelementbyid=captura o som, dando play no som
	iec++;//encrementa explosão
	isom++;//encrementa som msm som de ambas explosoes
}

function gerenciaGame(){
	barraPlaneta.style.width=vidaPlaneta+"px";//a medida que o planeta perde vida diminui a barra
	if(contBombas<=0){//se contbombas for menor ou igual a 0 jogador ganhou
		jogo=false;//coloca em false para jogo parar de funcionar ganhou game
		clearInterval(tmpCriaIni);//clearinterval=intervalo de criação bomba
		telaMsg.style.backgroundImage="url('vitoria.jpg')";//confg estilo da tela recebe imagemnome vitoria.jpg
		telaMsg.style.display="block";//mostrar pq ta css display:none.. display:block para mostrar a tela vitoria
	}
	if(vidaPlaneta<=0){//se a vida planeta menor que zero
		jogo=false;//jogo false acaba.. game over no jogo
		clearInterval(tmpCriaIni);//clearinterval=intervalo de criação bomba
		
		telaMsg.style.backgroundImage="url('derrota.jpg')";//mostra imagem derrota.. game over do jogo
		telaMsg.style.display="block";//display block para mostrar
	}
}

function gameLoop(){//request animation frame
	if(jogo){//funçoes de controle
		controlaJogador();//coloca no loop do game pra ele rodar, onde ja pode movimentar o jogador
		controlaTirosJogador();//coloca no gameloop a function controletiros jogador
		controlaBomba();//coloca no gameloop controle das bombas
	}
	gerenciaGame();//coloca function gerenciagame ra rodar no gameloop, para funcionar imagens e barra de vida
	frames=requestAnimationFrame(gameLoop);//gera o looping do game
}

function reinicia(){//reinicia function para jogar novamente 
	//RemoverBombasRestantes
	var bombas=document.getElementsByClassName("bomba");//pega var bomba
	var tam=bombas.length;//tamanho bombas total
	for(var i=0;i<tam;i++){//para 0=i i++
		if(bombas[i]){//se a bomba existe
			bombas[i].remove();//dar remove ,, remover as bombas
		}
	}
	for(var i=0;i<tam;i++){
		if(bombas[i]){//se reiniciar...
			bombas[i].remove();//remove as bombas do jogo
		}
	}

	telaMsg.style.display="none";//ocultar a tela de msg
	clearInterval(tmpCriaIni);
	cancelAnimationFrame(frames);//cancelar frames animaçoes tbm
	vidaPlaneta=350;//volta a vida do planeta a 300 max,,diminuindo e aumentando aqui a barra aumente ou diminui em total 300
	pjx=tamTelaW/2;//posição jogador volta no meio da tela,, telawdividida por 2
	pjy=tamTelaH/2;//posição y no centro tbm
	jog.style.top=pjy+"px";//posição
	jog.style.left=pjx+"px";
	velB=3;//velocidade bomba
	contBombas=50;
	freqCriaBomba=1700;
	jogo=true;
	tmpCriaIni=setInterval(criaBomba,freqCriaBomba);//intervalo de tempo q cria a bomba
	gameLoop();//coloca a function para inicializar no caso reiniciar
}

function inicia(){//inicializar o game
	jogo=false;//jogo false começar jogo parado inicialmente

	//Inicializações do game
	tamTelaW=window.innerWidth;//incializaçoes da tela,,variavel guarda distancimento da tela largura
	tamTelaH=window.innerHeight;//
	vidaPlaneta=350;//quantidade hp vida planeta tem
	barraPlaneta=document.getElementById("barraPlaneta");//barra planeta q ta no html do jogo
	barraPlaneta.style.width=vidaPlaneta+"px";//style csss barraplaneta. largura recebe vidaplaneta+pixel
	painelContBombas=document.getElementById("contBombas");
	telaMsg=document.getElementById("telaMsg");//associação da tela div dentro da variavel ta oculta
	document.getElementById("btnJogar").addEventListener("click",reinicia);//botão jogar click reiniciar addevent
	telaMsg.style.backgroundImage="url('intro.png')";//tela de introdução img 
	telaMsg.style.display="block";//muda display none( retira o elemento do layout da página.) para block(rendeziza como bloco)
	
	//Inicializações do jogador
	dirxJ=diryJ=0;//começa neutro no jogo sem se movimentar
	pjx=tamTelaW/2;//coloca jogador no meio da tela dividindo por 2 altura e largura
	pjy=tamTelaH/2;//altura
	velJ=5;//velocidade do jogador
	jog=document.getElementById("naveJog");//conecta com id da nave jogador
	jog.style.top=pjy+"px";//posiciona a nave jogador
	jog.style.left=pjx+"px";//posiciona

	//Inicializações do tiro do jogador
	ptjx=ptjy=0;
	veltj=5;//velocidade do tiro do jogador é 5 no caso

	//Inicializações das Bombas
	velB=3;//velocidade da bomba 3
	contBombas=50;//contagem 150 bombas no total
	freqCriaBomba=1700;//variavel frequencia criação de bombas
	tmpCriaIni=setInterval(criaBomba,freqCriaBomba);//intervalo de tempo q cria a bomba setinterval
	painelContBombas.innerHTML="Contagem de Bombas: "+contBombas;

	//Inicializações da explosão de chão e ar
	iec=iea=isom=0;//indice de explosão e som inicia com 0
}

window.addEventListener("load",inicia);//event para chamar o inicia do jogo
document.addEventListener("keydown",teclaDw);/*cria o evento de clique segurar botoes */
document.addEventListener("keyup",teclaUp);/*e de soltar o botão evento */