let size = "";
let opponent = "";
let startButton = document.getElementById("start-button");
let againButton = document.getElementById("again-button");
let resetButton = document.getElementById("reset-button");
let boxContainer = document.getElementById("box-container");
let sizeOfBox = "";
let box;
let counter = true;
let resultArray = [];
let resultShown = document.getElementById("result");
let player1 = document.getElementById("player1Status");
let player1Count = 0;
let player2 = document.getElementById("player2Status");
let player2Count = 0;
let tie = document.getElementById("tieStatus");
let tieCount = 0;
let content = document.getElementById("main-content");
let gameplay = document.getElementById("gameplay");
let about = document.getElementById("whatIsThis");
let history = document.getElementById("history");
let gameplayButton = document.getElementById("gameplayButton");
let aboutButton = document.getElementById("aboutButton");
let historyButton = document.getElementById("historyButton");

startButton.onclick = chosen;
againButton.onclick = again;
resetButton.onclick = reset;
gameplayButton.onclick = showGameplay;
aboutButton.onclick = showAbout;
historyButton.onclick = showHistory;
gameplay.onclick = hideGameplay;
about.onclick = hideAbout;
history.onclick = hideHistory;

// run when start button clicked
function chosen(){
	// show the board
	content.removeAttribute("class");
	// initial the game status
	counter = true;
	player1Count = 0;
	player1.innerHTML = player1Count;
	player2Count = 0;
	player2.innerHTML = player2Count;
	tieCount = 0;
	tie.innerHTML = tieCount;
	boxContainer.innerHTML = "";
	resultShown.innerHTML = "";
	size = sizeSelector.value;
	opponent = opponentSelector.value;
	// depend on the size chose, set the different class
	if (size === "3 X 3"){
		boxContainer.setAttribute("class", "box-container3");
		sizeOfBox = "box3";
		let num = 9;
		appendBox(num);
	} else if (size === "4 X 4"){
		boxContainer.setAttribute("class", "box-container4");
		sizeOfBox = "box4";
		let num = 16;
		appendBox(num);
	} else if (size === "5 X 5"){
		boxContainer.setAttribute("class", "box-container5");
		sizeOfBox = "box5";
		let num = 25;
		appendBox(num);
	} else if (size === "6 X 6"){
		boxContainer.setAttribute("class", "box-container6");
		sizeOfBox = "box6";
		let num = 36;
		appendBox(num);
	}
	// based on the opponent chose, run which function
	box = document.getElementsByClassName(sizeOfBox);
	if (opponent === "Human"){
		for (let i = 0; i < box.length; i++){
			box[i].onclick = input;
		}
	} else if (opponent === "Computer"){
		for (let i = 0; i < box.length; i++){
			box[i].onclick = inputComputer;
		}
	}
}

// add in box based on the size
function appendBox(num){
	for (let i = 0; i < num; i++){
		let divInside = document.createElement("div");
		divInside.setAttribute("class", sizeOfBox);
		boxContainer.appendChild(divInside);
	}
}

// when play with other player
function input(event){
	let clicked = event.target;
	if (counter === true && clicked.innerHTML === "" && resultShown.innerHTML === ""){
		resultArray = [];
		clicked.innerHTML = "O";
		counter = false;
		// after moved, push the input to an array
		for (let i = 0; i < box.length; i++){
			resultArray.push(box[i].innerHTML);
		}
		checkHorizontal();
		checkVertical();
		checkDiagonal();
	} else if (counter === false && clicked.innerHTML === "" && resultShown.innerHTML === ""){
		resultArray = [];
		clicked.innerHTML = "X";
		counter = true;
		for (let i = 0; i < box.length; i++){
			resultArray.push(box[i].innerHTML);
		}
		checkHorizontal();
		checkVertical();
		checkDiagonal();
	}
	// if the array no more empty element and no result, then tie
	if (resultArray.includes("") === false && resultShown.innerHTML === ""){
		resultShown.innerHTML = "Tie! No one win!";
		tieCount++;
		tie.innerHTML = tieCount;
	}
}

// when play against computer
function inputComputer(event){
	let clicked = event.target;
	// need to made sure the box selected must be empty
	if (counter === true && clicked.innerHTML === "" && resultShown.innerHTML === ""){
		resultArray = [];
		clicked.innerHTML = "O";
		counter = false;
		// after moved, push the input to an array
		for (let i = 0; i < box.length; i++){
			resultArray.push(box[i].innerHTML);
		}
		// check result
		checkHorizontal();
		checkVertical();
		checkDiagonal();
		// if the result is still empty, computer then make a move
		if (resultShown.innerHTML === "" && resultArray.includes("") === true){
			comp();
		}
	}
	// if the array no more empty element and no result, then tie	
	if (resultArray.includes("") === false && resultShown.innerHTML === ""){
		resultShown.innerHTML = "Tie! No one win!";
		tieCount++;
		tie.innerHTML = tieCount;
	}
}

// computer random move
function comp() {
	// random get a number base on the number of box
	let temporary = Math.floor(Math.random() * box.length);
	// if the box selected is empty, put in a move and then check result
	if (box[temporary].innerHTML === "") {
		resultArray = [];
		box[temporary].innerHTML = "X";
		counter = true;
		// after moved, push the input to an array		
		for (let i = 0; i < box.length; i++){
			resultArray.push(box[i].innerHTML);
		}
		checkHorizontal();
		checkVertical();
		checkDiagonal();
	} else {
		// else run again until can a move is made
		comp();
	}
}

function checkHorizontal(){
	if (size === "3 X 3"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[1] && resultArray[0] === resultArray[2]){
			displayResult();
		} else if (resultArray[3] !== "" && resultArray[3] === resultArray[4] && resultArray[3] === resultArray[5]){
			displayResult();
		} else if (resultArray[6] !== "" && resultArray[6] === resultArray[7] && resultArray[6] === resultArray[8]){
			displayResult();
		}
	}
	if (size === "4 X 4"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[1] && resultArray[0] === resultArray[2] && resultArray[0] === resultArray[3]){
			displayResult();
		} else if (resultArray[4] !== "" && resultArray[4] === resultArray[5] && resultArray[4] === resultArray[6] && resultArray[4] === resultArray[7]){
			displayResult();
		} else if(resultArray[8] !== "" && resultArray[8] === resultArray[9] && resultArray[8] === resultArray[10] && resultArray[8] === resultArray[11]){
			displayResult();
		} else if (resultArray[12] !== "" && resultArray[12] === resultArray[13] && resultArray[12] === resultArray[14] && resultArray[12] === resultArray[15]){
			displayResult();
		}	
	}
	if (size === "5 X 5"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[1] && resultArray[0] === resultArray[2] && resultArray[0] === resultArray[3] && resultArray[0] === resultArray[4]){
			displayResult();
		} else if (resultArray[5] !== "" && resultArray[5] === resultArray[6] && resultArray[5] === resultArray[7] && resultArray[5] === resultArray[8] && resultArray[5] === resultArray[9]){
			displayResult();
		} else if (resultArray[10] !== "" && resultArray[10] === resultArray[11] && resultArray[10] === resultArray[12] && resultArray[10] === resultArray[13] && resultArray[10] === resultArray[14]){
			displayResult();
		} else if (resultArray[15] !== "" && resultArray[15] === resultArray[16] && resultArray[15] === resultArray[17] && resultArray[15] === resultArray[18] && resultArray[15] === resultArray[19]){
			displayResult();
		} else if (resultArray[20] !== "" && resultArray[20] === resultArray[21] && resultArray[20] === resultArray[22] && resultArray[20] === resultArray[23] && resultArray[20] === resultArray[24]){
			displayResult();
		}
	}
	if (size === "6 X 6"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[1] && resultArray[0] === resultArray[2] && resultArray[0] === resultArray[3] && resultArray[0] === resultArray[4] && resultArray[0] === resultArray[5]){
			displayResult();
		} else if (resultArray[6] !== "" && resultArray[6] === resultArray[7] && resultArray[6] === resultArray[8] && resultArray[6] === resultArray[9] && resultArray[6] === resultArray[10] && resultArray[6] === resultArray[11]){
			displayResult();
		} else if (resultArray[12] !== "" && resultArray[12] === resultArray[13] && resultArray[12] === resultArray[14] && resultArray[12] === resultArray[15] && resultArray[12] === resultArray[16] && resultArray[12] === resultArray[17]){
			displayResult();
		} else if (resultArray[18] !== "" && resultArray[18] === resultArray[19] && resultArray[18] === resultArray[20] && resultArray[18] === resultArray[21] && resultArray[18] === resultArray[22] && resultArray[18] === resultArray[23]){
			displayResult();
		} else if (resultArray[24] !== "" && resultArray[24] === resultArray[25] && resultArray[24] === resultArray[26] && resultArray[24] === resultArray[27] && resultArray[24] === resultArray[28] && resultArray[24] === resultArray[29]){
			displayResult();
		} else if (resultArray[30] !== "" && resultArray[30] === resultArray[31] && resultArray[30] === resultArray[32] && resultArray[30] === resultArray[33] && resultArray[30] === resultArray[34] && resultArray[30] === resultArray[35]){
			displayResult();
		}
	}
}

function checkVertical(){
	if (size === "3 X 3"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[3] && resultArray[0] === resultArray[6]){
			displayResult();
		} else if (resultArray[1] !== "" && resultArray[1] === resultArray[4] && resultArray[1] === resultArray[7]){
			displayResult();
		} else if (resultArray[2] !== "" && resultArray[2] === resultArray[5] && resultArray[2] === resultArray[8]){
			displayResult();
		}
	}
	if (size === "4 X 4"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[4] && resultArray[0] === resultArray[8] && resultArray[0] === resultArray[12]){
			displayResult();
		} else if (resultArray[1] !== "" && resultArray[1] === resultArray[5] && resultArray[1] === resultArray[9] && resultArray[1] === resultArray[13]){
			displayResult();
		} else if(resultArray[2] !== "" && resultArray[2] === resultArray[6] && resultArray[2] === resultArray[10] && resultArray[2] === resultArray[14]){
			displayResult();
		} else if (resultArray[3] !== "" && resultArray[3] === resultArray[7] && resultArray[3] === resultArray[11] && resultArray[3] === resultArray[15]){
			displayResult();	
		}
	}
	if (size === "5 X 5"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[5] && resultArray[0] === resultArray[10] && resultArray[0] === resultArray[15] && resultArray[0] === resultArray[20]){
			displayResult();
		} else if (resultArray[1] !== "" && resultArray[1] === resultArray[6] && resultArray[1] === resultArray[11] && resultArray[1] === resultArray[16] && resultArray[1] === resultArray[21]){
			displayResult();
		} else if (resultArray[2] !== "" && resultArray[2] === resultArray[7] && resultArray[2] === resultArray[12] && resultArray[2] === resultArray[17] && resultArray[2] === resultArray[22]){
			displayResult();
		} else if (resultArray[3] !== "" && resultArray[3] === resultArray[8] && resultArray[3] === resultArray[13] && resultArray[3] === resultArray[18] && resultArray[3] === resultArray[23]){
			displayResult();
		} else if (resultArray[4] !== "" && resultArray[4] === resultArray[9] && resultArray[4] === resultArray[14] && resultArray[4] === resultArray[19] && resultArray[4] === resultArray[24]){
			displayResult();
		}
	}
	if (size === "6 X 6"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[6] && resultArray[0] === resultArray[12] && resultArray[0] === resultArray[18] && resultArray[0] === resultArray[24] && resultArray[0] === resultArray[30]){
			displayResult();
		} else if (resultArray[1] !== "" && resultArray[1] === resultArray[7] && resultArray[1] === resultArray[13] && resultArray[1] === resultArray[19] && resultArray[1] === resultArray[25] && resultArray[1] === resultArray[31]){
			displayResult();
		} else if (resultArray[2] !== "" && resultArray[2] === resultArray[8] && resultArray[2] === resultArray[14] && resultArray[2] === resultArray[20] && resultArray[2] === resultArray[26] && resultArray[2] === resultArray[32]){
			displayResult();
		} else if (resultArray[3] !== "" && resultArray[3] === resultArray[9] && resultArray[3] === resultArray[15] && resultArray[3] === resultArray[21] && resultArray[3] === resultArray[27] && resultArray[3] === resultArray[33]){
			displayResult();
		} else if (resultArray[4] !== "" && resultArray[4] === resultArray[10] && resultArray[4] === resultArray[16] && resultArray[4] === resultArray[22] && resultArray[4] === resultArray[28] && resultArray[4] === resultArray[34]){
			displayResult();
		} else if (resultArray[5] !== "" && resultArray[5] === resultArray[11] && resultArray[5] === resultArray[17] && resultArray[5] === resultArray[23] && resultArray[5] === resultArray[29] && resultArray[5] === resultArray[35]){
			displayResult();
		}
	}
}

function checkDiagonal(){
	if (size === "3 X 3"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[4] && resultArray[0] === resultArray[8]){
			displayResult();
		} else if (resultArray[2] !== "" && resultArray[2] === resultArray[4] && resultArray[2] === resultArray[6]){
			displayResult();
		}
	}
	if (size === "4 X 4"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[5] && resultArray[0] === resultArray[10] && resultArray[0] === resultArray[15]){
			displayResult();
		} else if (resultArray[3] !== "" && resultArray[3] === resultArray[6] && resultArray[3] === resultArray[9] && resultArray[3] === resultArray[12]){
			displayResult();
		}
	}
	if (size === "5 X 5"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[6] && resultArray[0] === resultArray[12] && resultArray[0] === resultArray[18] && resultArray[0] === resultArray[24]){
			displayResult();
		} else if (resultArray[4] !== "" && resultArray[4] === resultArray[8] && resultArray[4] === resultArray[12] && resultArray[4] === resultArray[16] && resultArray[4] === resultArray[20]){
			displayResult();
		}
	}
	if (size === "6 X 6"){
		if (resultArray[0] !== "" && resultArray[0] === resultArray[7] && resultArray[0] === resultArray[14] && resultArray[0] === resultArray[21] && resultArray[0] === resultArray[28] && resultArray[0] === resultArray[35]){
			displayResult();
		} else if (resultArray[5] !== "" && resultArray[5] === resultArray[10] && resultArray[5] === resultArray[15] && resultArray[5] === resultArray[20] && resultArray[5] === resultArray[25] && resultArray[5] === resultArray[30]){
			displayResult();
		}
	}
}

function displayResult(){
	if (counter === false){
		resultShown.innerHTML = "Player 1 has won!!!"
		// increase the time of that player win
		player1Count++;
		// change the value of the scoreboard
		player1.innerHTML = player1Count;
	} else if (counter === true){
		resultShown.innerHTML = "Player 2 has won!!!";
		player2Count++;
		player2.innerHTML = player2Count;		
	}	
}

// reset the board without change the score board
function again(){
	for (let i = 0; i < box.length; i++){
		box[i].innerHTML = "";
	}
	resultShown.innerHTML = "";
	counter = true;
}

// reset the game to initial state
function reset(){
	content.setAttribute("class", "hidden");
	again();
	size = "";
	boxContainer.innerHTML = "";
	player1Count = 0;
	player1.innerHTML = player1Count;
	player2Count = 0;
	player2.innerHTML = player2Count;
	tieCount = 0;
	tie.innerHTML = tieCount;
}

// show the how to play
function showGameplay(){
	gameplay.removeAttribute("class");
	hideAbout();
	hideHistory();
}

// hide the how to play
function hideGameplay(){
	gameplay.setAttribute("class", "hidden");
}

// show about
function showAbout(){
	about.removeAttribute("class");
	hideGameplay();
	hideHistory();
}

// hide about
function hideAbout(){
	about.setAttribute("class", "hidden");
}

// show history
function showHistory(){
	history.removeAttribute("class");
	hideGameplay();
	hideAbout();
}

// hide history
function hideHistory(){
	history.setAttribute("class", "hidden");
}