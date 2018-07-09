//var teste3 = require('funcoes.js');
var turn = 1;
var played = [];
var elementsX = [];
var elementsO = [];
var todosEl = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

var line1 = [1,2,3,4,5,6];
var line2 = [7,8,9,10,11,12];
var line3 = [13,14,15,16,17,18];
var col1 = [1,2,7,8,13,14];
var col2 = [3,4,9,10,15,16];
var col3 = [5,6,11,12,17,18];
var diag1 = [1,2,9,10,17,18];
var diag2 = [5,6,9,10,13,14];
var tabuleiro = [line1,line2,line3,col1,col2,col3,diag1,diag2];

var line1X = 0;
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


function eventBox(id) {
  var _id = id - 1;

  var box1 = anime({
    targets: 'div.box.box' + _id,
    delay: 20,
    duration: '1000',
    width: '20px',
    translateX: [
      { value: 40, duration: 500 },
    ],
    rotate: '.1turn',
    borderRadius: '0%',
    autoplay: false
  });

  var box2 = anime({
    targets: 'div.box.box' + id,
    delay: 20,
    duration: '1000',
    width: '20px',
    translateX: [
      { value: 40, duration: 50 },
    ],
    rotate: '-.1turn',
    borderRadius: '0%',
    autoplay: false
  });

  var id_ia;
  var _id_ia;
  console.log('EVENT _id = ' + _id);
  console.log('EVENT id = ' + id);

  if(turn == 1){
    if(played.indexOf(id) <= -1){
      played.push(id);
      console.log('marcados = '+played);
      document.querySelector('.box' + _id).onclick = box1.play();
      document.querySelector('.box' + id).onclick = box2.play();
      
      sol = verificaSolucaoX(id);
      console.log('SOL = '+sol);
      var vitoria = document.getElementById('vitoria');
      var btnstart = document.getElementById('btnstart');
      
      if(sol == 1){
        vitoria.innerHTML = 'X ganhou';
        vitoria.opacity = 50;
      }
      
      
      /*
      document.querySelector('#reverseAnim .reverse').onclick = function() {
          reverseAnim.play();
          reverseAnim.reverse();
        }
      */
      //turn *= -1;
      if(played.length <= 8){
        id_ia = Math.floor((Math.random() * 17) + 1);
        console.log('id_ia = '+id_ia);
        if(id_ia % 2 != 0) id_ia += 1;//se for impar, transforma para par

      while( played.indexOf(id_ia) > -1 ){//enquanto for id repetido
          id_ia = Math.floor((Math.random() * 17) + 1);//gera novo id
          if(id_ia % 2 != 0) id_ia += 1;//se for impar, transforma para par
        }  
        
        played.push(id_ia);
        console.log('marcados = '+played);
        _id_ia = id_ia - 1;

        console.log('id_ia = '+id_ia);
        console.log('_id_ia = '+_id_ia);

        var box3 = anime({
          targets: 'div.box.box' + _id_ia,
          delay: 20,
          duration: '1000',
          width: '100px',
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
          width: '100px',      
          translateX: [
            { value: 0, duration: 50 },
          ],
          rotate: '-10turn',
          borderRadius: '100%',
          autoplay: false
        });

        changeColorElement(document.querySelector('.box' + id_ia));
        changeColorElement(document.querySelector('.box' + _id_ia));

        document.querySelector('.box' + _id_ia).onclick = box3.play();
        document.querySelector('.box' + id_ia).onclick = box4.play();  
        
        sol = verificaSolucaoO(id_ia);
        if(sol == 2){
          vitoria.innerHTML = 'O ganhou';
          vitoria.opacity = 50;
        }
  
        if(played.length == 9){
          vitoria.innerHTML = 'Empate';
          vitoria.opacity = 50;
        }
        //turn *= -1;
      }
    }else{          
      console.log('id ' + id + 'ja existe');
    }
  }
  /*else {
    box1.translateX = [
      { value: 0, duration: 500 },
    ];
    box1.rotate = '10turn';
    box1.borderRadius = '100%';
    console.log('EVENT box object = ' + box1.targets);
    box1.play();

    box2.translateX = [
      { value: 0, duration: 500 },
    ];
    box2.rotate = '-10turn';
    box2.borderRadius = '100%';
    console.log('EVENT box object = ' + box2.targets);
    box2.play();*/

    //var teste2 = played.indexOf(id);
    //console.log('elemento = ' + teste2);

    
  //}
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
  el.style.backgroundColor = "#C80A0D";
}

function verificaSolucaoX(id){
  elementsX.push(id);
  console.log('ELEMENTS = '+ elementsX);
  
  elementsX.forEach(function(element) {
    console.log('FOREACH = '+element);
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
    console.log('LINE = '+ line3X);
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
  console.log('ELEMENTS = '+ elementsO);
  
  elementsO.forEach(function(element) {
    console.log('FOREACH = '+element);
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
    console.log('LINE = '+ line3O);
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
      element.onclick = false;
    }
  }
}

function novoJogo(){

  if(sol != 0 || played.length == 9){
    var els = document.querySelectorAll('#tabuleiro .box');
    //els.onclick = true;
    for(i = 0;i < todosEl.length;++i){    
        var element = document.querySelector('.box' + (i+1));
        element.onclick = true;
    }
    var result = document.getElementById('vitoria');
    result.innerHTML = 'Resultado';
    
    var box = anime({
      targets: els,
      backgroundColor: '#465FC0',
      delay: 20,
      duration: '1000',
      width: '100px',
      translateX: [
        { value: 0, duration: 500 },
      ],
      rotate: '0turn',
      opacity: 80,
      borderRadius: '0%'  
    });

    box.play();

    played = [];
    elementsX = [];
    elementsO = [];

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

    console.log("turno = "+ turn);
    console.log("tabuleiro = "+ tabuleiro);
  }
  /*for(i = 0;i < todosEl.length;++i){  
    pointerEvents: 'auto' 
    var box1 = anime({
      targets: 'div.box.box' + (i+1),
      delay: 20,
      duration: '1000',
      width: '100px',
      translateX: [
        { value: 0, duration: 500 },
      ],
      rotate: '0turn',
      opacity: 80,
      borderRadius: '0%',
      pointerEvents: 'auto',
      autoplay: true
    });

    /*var element = document.querySelector('.box' + (i+1));
    element.style.opacity = 80;
    element.style.pointerEvents = 'auto';
}*/
}