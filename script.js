let fields = [];
let numbers = [];
let filledIds = [];
let count = [];
let shape = 'cross';
let player = 'Player 1';
let win = false;
let drawnLine;
let drawnLineV;
let drawnLineD1;
let drawnLineD2;


function fillShape(number) {
    if (!fields[number] && !win) {
        fillArray(number);
        draw();
        checkForWin();
        changePlayer(number);
        changeShape(number);
    }
}


function fillArray(number) {
    numbers[number] = number;
    filledIds[number] = shape + number;
    fields[number] = shape;
    count.push(number);
}


function changeShape(number) {
    if (shape == 'cross' && fields[number]) {
        shape = 'circle';
        switchToPlayer2();
    } else if (shape == 'circle' && fields[number]) {
        shape = 'cross';
        switchToPlayer1();
    } else {
        return;
    }
}


function changePlayer() {
    if (player == 'Player 1') {
        player = 'Player 2'
    } else {
        player = 'Player 1'
    }
}


function switchToPlayer1() {
    document.getElementById('player1').classList.add('active_player');
    document.getElementById('player2').classList.remove('active_player');
    document.getElementById('player_container1').classList.remove('inactive_player');
    document.getElementById('player_container2').classList.add('inactive_player');
}


function switchToPlayer2() {
    document.getElementById('player1').classList.remove('active_player');
    document.getElementById('player2').classList.add('active_player');
    document.getElementById('player_container1').classList.add('inactive_player');
    document.getElementById('player_container2').classList.remove('inactive_player');
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];

        if (fields[i]) {
            if (field == 'cross') {
                document.getElementById('cross' + i).classList.remove('d-none');  //vorher weitere Zeile: onclick = null;
            }
            if (field == 'circle') {
                document.getElementById('circle' + i).classList.remove('d-none');  //vorher weitere Zeile: onclick = null;

            }
        }
    }
}


function checkForWin() {
    checkForHorizontalWins();
    checkForVerticalWins();
    checkForDiagonalWins();

    if (win == true) {
        setTimeout(showEndscreen, 1000);
    } else if (count.length > 8) {
        setTimeout(showDrawEndscreen, 1000);
    }
}


function checkForHorizontalWins() {
    if (fields[0] == shape && fields[0] == fields[1] && fields[1] == fields[2]) {    //first row
        document.getElementById('h_line1').style.transform = 'scaleX(1)';
        drawnLine = 'h_line1';

        win = true;
    }
    if (fields[3] == shape && fields[3] == fields[4] && fields[4] == fields[5]) {    //second row
        document.getElementById('h_line2').style.transform = 'scaleX(1)';
        drawnLine = 'h_line2';
        win = true;
    }
    if (fields[6] == shape && fields[6] == fields[7] && fields[7] == fields[8]) {    //third row
        document.getElementById('h_line3').style.transform = 'scaleX(1)';
        drawnLine = 'h_line3';
        win = true;
    }
}


function checkForVerticalWins() {
    if (fields[0] == shape && fields[0] == fields[3] && fields[3] == fields[6]) {    //first column
        document.getElementById('v_line1').style.transform = 'rotate(90deg) scaleX(1)';
        drawnLineV = 'v_line1';
        win = true;
    }
    if (fields[1] == shape && fields[1] == fields[4] && fields[4] == fields[7]) {    //second column
        document.getElementById('v_line2').style.transform = 'rotate(90deg) scaleX(1)';
        drawnLineV = 'v_line2';
        win = true;
    }
    if (fields[2] == shape && fields[2] == fields[5] && fields[5] == fields[8]) {   //third column
        document.getElementById('v_line3').style.transform = 'rotate(90deg) scaleX(1)';
        drawnLineV = 'v_line3';
        win = true;
    }
}


function checkForDiagonalWins() {
    if (fields[0] == shape && fields[0] == fields[4] && fields[4] == fields[8]) {    //first diagonal
        document.getElementById('d_line1').style.transform = 'rotate(45deg) scaleX(1)';
        drawnLineD1 = 'd_line1';
        win = true;
    }
    if (fields[2] == shape && fields[2] == fields[4] && fields[4] == fields[6]) {    //second diagonal
        document.getElementById('d_line2').style.transform = 'rotate(-45deg) scaleX(1)';
        drawnLineD2 = 'd_line2';
        win = true;
    }
}


function showEndscreen() {
    document.getElementById('game_over').classList.remove('d-none');
    changePlayer();
    document.getElementById('winning_player').innerHTML = player;

}


function showDrawEndscreen() {
    document.getElementById('game_over').classList.remove('d-none');
    document.getElementById('winning_player').innerHTML = 'Nobody';
}


function restartGame() {    //funktioniert nicht vollständig: nach neustart werden in der vorherigen Runde angeklickte Felder nicht mehr gefüllt
    document.getElementById('game_over').classList.add('d-none');
    resetLines();
    hideShapes();
    resetVariables();
    switchToPlayer1();
}


function resetLines() {
    if (drawnLine) {
        document.getElementById(drawnLine).style.transform = 'scaleX(0.0)';
    }
    if (drawnLineV) {
        document.getElementById(drawnLineV).style.transform = 'rotate(90deg) scaleX(0.0)';
    }
    if (drawnLineD1) {
        document.getElementById(drawnLineD1).style.transform = 'rotate(45deg) scaleX(0.0)';
    }
    if (drawnLineD2) {
        document.getElementById(drawnLineD2).style.transform = 'rotate(-45deg) scaleX(0.0)';
    }
}


function hideShapes() {
    for (let i = 0; i < 9; i++) {
        let element = filledIds[i];

        if (element) {
            document.getElementById(element).classList.add('d-none');
        }
    }
}


function resetVariables() {
    player = 'Player 1';
    win = false;
    shape = 'cross';
    fields = [];
    numbers = [];
    filledIds = [];
    count = [];
    drawnLine;
    drawnLineV;
    drawnLineD1;
    drawnLineD2;
}