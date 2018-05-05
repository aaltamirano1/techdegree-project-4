function toggleActivePlayer(){
	$('#player1').toggleClass('active');
	$('#player2').toggleClass('active');
}
function findWinner(){
	rowWins('x');
	rowWins('o');
	columnWins('x');
	columnWins('o');
	diagonalwin1('x');
	diagonalwin1('o');
	diagonalwin2('x');
	diagonalwin2('o');
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
	if (player==='o') {
		$('.screen').addClass('screen-win-one');
	}else if (player==='x') {
		$('.screen').addClass('screen-win-two');
	}else if (player==='tie') {
		$('.screen').addClass('screen-win-tie');
		$('.message').text("It's a draw");
	}
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
	$('body').append(`
		<div class="screen screen-start" id="start">
		  <header>
		    <h1>Tic Tac Toe</h1>
		    <a href="#" class="button">Start game</a>
		  </header>
		</div>
	`);
	$('#start a').click(function(){
		$('#start').hide();
		$('#player1').addClass('active');
	});
	$('.box').click(function(){
		toggleActivePlayer();
		if ($('#player1').hasClass('active')){
			$(this).addClass('box-filled-2');
		} else if ($('#player2').hasClass('active')){
			$(this).addClass('box-filled-1');
		}
		findWinner();
	});

});
