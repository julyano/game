//var teste3 = require('funcoes.js');
var turn = 1;
var played = [];// guarda todos os elementos clickados
var elementsX = [];//
var elementsO = [];
var todosEl = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];// representa todos os elementos

var line1 = [1,2,3,4,5,6];
var line2 = [7,8,9,10,11,12];
var line3 = [13,14,15,16,17,18];
var col1 = [1,2,7,8,13,14];
var col2 = [3,4,9,10,15,16];
var col3 = [5,6,11,12,17,18];
var diag1 = [1,2,9,10,17,18];
var diag2 = [5,6,9,10,13,14];

var tabuleiro = [line1,line2,line3,col1,col2,col3,diag1,diag2];

var line1X = 0;// representa a quantidade de X marcados na linha 1
var line2X = 0;
var line3X = 0;
var diag1X = 0;
var diag2X = 0;
var col1X = 0;
var col2X = 0;
var col3X = 0;
var sol = 0;

var line1O = 0;
var line2O = 0;
var line3O = 0;
var diag1O = 0;
var diag2O = 0;
var col1O = 0;
var col2O = 0;
var col3O = 0;
var sol = 0;

var _vx = 0;
var _vo = 0;

/*var simb_ia = 0;
var simb = 1;
var tab = [0,0,0,0,0,0,0,0,0];
var marcados = [0,0,0,0,0,0,0,0,0];
*/
function eventBox(id) {
  var _id = id - 1;

  var x = animationX(id);

  var box1 = x[0];
  var box2 = x[1];

  var id_ia;
  var _id_ia;

  if(turn == 1){    
    if(played.indexOf(id) <= -1){
      played.push(id);
      document.querySelector('.box' + _id).onclick = box1.play();
      document.querySelector('.box' + id).onclick = box2.play();
      
      sol = verificaSolucaoX(id);
      var vitoria = document.getElementById('vitoria');
      var vx = document.getElementById('vx');
      var vo = document.getElementById('vo');
      
      if(sol == 1){
        vitoria.innerHTML = '\'X\' ganhou';
        ++_vx;
        var aux_x = ""+_vx;
        vx.innerHTML = aux_x;
        vitoria.opacity = 50;
      }
      
      if(played.length <= 8 && sol != 1){
        do {
          id_ia = Math.floor((Math.random() * 17) + 1);
          if(id_ia % 2 != 0) id_ia += 1;//se for impar, transforma para par
        } while (played.indexOf(id_ia) > -1);
        
        played.push(id_ia);
        _id_ia = id_ia - 1;

        var o = animationO(id_ia);

        var box3 = o[0];  
        var box4 = o[1];

        changeColorElement(document.querySelector('.box' + id_ia));
        changeColorElement(document.querySelector('.box' + _id_ia));

        document.querySelector('.box' + _id_ia).onclick = box3.play();
        document.querySelector('.box' + id_ia).onclick = box4.play();  
        
        sol = verificaSolucaoO(id_ia);
        if(sol == 2){
          vitoria.innerHTML = '\'O\' ganhou';
          ++_vo;
          var aux_o = ""+_vo;
          vo.innerHTML = aux_o;
          vitoria.opacity = 50;
        }
      }

      if(played.length == 9 && sol != 2 && sol != 1){
        vitoria.innerHTML = 'Empate';
        vitoria.opacity = 50;
      }
    }
  }
};

function changeColorOver(id){
  var el1 = document.querySelector('.box'+(id-1));
  el1.style.opacity = 0.5;

  var el2 = document.querySelector('.box'+id);
  el2.style.opacity = 0.5;
}

function changeColorOut(id){
  var el1 = document.querySelector('.box'+(id-1));
  el1.style.opacity = 80;

  var el2 = document.querySelector('.box'+id);
  el2.style.opacity = 80;
}

function changeColorElement(el){
  el.style.backgroundColor = "#CBCBCB";
}

function verificaSolucaoX(id){
  elementsX.push(id);
  
  elementsX.forEach(function(element) {
    if(element == 2 || element == 4 || element == 6) ++line1X;
    if(line1X == 3){
      mostrarSol(tabuleiro[0]);
      sol = 1;
      return sol;
    } 
    if(element == 8 || element == 10 || element == 12) ++line2X;
    if(line2X == 3) {
      mostrarSol(tabuleiro[1]);
      sol = 1;
      return sol;
    } 
    if(element == 14 || element == 16 || element == 18) ++line3X;
    if(line3X == 3) {
      mostrarSol(tabuleiro[2]);
      sol = 1;
      return sol;
    } 



    if(element == 2 || element == 10 || element == 18) ++diag1X;
    if(diag1X == 3) {
      mostrarSol(tabuleiro[6]);
      sol = 1;
      return sol;
    } 
    if(element == 6 || element == 10 || element == 14) ++diag2X;
    if(diag2X == 3) {
      mostrarSol(tabuleiro[7]);
      sol = 1;
      return sol;
    } 

    if(element == 2 || element == 8 || element == 14) ++col1X;
    if(col1X == 3) {
      mostrarSol(tabuleiro[3]);
      sol = 1;
      return sol;
    } 
    if(element == 4 || element == 10 || element == 16) ++col2X;
    if(col2X == 3) {
      mostrarSol(tabuleiro[4]);
      sol = 1;
      return sol;
    } 
    if(element == 6 || element == 12 || element == 18) ++col3X;
    if(col3X == 3) {
      mostrarSol(tabuleiro[5]);
      sol = 1;
      return sol;
    } 
  }, this);

  line1X = 0;
  line2X = 0;
  line3X = 0;
  diag1X = 0;
  diag2X = 0;
  col1X = 0;
  col2X = 0;
  col3X = 0;

  return sol; 
}

function verificaSolucaoO(id){
  elementsO.push(id);
  
  elementsO.forEach(function(element) {
    if(element == 2 || element == 4 || element == 6) ++line1O;
    if(line1O == 3) {
      mostrarSol(tabuleiro[0]);
      sol = 2;
      return sol;
    } 
    if(element == 8 || element == 10 || element == 12) ++line2O;
    if(line2O == 3) {
      mostrarSol(tabuleiro[1]);
      sol = 2;
      return sol;
    } 
    if(element== 14 || element == 16 || element == 18) ++line3O;
    if(line3O == 3) {
      mostrarSol(tabuleiro[2]);
      sol = 2;
      return sol;
    } 

    if(element == 2 || element == 10 || element == 18) ++diag1O;
    if(diag1O == 3) {
      mostrarSol(tabuleiro[6]);
      sol = 2;
      return sol;
    } 
    if(element == 6 || element == 10 || element == 14) ++diag2O;
    if(diag2O == 3) {
      mostrarSol(tabuleiro[7]);
      sol = 2;
      return sol;
    } 

    if(element == 2 || element == 8 || element == 14) ++col1O;
    if(col1O == 3) {
      mostrarSol(tabuleiro[3]);
      sol = 2;
      return sol;
    } 
    if(element == 4 || element == 10 || element == 16) ++col2O;
    if(col2O == 3) {
      mostrarSol(tabuleiro[4]);
      sol = 2;
      return sol;
    } 
    if(element == 6 || element == 12 || element == 18) ++col3O;
    if(col3O == 3) {
      mostrarSol(tabuleiro[5]);
      sol = 2;
      return sol;
    } 
  }, this);

  line1O = 0;
  line2O = 0;
  line3O = 0;
  diag1O = 0;
  diag2O = 0;
  col1O = 0;
  col2O = 0;
  col3O = 0;

  return sol; 
}

function mostrarSol(array){
  
  for(i = 0;i < todosEl.length;++i){    
    if(array.indexOf(i+1) <= -1 ){
      var element = document.querySelector('.box' + (i+1));
      element.style.opacity = 0.2;
      element.style.pointerEvents = 'none';            
    }
  }
}

function novoJogo() {
  var els = document.querySelectorAll('#tabuleiro .box');
  var els_len = els.length;
  var parent;
  var idx = 1;
  for(i = 1;i <= els_len;++i){
    if(i == 7 || i == 13) ++idx;
    var el = document.getElementById('box'+i);
    parent = document.getElementById('line'+idx); 
    parent.removeChild(el);
    
  }

  idx = 1;
  var name = 0;

  for(j = 1;j <= els_len;++j){      
    if(j == 7 || j == 13) ++idx;
    var div = document.createElement('div');
    div.id = 'box'+j;
    div.className = 'box box'+j+' gmd-3';  
    var atts = []; 

    if(j % 2 == 0){
      var att1 = document.createAttribute("onclick");
      att1.value = "eventBox("+j+")";
      atts.push(att1);
      var att2 = document.createAttribute("name");
      att2.value = name;
      atts.push(att2);
      ++name;
    }    
    var att3 = document.createAttribute("onmouseover");
    att3.value = "changeColorOver("+j+")";
    var att4 = document.createAttribute("onmouseout");
    att4.value = "changeColorOut("+j+")";  
    atts.push(att3);
    atts.push(att4);

    atts.forEach(function(att) {
      div.setAttributeNode(att);
    }, this);
    
    document.getElementById("line"+idx).appendChild(div);
    
  }
  
  init();
}

function init(){
  var els = document.querySelectorAll('#tabuleiro .box');
  var box = defaultValues(els);
  box.play();
  varDefaultValues();
}

function novoJogo4(){
  var els = document.querySelectorAll('#tabuleiro .box');
  var box = defaultValues(els);
  box.play();
}

function varDefaultValues(){
  document.getElementById('vitoria').innerHTML = 'Placar: ';
  played = [];
  elementsX = [];
  elementsO = [];

  line1X = 0;
  line2X = 0;
  line3X = 0;
  diag1X = 0;
  diag2X = 0;
  col1X = 0;
  col2X = 0;
  col3X = 0;
  
  line1O = 0;
  line2O = 0;
  line3O = 0;
  diag1O = 0;
  diag2O = 0;
  col1O = 0;
  col2O = 0;
  col3O = 0;
  sol = 0;

}


function defaultValues(el){
  var box = anime({
    targets: el,
    backgroundColor: '#4CAF50',
    delay: 20,
    duration: '1000',
    width: '50px',
    height: '50px',
    translateX: [
      { value: 0, duration: 500 },
    ],
    rotate: '0turn',
    opacity: 80,
    borderRadius: '5%',
    autoplay: false
  });

  return box;
}

function animationX(id){
  var x = [];
  var box1 = anime({
    targets: 'div.box.box' + (id-1),
    delay: 20,
    duration: '1000',
    width: '10px',
    height: '50px',
    translateX: [
      { value: 20.20, duration: 50 },
    ],
    translateY: [
      { value: 0, duration: 50 },
    ],
    rotate: '.1turn',
    borderRadius: '5%',
    autoplay: false
  });

  var box2 = anime({
    targets: 'div.box.box' + id ,
    delay: 20,
    duration: '1000',
    width: '10px',
    height: '50px',
    translateX: [
      { value: 20.20, duration: 50 },
    ],
    translateY: [
      { value: 0, duration: 50 },
    ],
    rotate: '-.1turn',
    borderRadius: '5%',
    autoplay: false
  });

  x = [box1,box2];
  return x;
}

function animationO(id_ia){
  var o = [];
  var box3 = anime({
    targets: 'div.box.box' + (id_ia - 1),
    delay: 20,
    duration: '1000',
    width: '50px',
    height: '50px',
    translateX: [
      { value: 0, duration: 50 },
    ],
    rotate: '10turn',
    borderRadius: '100%',
    autoplay: false
  });

  var box4 = anime({
    targets: 'div.box.box' + id_ia,
    delay: 20,
    duration: '1000',
    width: '50px', 
    height: '50px',     
    translateX: [
      { value: 0, duration: 50 },
    ],
    rotate: '-10turn',
    borderRadius: '100%',
    autoplay: false
  });

  o = [box3,box4];
  return o;
}


function show(){
  console.log('PLAYED = '+played);
  console.log('ELX = '+elementsX);
  console.log('ELO = '+elementsO);
}