//let teste3 = require('funcoes.js');
//<a href='https://br.freepik.com/vetores/projeto'>Projeto vetor criado por freepik - br.freepik.com</a>
let turn = 1;
let allPlays = [];// guarda todos os elementos clickados
let player = [];//
let opponent = [];

let allElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];// representa todos os elementos
let line1 = [1, 2, 3, 4, 5, 6];
let line2 = [7, 8, 9, 10, 11, 12];
let line3 = [13, 14, 15, 16, 17, 18];
let col1 = [1, 2, 7, 8, 13, 14];
let col2 = [3, 4, 9, 10, 15, 16];
let col3 = [5, 6, 11, 12, 17, 18];
let diag1 = [1, 2, 9, 10, 17, 18];
let diag2 = [5, 6, 9, 10, 13, 14];

let boardIds = [line1, line2, line3, col1, col2, col3, diag1, diag2];

let line1Player = 0;// representa a quantidade de X marcados na linha 1
let line2Player = 0;
let line3Player = 0;
let diag1Player = 0;
let diag2Player = 0;
let col1Player = 0;
let col2Player = 0;
let col3Player = 0;

let line1Opponent = 0;
let line2Opponent = 0;
let line3Opponent = 0;
let diag1Opponent = 0;
let diag2Opponent = 0;
let col1Opponent = 0;
let col2Opponent = 0;
let col3Opponent = 0;
var solution = 0;

let playerWins = 0;
let opponentWins = 0;
let empate = 0;

let symbolIA = 1;
let symbolPlayer = 2;
let board = [0,0,0,0,0,0,0,0,0];
let marcados = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let q_marc = 0;
let symbolEmpty = 0;

let principalScore = 100000;
let infinity = 1;

async function eventBox(id) {
  let _id = id - 1;

  let playerBrand = createPlayerAnimation(id);

  let id_ia;
  let _id_ia;

  if (turn == 1) {
    if (allPlays.indexOf(id) <= -1) {
      allPlays.push(id);
      document.querySelector('.box' + _id).onclick = playerBrand[0].play();
      document.querySelector('.box' + id).onclick = playerBrand[1].play();

      player.push(id);
      solution = await checkPlayerSolution().then((res) => res)

      player.forEach(clickedId => {
        const position = (clickedId / 2) - 1;
        board = replaceAt(board, position, symbolPlayer);
      });

      let victory = document.getElementById('victory');
      let _playerWins = document.getElementById('playerWins');
      let _opponentWins = document.getElementById('opponentWins');
      let versus = document.getElementById('versus');
      _playerWins.innerHTML = `${playerWins} `;
      versus.innerHTML = 'X ';
      _opponentWins.innerHTML = `${opponentWins} `;

      if (solution == 1) {
        victory.innerHTML = 'Você venceu!';
        _playerWins.innerHTML = `${++playerWins}`;
        victory.opacity = 50;
      }

      if (allPlays.length <= 8 && solution != 1) {

        if (allPlays.length <= 1) {
          do {
            id_ia = Math.floor((Math.random() * 17) + 1);
            if (id_ia % 2 != 0) id_ia += 1;//se for impar, transforma para par
          } while (allPlays.indexOf(id_ia) > -1);

          board = replaceAt(board, ((id_ia / 2) - 1) , symbolIA);
        } else {
          let melhorJogada = await findBestMove().then((res) => res);
          board = replaceAt(board, melhorJogada , symbolIA);
          id_ia = 2 * (melhorJogada + 1);
        }

        allPlays.push(id_ia);
        _id_ia = id_ia - 1;

        let opponentBrand = createOpponentAnimation(id_ia);

        await changeColorElement(document.querySelector('.box' + id_ia));
        await changeColorElement(document.querySelector('.box' + _id_ia));

        document.querySelector('.box' + _id_ia).onclick = await opponentBrand[0].play();
        document.querySelector('.box' + id_ia).onclick = await opponentBrand[1].play();

        if (playerWins >= opponentWins) {
          document.getElementById('ninja-img').src = '../assets/img/n4.png'; 
          setTimeout(function(){ 
            document.getElementById("ninja-img").src = '../assets/img/n3.png';
            //ninjaAnimation().play;
          }, 500);
        } else {
          document.getElementById('ninja-img').src = '../assets/img/n6.png'; 
          setTimeout(function(){ 
            document.getElementById("ninja-img").src = '../assets/img/n5.png';
            //ninjaAnimation().play;
          }, 500);
        }


        opponent.push(id_ia);
        solution = await checkOpponentSolution().then((res) => res);
        //let posicaoIA = await vme(-1).then((res) => res);
        
        if (solution == 2) {
          victory.innerHTML = 'O oponente venceu!';
          _opponentWins.innerHTML = `${++opponentWins}`;
          victory.opacity = 50;
        }
      }

      if (allPlays.length == 9 && solution != 2 && solution != 1) {
        victory.innerHTML = `${++empate} Empate`;
        _playerWins.innerHTML = '';
        _opponentWins.innerHTML = '';
        versus.innerHTML = '';
        victory.opacity = 50;
      }
    }
  }
};

/*function verifica_sol(tb) {
  let _posicao = 0;
  let linha1 = 0;
  let linha2 = 0;
  let linha3 = 0;
  let diagonal1 = 0;
  let diagonal2 = 0;
  let coluna1 = 0;
  let coluna2 = 0;
  let coluna3 = 0;
  let linha1ia = 0;
  let linha2ia = 0;
  let linha3ia = 0;
  let diag1ia = 0;
  let diag2ia = 0;
  let col1ia = 0;
  let col2ia = 0;
  let col3ia = 0;

  tb.forEach(function (_simb) {
    if (_simb == symbolIA) {
      if (_posicao == 0 || _posicao == 1 || _posicao == 2) ++linha1ia;

      if (linha1ia == 3) return symbolIA;

      if (_posicao == 3 || _posicao == 4 || _posicao == 5) ++linha2ia;

      if (linha2ia == 3) return symbolIA;

      if (_posicao == 6 || _posicao == 7 || _posicao == 8) ++linha3ia;

      if (linha3ia == 3) return symbolIA;

      if (_posicao == 0 || _posicao == 4 || _posicao == 8) ++diag1ia;

      if (diag1ia == 3) return symbolIA;

      if (_posicao == 2 || _posicao == 4 || _posicao == 6) ++diag2ia;

      if (diag2ia == 3) return symbolIA;

      if (_posicao == 0 || _posicao == 3 || _posicao == 6) ++col1ia;

      if (col1ia == 3) return symbolIA;

      if (_posicao == 1 || _posicao == 4 || _posicao == 7) ++col2ia;

      if (col2ia == 3) return symbolIA;

      if (_posicao == 2 || _posicao == 5 || _posicao == 8) ++col3ia;

      if (col3ia == 3) return symbolIA;
    }

    if (_simb == symbolPlayer) {
      if (_posicao == 0 || _posicao == 1 || _posicao == 2) ++linha1;

      if (linha1 == 3) return symbolPlayer;

      if (_posicao == 3 || _posicao == 4 || _posicao == 5) ++linha2;

      if (linha2 == 3) return symbolPlayer;

      if (_posicao == 6 || _posicao == 7 || _posicao == 8) ++linha3;

      if (linha3 == 3) return symbolPlayer;

      if (_posicao == 0 || _posicao == 4 || _posicao == 8) ++diagonal1;

      if (diagonal1 == 3) return symbolPlayer;

      if (_posicao == 2 || _posicao == 4 || _posicao == 6) ++diagonal2;

      if (diagonal2 == 3) return symbolPlayer;

      if (_posicao == 0 || _posicao == 3 || _posicao == 6) ++coluna1;

      if (coluna1 == 3) return symbolPlayer;

      if (_posicao == 1 || _posicao == 4 || _posicao == 7) ++coluna2;

      if (coluna2 == 3) return symbolPlayer;

      if (_posicao == 2 || _posicao == 5 || _posicao == 8) ++coluna3;

      if (coluna3 == 3) return symbolPlayer;
    }

    ++_posicao;
  }, this);

  return 0;
}*/

/*async function me(_tab, n, profundidade, t, posicao, fator) {
  let solucao = 0;
  let ftAux = fator;

  _tab = (t == -1) ? replaceAt(_tab, posicao, symbolIA) : replaceAt(_tab, posicao, symbolPlayer);

  marcados = replaceAt(marcados, posicao, 1);
  ++q_marc;
  solucao = verifica_sol(_tab);

  if (solucao == 1 || solucao == 2) {
    _tab = replaceAt(_tab, posicao, symbolEmpty);
    marcados = replaceAt(marcados, posicao, 0);
    --q_marc;

    if (solucao == 1) {
      return profundidade + fator;
    }

    if (solucao == 2) {
      return profundidade - fator;
    }
    
  } else {
    if (q_marc == n) {// em caso de empate
      return profundidade + fator;
    }

    t *= -1;

    let result = 0;

    for (let i = 0; i < n; ++i) {// deep
      if (_tab[i] == symbolEmpty) {// existe a posicao (i + 1) vazia?
        //avalia solucao nesta posicao e atualiza fator
        result = await me(_tab, n, profundidade + 1, t, i, fator).then((res) => res);
        _tab = replaceAt(_tab, i, symbolEmpty);
        marcados = replaceAt(marcados, i, 0);
        --q_marc;

        if (t === -1) {//minimizacao
          if (result < ftAux) {
            ftAux = result;
          }
        } else {
          if (result > ftAux) {
            ftAux = result;
          }
        }

      }
    }

    _tab = replaceAt(_tab, posicao, symbolEmpty);
    marcados = replaceAt(marcados, posicao, 0);
    --q_marc;
  }


  return ftAux;

}*/

/*async function vme(turno) {

  let menor = 10;
  let fator = -10;
  let result = 0;
  let posicao = 0;
  let tab = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  player.forEach(element => {
    const posx = (element / 2) - 1;
    tab = replaceAt(tab, posx, 2);//Object.assign([], tab, {posx: 2});
  });

  opponent.forEach(element => {
    const poso = (element / 2) - 1;
    tab = replaceAt(tab, poso, 1);
  });

  let vetor = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let tabaux = tab;

  for (let i = 0; i < vetor.length; i++) {
    if (tab[i] == symbolEmpty) {
      result = await me(tabaux, tabaux.length, 1, turno, i, fator).then((res) => res)// i = posicao a ser avaliada
      if (result < menor) {
        menor = result;
        posicao = i;
      }
    }
  }s

  return posicao;
}*/

function isMovesLeft() { 
	for (let i = 0; i < 9; ++i) 
			if (board[i] == symbolEmpty) 
				return true; 
	return false; 
} 

function evaluate() { 
	for (let row = 0; row < 7; row += 3) { 
		if (board[row] == board[row + 1] && 
			board[row + 1] == board[row + 2]){ 
			if (board[row] == symbolPlayer) 
				return +principalScore; 
			else if (board[row] == symbolIA) 
				return -principalScore; 
		} 
	} 

	for (let col = 0; col < 3; ++col){ 
		if (board[col]==board[col + 3] && 
			board[col + 3]==board[col + 6]){ 
			if (board[col] == symbolPlayer) 
				return +principalScore;
			else if (board[col] == symbolIA) 
				return -principalScore; 
		} 
	} 

	if (board[0] == board[4] && board[4] == board[8]){ 
		if (board[0] == symbolPlayer) 
			return +principalScore; 
		else if (board[0] == symbolIA) 
			return -principalScore; 
	} 

	if (board[2] == board[4] && board[4] == board[6]){ 
		if (board[2] == symbolPlayer) 
			return +principalScore; 
		else if (board[2] == symbolIA) 
			return -principalScore; 
	} 

	return 0; 
}

async function maxmin2(depth, isMin) { 
	let score = evaluate();
	let best = -infinity;
	let turnPlayer = symbolPlayer;

	if (score == principalScore) 
		return score + depth; 

	if (score == -principalScore) 
		return score - depth; 

	if (isMovesLeft() == false)
		return 0;

	if (isMin){ 
		best = infinity;
		turnPlayer = symbolIA;
	}

	for (let i = 0; i < 3; i++){ 
			if (board[i] == symbolEmpty){ 
				board = replaceAt(board, i, turnPlayer); 
        const compare = await maxmin(depth+1, !isMin).then((res) => res);
				best = (isMin)? Math.min(best, compare) : Math.max(best, compare);
				board = replaceAt(board, i, symbolEmpty); 
			} 
	}  
	
	return best; 
}

async function maxmin(depth, isMax) { 
	let score = evaluate();
	let best = infinity;
	let turnPlayer = symbolPlayer;

	if (score == principalScore) 
		return score - depth; 

	if (score == -principalScore) 
		return score + depth; 

	if (isMovesLeft() == false)
		return 0;

	if (isMax){ 
		best = -infinity;
		turnPlayer = symbolIA;
	}

	for (let i = 0; i < 9; ++i){ 
			if (board[i] == symbolEmpty){ 
				board = replaceAt(board, i, turnPlayer); 
        const compare = await maxmin(depth+1, !isMax).then((res) => res);
				best = (isMax)? Math.max(best, compare) : Math.min(best, compare);
				board = replaceAt(board, i, symbolEmpty); 
			} 
	}  
	
	return best; 
}

async function minimax(depth, isMax) { 
	let score = evaluate();
	let best = infinity;
	let turnPlayer = symbolIA;

	if (score == principalScore) 
		return score - depth; 

	if (score == -principalScore) 
		return score + depth; 

	if (isMovesLeft() == false)
		return 0;

	if (isMax){ 
		best = -infinity;
		turnPlayer = symbolPlayer;
	}

	for (let i = 0; i < 9; i++){ 
			if (board[i] == symbolEmpty){ 
				board = replaceAt(board, i, turnPlayer); 
        const compare = await minimax(depth+1, !isMax).then((res) => res);
				best = (isMax)? Math.max(best, compare) : Math.min(best, compare);
				board = replaceAt(board, i, symbolEmpty); 
			} 
	}  
	
	return best; 
}

async function findBestMove() { 
	let bestVal = infinity; 
  let maiorValorIA;
	let bestMove = -1;
  let bestMoveIA;
	let toMinimizer = false;

	for (let i = 0; i < 9; ++i){ 
      console.log('board[i] = ', board[i], ' POSICAO = ', i);
			if (board[i] == symbolEmpty){ 
				board = replaceAt(board, i, symbolIA);
				let moveVal = await minimax(0, toMinimizer).then((res) => res);
				board = replaceAt(board, i, symbolEmpty); 
        
        console.log('posicao = ', i, ' moveVal = ', moveVal);
        console.log('bestVal = ', bestVal);        

				if (moveVal <= bestVal){ 
					bestMove = i; 
					bestVal = moveVal; 
				} 

			} 
	}  

  //return bestMove; 
  maiorValorIA = bestVal;
  bestMoveIA = bestMove;
  //board = replaceAt(board, bestMoveIA, symbolIA);

  console.log('board = ', board);
  console.log('melhor jogada MAX = ', bestMove);

  //if (bestMove == -1) {
    bestVal = infinity; 
    for (let i = 0; i < 9; ++i){ 
			if (board[i] == symbolEmpty){ 
				board = replaceAt(board, i, symbolPlayer);
				let moveVal = await maxmin(0, toMinimizer).then((res) => res);
				board = replaceAt(board, i, symbolEmpty); 

				if (moveVal <= bestVal){ 
					bestMove = i; 
					bestVal = moveVal; 
				} 

			} 
	  }
    console.log('maiorValorIA = ', maiorValorIA);
    console.log('bestVal = ', bestVal);
    board = replaceAt(board, bestMoveIA, symbolEmpty);
    if (maiorValorIA > bestVal) {
      bestMoveIA = bestMove;
    }
    console.log('melhor jogada MIN = ', bestMoveIA);
  //}

  /*if (bestMoveIA == -1) {
    console.log('notnull');
    for (let i = 8; i >= 0 ; --i){
      if (board[i] == symbolEmpty) {
        return i;
      }
    }
  }*/


  return bestMoveIA;
}

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

function changeColorOver(id) {
  let el1 = document.querySelector('.box' + (id - 1));
  
  if (!isNull(el1)) {
    el1.style.opacity = 0.5;
  }

  let el2 = document.querySelector('.box' + id);
  
  if (!isNull(el2)) { 
    el2.style.opacity = 0.5;
  }
}

function changeColorOut(id) {
  let el1 = document.querySelector('.box' + (id - 1));

  if (!isNull(el1)) {
    el1.style.opacity = 80;
  }

  let el2 = document.querySelector('.box' + id);
  
  if (!isNull(el2)) {
    el2.style.opacity = 80;
  }
}

async function changeColorElement(el) {
  if (isNull(el)) return;
  el.style.backgroundColor = "#CBCBCB";
}

function isNull(el) {
  return (el === null || el === undefined);
}

async function checkPlayerSolution() {
  let sol = 1;

  player.forEach(function (clickedId) {
    if (clickedId == 2 || clickedId == 4 || clickedId == 6) ++line1Player;
    if (line1Player == 3) {
      solution = sol;
      showSolution(boardIds[0]);
      return solution;
    }
    if (clickedId == 8 || clickedId == 10 || clickedId == 12) ++line2Player;
    if (line2Player == 3) {
      solution = sol;
      showSolution(boardIds[1]);
      return solution;
    }
    if (clickedId == 14 || clickedId == 16 || clickedId == 18) ++line3Player;
    if (line3Player == 3) {
      solution = sol;
      showSolution(boardIds[2]);
      return solution;
    }

    if (clickedId == 2 || clickedId == 10 || clickedId == 18) ++diag1Player;
    if (diag1Player == 3) {
      solution = sol;
      showSolution(boardIds[6]);
      return solution;
    }
    if (clickedId == 6 || clickedId == 10 || clickedId == 14) ++diag2Player;
    if (diag2Player == 3) {
      solution = sol;
      showSolution(boardIds[7]);
      return solution;
    }

    if (clickedId == 2 || clickedId == 8 || clickedId == 14) ++col1Player;
    if (col1Player == 3) {
      solution = sol;
      showSolution(boardIds[3]);
      return solution;
    }
    if (clickedId == 4 || clickedId == 10 || clickedId == 16) ++col2Player;
    if (col2Player == 3) {
      solution = sol;
      showSolution(boardIds[4]);
      return solution;
    }
    if (clickedId == 6 || clickedId == 12 || clickedId == 18) ++col3Player;
    if (col3Player == 3) {
      solution = sol;
      showSolution(boardIds[5]);
      return solution;
    }
  }, this);

  line1Player = 0;
  line2Player = 0;
  line3Player = 0;
  diag1Player = 0;
  diag2Player = 0;
  col1Player = 0;
  col2Player = 0;
  col3Player = 0;

  return solution;
}

async function checkOpponentSolution() {
  let sol = 2;

  opponent.forEach(function (clickedId) {
    if (clickedId == 2 || clickedId == 4 || clickedId == 6) ++line1Opponent;
    if (line1Opponent == 3) {
      solution = sol;
      showSolution(boardIds[0]);
      return solution;
    }
    if (clickedId == 8 || clickedId == 10 || clickedId == 12) ++line2Opponent;
    if (line2Opponent == 3) {
      solution = sol;
      showSolution(boardIds[1]);
      return solution;
    }
    if (clickedId == 14 || clickedId == 16 || clickedId == 18) ++line3Opponent;
    if (line3Opponent == 3) {
      solution = sol;
      showSolution(boardIds[2]);
      return solution;
    }

    if (clickedId == 2 || clickedId == 10 || clickedId == 18) ++diag1Opponent;
    if (diag1Opponent == 3) {
      solution = sol;
      showSolution(boardIds[6]);
      return solution;
    }
    if (clickedId == 6 || clickedId == 10 || clickedId == 14) ++diag2Opponent;
    if (diag2Opponent == 3) {
      solution = sol;
      showSolution(boardIds[7]);
      return solution;
    }

    if (clickedId == 2 || clickedId == 8 || clickedId == 14) ++col1Opponent;
    if (col1Opponent == 3) {
      solution = sol;
      showSolution(boardIds[3]);
      return solution;
    }
    if (clickedId == 4 || clickedId == 10 || clickedId == 16) ++col2Opponent;
    if (col2Opponent == 3) {
      solution = sol;
      showSolution(boardIds[4]);
      return solution;
    }
    if (clickedId == 6 || clickedId == 12 || clickedId == 18) ++col3Opponent;
    if (col3Opponent == 3) {
      solution = sol;
      showSolution(boardIds[5]);
      return solution;
    }
  }, this);

  line1Opponent = 0;
  line2Opponent = 0;
  line3Opponent = 0;
  diag1Opponent = 0;
  diag2Opponent = 0;
  col1Opponent = 0;
  col2Opponent = 0;
  col3Opponent = 0;

  return solution;
}



function newGame() {
  let sizeElements = document.querySelectorAll('#tabuleiro .box').length;
  let parent;
  let idx = 1;

  if (playerWins >= opponentWins) {
    document.getElementById("ninja-img").src = '../assets/img/n3.png';
  } else {
    document.getElementById("ninja-img").src = '../assets/img/n5.png';
  }

  for (let i = 1; i <= sizeElements; ++i) {
    if (i == 7 || i == 13) ++idx;
    let el = document.getElementById('box' + i);
    parent = document.getElementById('line' + idx);
    parent.removeChild(el);

  }

  idx = 1;
  let name = 0;

  for (let j = 1; j <= sizeElements; ++j) {
    if (j == 7 || j == 13) ++idx;
    let div = document.createElement('div');
    div.id = 'box' + j;
    div.className = 'box box' + j + ' gmd-3';
    let atts = [];

    if (j % 2 == 0) {
      let att1 = document.createAttribute("onclick");
      att1.value = "eventBox(" + j + ")";
      atts.push(att1);
      let att2 = document.createAttribute("name");
      att2.value = name;
      atts.push(att2);
      ++name;
    }
    let att3 = document.createAttribute("onmouseover");
    att3.value = "changeColorOver(" + j + ")";
    let att4 = document.createAttribute("onmouseout");
    att4.value = "changeColorOut(" + j + ")";
    atts.push(att3);
    atts.push(att4);

    atts.forEach(function (att) {
      div.setAttributeNode(att);
    }, this);

    document.getElementById("line" + idx).appendChild(div);

  }

  init();
}

function init() {
  let els = document.querySelectorAll('#tabuleiro .box');
  let box = defaultValues(els);

  /*if (typeof dtb.getDataBindign != "undefined" || dtb.getDataBinding != null) {
    if(dtb.getDataBinding.indexOf('loginmail') > -1){
      login = dtb.getDataBinding.getItem('loginmail');
    }
  }*/
  box.play();

  varDefaultValues();
}

function showSolution(array) {
  for (let i = 0; i < allElements.length; ++i) {
      if (array.indexOf(i + 1) <= -1) {
      let element = document.querySelector('.box' + (i + 1));
      element.style.opacity = 0.2;
      element.style.pointerEvents = 'none';
      }
  }
}

function varDefaultValues() {
  document.getElementById('victory').innerHTML = 'Placar: ';
  allPlays = [];
  player = [];
  opponent = [];

  line1Player = 0;
  line2Player = 0;
  line3Player = 0;
  diag1Player = 0;
  diag2Player = 0;
  col1Player = 0;
  col2Player = 0;
  col3Player = 0;

  line1Opponent = 0;
  line2Opponent = 0;
  line3Opponent = 0;
  diag1Opponent = 0;
  diag2Opponent = 0;
  col1Opponent = 0;
  col2Opponent = 0;
  col3Opponent = 0;
  solution = 0;

  let _playerWins = document.getElementById('playerWins');
  let _opponentWins = document.getElementById('opponentWins');
  let versus = document.getElementById('versus');
  _playerWins.innerHTML = `${playerWins} `;
  versus.innerHTML = 'X ';
  _opponentWins.innerHTML = `${opponentWins} `;

  for (let index = 0; index < board.length; index++) {
    board = replaceAt(board, index, symbolEmpty);
  }

  principalScore = 100000;
  infinity = 1;
}

function defaultValues(element) {
  let box = anime({
    targets: element,
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

function createPlayerAnimation(id) {
  let box1 = anime({
    targets: `div.box.box${id - 1}`,
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

  let box2 = anime({
    targets: `div.box.box${id}`,
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

  return [box1, box2];
}

function ninjaAnimation() {
  return anime({
    targets: 'div.ninja',
    delay: 20,
    translateX: [
      { value: 0, duration: 50 },
    ],
    duration: '1000',
    width: '50px',
    rotate: '10turn',
    autoplay: false
  });
}

function createOpponentAnimation(id_ia) {
  let box3 = anime({
    targets: `div.box.box${id_ia - 1}`,
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

  let box4 = anime({
    targets: `div.box.box${id_ia}`,
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

  return [box3, box4];
}

function show() {
  console.log('PLAYED = ', allPlays);
  console.log('ELX = ', player);
  console.log('ELO = ', opponent);
}