//var teste3 = require('funcoes.js');
var turn = 1;
var played = [];


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

        document.querySelector('.box' + _id_ia).onclick = box3.play();
        document.querySelector('.box' + id_ia).onclick = box4.play();          
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

function changeColorOver(el){
  el.style.opacity = 100;
}

function changeColorOut(el){
  el.style.opacity = 0.5;
}