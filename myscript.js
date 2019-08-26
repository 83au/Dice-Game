let scores,
   roundScore,
   activePlayer,
   isplaying,
   lastDice1,
   lastDice2,
   winningScore,
   input,
   numberOfDice;


init();

setEventListeners();


function setEventListeners() {
  document.querySelector('.btn-rules').addEventListener('click', () => {
    document.getElementById('rules').classList.add('show');
    document.querySelector('.background').classList.add('show');
  });

  document.getElementById('rules').addEventListener('click', function() {
    this.classList.remove('show');
    document.querySelector('.background').classList.remove('show');
  });

  document.querySelector('.btn-new').addEventListener('click', function() {
    init();
  });

  document.getElementById('number-of-dice').addEventListener('change', function() {
    numberOfDice = Number(this.value);
  });

  document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isPlaying) {
      // Choose random dice numbers
      let dice1 = Math.floor(Math.random() * 6) + 1;
      let dice2 = Math.floor(Math.random() * 6) + 1;

      // Display result
      document.getElementById('dice-1').style.display = "block";
      document.getElementById('dice-1').src = `dice-${dice1}.png`;
      if (numberOfDice === 2) {
        document.getElementById('dice-2').style.display = "block";
        document.getElementById('dice-2').src = `dice-${dice2}.png`;
      }

      // Update round score
      if (numberOfDice === 2 && dice1 === 6 && lastDice1 === 6 || dice2 === 6 &&
        lastDice2 === 6) {
        scores[activePlayer] = "0";
        document.getElementById('current-' + activePlayer).textContent = "0";
        nextPlayer();
      } else if (numberOfDice === 2 && dice1 > 1 && dice2 > 1) {
        roundScore += dice1 + dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
      } else if (numberOfDice === 1 && dice1 > 1) {
        roundScore += dice1;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
      } else {
        nextPlayer();
      }

      lastDice1 = dice1;
      lastDice2 = dice2;
    }
  });

  document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isPlaying) {
      scores[activePlayer] = Number(scores[activePlayer]) + roundScore;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

      winningScore = 100;
      input = document.querySelector('input').value;

      if (input) winningScore = input;

      if (scores[activePlayer] >= winningScore) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        isPlaying = false;
      } else {
        nextPlayer();
      }
    }
  });
}


function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;
  numberOfDice = 1;

  hideDice();

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


function hideDice() {
  var allDice = document.querySelectorAll('.dice');
  allDice.forEach(singleDi => {
    singleDi.style.display = 'none';
  });
}


function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  hideDice();
}
