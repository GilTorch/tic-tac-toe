$(document).ready(function() {
  //Creation du Tic-tac-toe en se servant des parametres de l'utilisatuervar animationEffectIn = "animated fadeInLeftBig";
  var animationEffectIn = "animated fadeInLeftBig";
  var currentPosition = 0;
  var playWithAI = false;
  var player1Name = "";
  var player2Name = "AI";
  var player1LetterChoice = "X";
  var player2LetterChoice = "O";
  var playerLetterChoice = player1LetterChoice;
  var caseNonVide = 0;
  var leftDiagonal = "";
  var rightDiagonal = "";
  var leftVertical = "";
  var centerVertical = "";
  var rightVertical = "";
  var topHorizontal = "";
  var bottomHorizontal = "";
  var centerHorizontal = "";
  var player1WinningCoefficient = "111";
  var player2WinningCoefficient = "222";
  var player1WinningCoefficientTracker = "1";
  var player2WinningCoefficientTracker = "2";
  var ticTacToeTable = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  //Naviagation dans le menu
  var navigation_map=[
    "main_heading",
    "choose-player",
    "player-names",
    "letter-choice-box",
    "tic-tac-toe-container",
  ];


  function showCurrentScreen(currentPosition){
    var screen=$("#"+navigation_map[currentPosition]);
    removeAnimationFromScreen(screen);
    screen.show().addClass(animationEffectIn);
  }

  function removeAnimationFromScreen(screen){
    if(screen.hasClass(animationEffectIn))
    {
      screen.removeClass(animationEffectIn);
    }
  }

  $("#"+navigation_map[0]).show();

  $(".back").click(function(){
    if(currentPosition>0)
    {
      console.log("Current Position:"+currentPosition);
      hidePreviousScreen(currentPosition);
      currentPosition--;
      showCurrentScreen(currentPosition);
    }


  });

  $(".next").click(function(){
    console.log("Current Position:"+currentPosition);
    var textInbutton=$(this).html();
    getUserChoices(textInbutton);
    if(currentPosition<navigation_map.length-1)
    {
      hidePreviousScreen(currentPosition);
      currentPosition++;
      showCurrentScreen(currentPosition);
    }
    console.log(currentPosition);
    if(currentPosition===4)
    {
      createGame();
    }
  });

  $(".menu").click(function(){
    hidePreviousScreen(currentPosition);
    currentPosition=0;
    showCurrentScreen(currentPosition);
  })

  function hidePreviousScreen(currentPosition){
    var currentScreen=$("#"+navigation_map[currentPosition]);
    removeAnimationFromScreen(currentScreen);
    currentScreen.hide(300);
  }

  function createGame() {
    if (playWithAI) {
      var aiPlaysFirst = $(".ai-play-first input").prop("checked");
      if (aiPlaysFirst) {
        playerLetterChoice = player2LetterChoice;
        aiPlay();
      } else {
        humanPlay();
      }
    } else {
      humanPlay();
    }
  }

  //Recuperation des donnees saisies par l'utilisateur
  function getUserChoices(str){
    var str=str.replace(/<.*>/g,"");
    str=str.replace(/\W?/g,"");
    str=str.toUpperCase();
    switch(str){
      case "PLAYWITHAI":
      playWithAI=true;
      $(".player2-input-box").hide();
      $(".ai-play-first").show();
      break;
      case "PLAYWITHHUMAN":
      playWithAI=false;
      $(".player2-input-box").show();
      $(".ai-play-first").hide();
      break;
      case "SUBMIT":
      if(!playWithAI){
        player2Name=$("#player2Name").val();
        player2Name=(player2Name==="")?"NO NAME":player2Name;
      }else{
        player2Name="AI";
      }
      player1Name=$("#player1Name").val();
      player1Name=(player1Name==="")?"NO NAME":player1Name;
      $("#player1").html(player1Name);
      $("#player2").html(player2Name);
      break;
      case "X":
      case "O":
      player1LetterChoice=str;
      player2LetterChoice=(player1LetterChoice==="X")?"O":"X";
      playerLetterChoice=player1LetterChoice;
      console.log("player1LetterChoice: "+player1LetterChoice+"\n"+"player2LetterChoice: "+player2LetterChoice);
      break;
    }
  }

  function aiPlay() {
    if(gameState()!==undefined)
    {
      return 0;
    }
    $("#tic-tac-toe-ui td").off('click');//Human Player Can't click on the board while AI is playing
    var casesVides = [];
    var random = 0;    /**Choisir une case vide aleatoire**/
    for (var i = 0; i < ticTacToeTable.length; i++) {
      for (var j = 0; j < ticTacToeTable.length; j++) {
        if (ticTacToeTable[i][j] == 0) {
          casesVides.push([i,j]);
        }
      }
    }
    random = Math.floor(Math.random()*casesVides.length);
    var caseAleatoire=casesVides[random];
    var choiceRow=caseAleatoire[0];
    var choiceCol=caseAleatoire[1];
    $("#" + "row-" + choiceRow + "-col-"+choiceCol).html(playerLetterChoice);
    updateTicTacToeGame(choiceRow, choiceCol);
    caseNonVide++;
    // alert(caseNonVide);
    playerLetterChoice = (playerLetterChoice === player1LetterChoice) ? player2LetterChoice : player1LetterChoice;
    humanPlay();
  }

  function humanPlay() {
    var clickCoordinates = "";
    var row = "";
    var col = "";
    $("#tic-tac-toe-ui td").click(function() {
      if(playWithAI)// If human is playing with AI he can't click twice in a row. He click once then AI plays.
      {
        $("#tic-tac-toe-ui td").off('click');
      }
      if ($(this).html() === "") {
        $(this).html(playerLetterChoice);
        clickCoordinates = $(this).attr('id').replace(/row-(\d)-col-(\d)/, "$1$2"); // tranform id "row-1-col-2" to "12" for example
        row = clickCoordinates[0];
        col = clickCoordinates[1];
        caseNonVide++;
        // alert(caseNonVide);
        updateTicTacToeGame(row, col);
        playerLetterChoice = (playerLetterChoice === player1LetterChoice) ? player2LetterChoice : player1LetterChoice;
        // alert(gameState());
        if (playWithAI) {
          setTimeout(function() {
            aiPlay();
          }, 1000);
        }
      }
    })
  }

  function updateTicTacToeGame(row, col) {
    var whichPlayerCoefficient = (playerLetterChoice === player2LetterChoice) ? player2WinningCoefficientTracker : player1WinningCoefficientTracker;
    ticTacToeTable[row][col] = whichPlayerCoefficient;
    checkGameState(row,col,whichPlayerCoefficient);
  }

  function checkGameState(row, col,playerCoefficient) {
    //****DIAGONALS
    //Update Left Diagonal
    if (row === col) {
      leftDiagonal += playerCoefficient;
    }
    //Update Right Diagonal
    if ((row == 0 && col == 2) || (row == 1 && col == 1) || (row == 2 && col == 0)) {
      rightDiagonal += playerCoefficient;
    }
    //Update Verticals
    switch (col) {
      case 0:
      leftVertical += playerCoefficient;
      break;
      case 1:
      centerVertical += playerCoefficient;
      break;
      case 2:
      rightVertical += playerCoefficient;
      break;
    }
    //Update horizontals
    switch (row) {
      case 0:
      topHorizontal += playerCoefficient;
      break;
      case 1:
      centerHorizontal += playerCoefficient;
      break;
      case 2:
      bottomHorizontal += playerCoefficient;
      break;
    }

    // $(".game-result-box td").html(gameResult());
    var gameStates = gameState();
    if (gameStates !== undefined) {
      $(".game-results-box p").html(gameStates);
      alert(player1LetterChoice);
      initValues();
      setTimeout(function() {
        createGame();
      }, 2000);
    }
    // console.log("******DIAGONAL************");
    // console.log("Left Diagonal:"+leftDiagonal);
    // console.log("Right Diagonal"+rightDiagonal);
    // console.log("*******VERTICAL*************")
    // console.log("Left Vertical:"+leftVertical);
    // console.log("Center Vertical:"+centerVertical);
    // console.log("Right Vertical"+rightVertical);
    // console.log("******HORIZONTAL**************")
    // console.log("Top Horizontal:"+topHorizontal);
    // console.log("Middle Horizontal:"+centerHorizontal);
    // console.log("Bottom Horizontal:"+bottomHorizontal);
  }


  function gameState() {
    var directions=[topHorizontal,centerHorizontal,bottomHorizontal,leftVertical,centerVertical,rightVertical,leftDiagonal,rightDiagonal];
    for (var i=0;i<directions.length;i++)
    {
      if(directions[i]===player1WinningCoefficient)
      {
        return player1Name+ " Won!";
      }

      if(directions[i]===player2WinningCoefficient)
      {
        return player2Name+ " Won!";
      }

    }

    if (caseNonVide === 9) {
      return "DRAW!!";
    }
  }
})

function initValues(){
  player1Name=$("#player1Name").val();
  playWithAI=$(".ai-play-first input").prop("checked");
  playWithAI=$(".ai-play-first input").prop("checked");
  player2Name=(playWithAI)?"AI":$("#player2Name").val();
  caseNonVide=0;
  leftDiagonal="";
  rightDiagonal="";
  leftVertical="";
  centerVertical="";
  rightVertical="";
  topHorizontal="";
  bottomHorizontal="";
  middleHorizontal="";
  player1WinningCoefficientTracker="1";
  player2WinningCoefficientTracker="2";
  ticTacToeTable=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  $("#tic-tac-toe-ui td").html("");
  $(".game-results-box p").html("");
}
