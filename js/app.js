// box at the top of the page with the symbol O or X is highlighted for the current player.
const toggleActivePlayer = ()=>{
	$('#player1').toggleClass('active');
	$('#player2').toggleClass('active');
}

const findWinner = ()=>{
	// game ends when one player has three of their symbols in a row horizontally/vertically/diagonally.
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

const b = $('.box');

const columnWins = (player)=>{
	for(let i=0;i<3;i++){
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

const rowWins = (player)=>{
	for(let i=0;i<7;i+=3){
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
const diagonalwin1 = (player)=>{
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
const diagonalwin2 = (player)=>{
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
const o = (box)=>{
	return box.classList.contains('box-filled-1');
}
const x = (box)=>{
	return box.classList.contains('box-filled-2');
}
// when the game ends, the board disappears and the game end screen appears.
const win = (player)=>{
	$(".screen").remove();
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
		$('.message').text(name1+" wins!");
	}else if (player==='x') {
		$('.screen').addClass('screen-win-two');
		$('.message').text(name2+" wins!");
	// if the game ends in a tie, show the phrase "It's a Tie!" instead of "Winner".
	}else if (player==='tie') {
		$('.screen').addClass('screen-win-tie');
		$('.message').text("It's a Tie!");
	}
	// when a player clicks "New Game" button, the board appears again, empty, and a new game begins.
	$('#finish a').click(function(){
		$('.screen').hide();
		$('#player1').addClass('active');
		$('#player2').removeClass('active');
		$('.box').removeClass('box-filled-1');
		$('.box').removeClass('box-filled-2');
		$('.box').css('background-image', 'none');
	});
}
const tie = ()=>{
	var empty=[];
	for(let i=0;i<b.length;i++){
		if (!x(b[i]) && !o(b[i])){
			empty.push(i);
		}
	}
	if (empty.length===0){
		win('tie');
	}
}

// if player did not select to play against computer on start screen.
const withoutComputer = ()=>{
	$('.box').click(()=>{
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
			// game ends when one player has three of their symbols in a row horizontally/vertically/diagonally or if they tie.
			findWinner();
		}
	});
}
// if player did select to play against computer on start screen.
const withComputer = ()=>{
	$('.box').click((e)=>{	
		// sequence starts when player makes the first move.
		if ($('#player1').hasClass('active')){
			// player can only click on empty squares.
			if(!$(e.target).hasClass('box-filled-1') && !$(e.target).hasClass('box-filled-2')){
				// when the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square.
				$(e.target).addClass('box-filled-1');

				// check if player's move resulted in win/tie.
				findWinner();

				// play alternates between X and O.
				toggleActivePlayer();
				
				// computer finds empty boxes on board and selects one randomly.
				var empty = [];
				$(".box").each((i, box)=>{
					if(!box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2")){
						empty.push(box);
					 }
				});
				let selection = Math.floor(Math.random() * Math.floor(empty.length));
				
				setTimeout(()=>{
					empty[selection].classList.add('box-filled-2');
					empty[selection].style.backgroundImage = 'url(./img/x.svg)';
					// check if computer's move resulted in win/tie.
					findWinner();

					// play alternates between X and O.
					toggleActivePlayer();
				}, 2000);
				
			}
		}
	});	 		
}

let name1, name2, computer;

$(document).ready(()=>{
	// when the page loads, the startup screen should appear. 
	$('body').append(`
		<div class="screen screen-start" id="start">
		  <header>
		    <h1>Tic Tac Toe</h1>
		    <div id="playerInfo">
			    <div class="name-div">
				    <label>Player1 can enter their name below</label>
				    <input type="type" name="name1" id="name1">
			    </div>
			    <div class="name-div name2-div">
				    <label>Player2 can enter their name below.</label>
				    <input type="type" name="name2" id="name2">
				    <br>
				    <input type="checkbox" name="computer" id="computer">
				    <label>Play alone?</label>
			    </div>
		    </div>
		    <a href="#" class="button">Start game</a>
		  </header>
		</div>
	`);
	// when the player clicks start button start screen disappears, board appears, game begins.
	$('.button').click(()=>{
		$('.screen').hide();
		// Player1, O, starts.
		$('#player1').addClass('active');

		// A header is added with player names if user(s) provided them on start screen. Player1/Player2 are the default.
		$("<div id='name-header'</div>").insertAfter($('header'));
		name1 = $('#name1').val() || "Player1";
	 	$("#name-header").append('<p id="name1-header">'+name1+'</p>');
	 	name2 = $('#name2').val() || "Player2";
	 	$("#name-header").append('<p id="name2-header">'+name2+'</p>');	 	
	
	 	// checks if user selected to play against a computer and plays game accordingly.
	 	computer = document.getElementById("computer").checked;
	 	if(!computer){
	 		withoutComputer();
	 	}else{
	 		withComputer();
	 	}

		// when current player mouses over an empty square on the board, their X or O should appear on the square.
		$('.box').mouseover((e)=>{
			if(!$(e.target).hasClass('box-filled-1') && !$(e.target).hasClass('box-filled-2')){
				if ($('#player1').hasClass('active')){
					$(e.target).css('background-image', 'url(./img/o.svg)');
				} else if ($('#player2').hasClass('active') && !computer){
					$(e.target).css('background-image', 'url(./img/x.svg)');
				}
			}
		});
		$('.box').mouseleave((e)=>{
			if(!$(e.target).hasClass('box-filled-1') && !$(e.target).hasClass('box-filled-2')){
				$(e.target).css('background-image', 'none');
			}
		});
	});
});
