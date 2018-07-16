var marginY = 0;
var destination = 0;
var speed = 1;
var fator = .18;
var scroller = null;

function initScroll(elementId) {
	destination = document.getElementById(elementId).offsetTop;

	scroller = setTimeout(function () {
		initScroll(elementId);
	}, 1);

	marginY = marginY + speed;
	speed += .1;
	/*fator *= 1.8;
  
	if(speed >= 10){
		 speed *= .1;
		 fator = speed;
	  }*/

	if (marginY >= destination) {
		clearTimeout(scroller);
	}

	window.scroll(0, marginY);

	console.log(fator);
}

window.onscroll = function () {
	marginY = this.pageYOffset;
};

function toTop() {
	scroller = setTimeout(function () {
		toTop();
	}, 1);

	marginY = marginY - speed;

	if (marginY <= 0) {
		clearTimeout(scroller);
	}

	window.scroll(0, marginY);
}

function scroll() {
	jQuery.extend(jQuery.easing, { easeInOutExpo: function (e, f, a, h, g) { if (f == 0) { return a } if (f == g) { return a + h } if ((f /= g / 2) < 1) { return h / 2 * Math.pow(2, 10 * (f - 1)) + a } return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a } });
}

/*

function me(_tab, n, profundidade, t,posicao, fator){
  var solucao = 0;
  var ftAux = fator;

  _tab[posicao] = (t == -1) ? simb_ia : simb;

  marcados[posicao] = 1;
  ++q_marc;
  solucao = verifica_sol(_tab[0],n,3);
  if(solucao == 1 || solucao == 2){
      _tab[posicao] = vazio;
      marcados[posicao] = 0;
      --q_marc;
      return profundidade + fator;
  }else{
      if(q_marc == n){// em caso de empate
          return profundidade + fator; 
      }

      t *= -1;
      
      var result = 0;

      for(i = 0;i < n;++i){// deep
          if(_tab[i] == vazio){// existe a posicao (i + 1) vazia?
              //avalia solucao nesta posicao e atualiza fator
              result = me(_tab,n, profundidade + 1, t, i, fator);
              _tab[i] = vazio;
              marcados[i] = 0;
              --q_marc;

              if(t == -1){//minimizacao
                  if(result < ftAux){
                      ftAux = result;
                  }
              }else{
                  if(result > ftAux){
                      ftAux = result;
                  }
              }
              
          }     
      }

      _tab[posicao] = vazio;
      
      marcados[posicao] = 0;
      --q_marc;
  }

  
  return ftAux;
  
}

function vme(turno){
  
      var menor = 10;
      var fator = -10;
      var result = 0;
      var posicao = 0;
      var tab = played;
      //int n = todos.size();
      
      for( i = 0;i < n;++i){
          if(tab[i] == vazio){
              result = me(tab,tab.length,1,turno,i,fator);// i = posicao a ser avaliada
  
              if(result < menor){
                  menor = result;
                  posicao = i;
              }
          }
      }
  
      return posicao;
  }
*/

