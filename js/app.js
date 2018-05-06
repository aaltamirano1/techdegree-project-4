// box at the top of the page with the symbol O or X is highlighted for the current player.
function toggleActivePlayer(){
	$('#player1').toggleClass('active');
	$('#player2').toggleClass('active');
}
// game ends when one player has three of their symbols in a row horizontally/vertically/diagonally.
function findWinner(){
	rowWins('x');
	rowWins('o');
	columnWins('x');
	columnWins('o');
	diagonalwin1('x');
	diagonalwin1('o');
	diagonalwin2('x');
	diagonalwin2('o');
	// if all squares are filled and no players have three in a row, the game is a tie.
	tie();
}
var b = $('.box');
function columnWins(player){
	for(var i=0;i<3;i++){
		if (player==='x'){
			if(x(b[i]) && x(b[i+3]) && x(b[i+6])){
				win('x');
			}
		} else if (player==='o'){
			if(o(b[i]) && o(b[i+3]) && o(b[i+6])){
				win('o');
			}
		}		
	}
}

function rowWins(player){
	for(var i=0;i<7;i+=3){
		if (player==='x'){
			if(x(b[i]) && x(b[i+1]) && x(b[i+2])){
				win('x');
			}
		} else if (player==='o'){
			if(o(b[i]) && o(b[i+1]) && o(b[i+2])){
				win('o');
			}
		}
	}
}
function diagonalwin1(player){
	if (player==='x'){
		if(x(b[0]) && x(b[4]) && x(b[8])){
			win('x');
		}
	} else if (player==='o'){
		if(o(b[0]) && o(b[4]) && o(b[8])){
			win('o');
		}
	}
}
function diagonalwin2(player){
	if (player==='x'){
		if(x(b[2]) && x(b[4]) && x(b[6])){
			win('x');
		}
	} else if (player==='o'){
		if(o(b[2]) && o(b[4]) && o(b[6])){
			win('o');
		}
	}
}
function o(box){
	return box.classList.contains('box-filled-1');
}
function x(box){
	return box.classList.contains('box-filled-2');
}
// when the game ends, the board disappears and the game end screen appears.
function win(player){
	$('body').append(`
		<div class="screen screen-win" id="finish">
		  <header>
		    <h1>Tic Tac Toe</h1>
		    <p class="message">Winner</p>
		    <a href="#" class="button">New game</a>
		  </header>
		</div>
	`);
	// add the appropriate class (and therefore background) to the <div> for the winning screen.
	if (player==='o') {
		$('.screen').addClass('screen-win-one');
	}else if (player==='x') {
		$('.screen').addClass('screen-win-two');
	// if the game ends in a tie, show the phrase "It's a Tie!" instead of "Winner".
	}else if (player==='tie') {
		$('.screen').addClass('screen-win-tie');
		$('.message').text("It's a Tie!");
	}
	// when a player clicks "New Game" button, the board appears again, empty, and a new game begins.
	$('#finish a').click(function(){
		$('#finish').remove();
		$('#player1').addClass('active');
		$('#player2').removeClass('active');
		$('.box').removeClass('box-filled-1');
		$('.box').removeClass('box-filled-2');
	});
}
function tie(){
	var empty=[];
	for(var i=0;i<b.length;i++){
		if (!x(b[i]) && !o(b[i])){
			empty.push(i);
		}
	}
	if (empty.length===0){
		win('tie');
	}
}

$(document).ready(function() {
	// when the page loads, the startup screen should appear. 
	$('body').append(`
		<div class="screen screen-start" id="start">
		  <header>
		    <h1>Tic Tac Toe</h1>
		    <a href="#" class="button">Start game</a>
		  </header>
		</div>
	`);
	// when the player clicks start button start screen disappears, board appears, game begins.
	$('#start a').click(function(){
		$('#start').hide();
		$('#player1').addClass('active');
	});
	$('.box').click(function(){
		// players can only click on empty squares.
		if(!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')){
			// play alternates between X and O.
			toggleActivePlayer();
			// when the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square.
			if ($('#player1').hasClass('active')){
				$(this).addClass('box-filled-2');
			} else if ($('#player2').hasClass('active')){
				$(this).addClass('box-filled-1');
			}
			findWinner();
		}
	});
});
