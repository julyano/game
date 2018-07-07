//var anime = require('./funcoes.js');
var turn = 1;
var played = [];


    function eventBox(id) {
      var _id = id - 1;
      console.log('EVENT turn = ' + turn);
      console.log('EVENT _id = ' + _id);
      console.log('EVENT id = ' + id);

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

      var box3 = anime({
        targets: 'div.box.box' + _id,
        delay: 100,
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
        targets: 'div.box.box' + id,
        delay: 100,
        duration: '1000',        
        translateX: [
          { value: 0, duration: 50 },
        ],
        rotate: '-10turn',
        borderRadius: '100%',
        autoplay: false
      });

      if (turn == 1) {
       /* box1[rotate] = '.1turn';
        box1.borderRadius = '0%';
        console.log('EVENT box object = ' + box1.targets);
        box1.play();

        box2.rotate = '-.1turn';
        box2.borderRadius = '0%';
        console.log('EVENT box object = ' + box2.targets);
        box2.play();*/

        
        var teste1 = played.indexOf(id);
        console.log('elemento = ' + teste1);
        if(teste1 <= -1){
          played.push(id);
          document.querySelector('.box' + _id).onclick = box1.play();
          document.querySelector('.box' + id).onclick = box2.play();
          turn *= -1;
          console.log('id ' + id + 'NAO ja existe');
        }else{          
          console.log('id ' + id + 'ja existe');
        }

      } else {
        /*box1.translateX = [
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

        var teste2 = played.indexOf(id);
        console.log('elemento = ' + teste2);
        if(teste2 <= -1){
          played.push(id);
          document.querySelector('.box' + _id).onclick = box3.play();
          document.querySelector('.box' + id).onclick = box4.play();
          turn *= -1;
          console.log('id ' + id + 'NAO ja existe');
        }else{          
          console.log('id ' + id + 'ja existe');
        }

      }

      

    };

    function teste(t) {
      t += 1;
      console.log('t = ' + t);
    };
