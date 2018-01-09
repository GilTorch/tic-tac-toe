var Model=function(vue){
  var vue=vue;
  var that=this;
  var player1WinningCoefficientTracker="1";
  var player2WinningCoefficientTracker="2";
  var player1WinningCoefficient="111";
  var player2WinningCoefficient="222";
  this.playWithAI=false;
  var player1Name="NO NAME";
  var player2Name="AI";
  this.playerName=player1Name;
  var player1LetterChoice="X";
  var player2LetterChoice="O";
  this.playerLetterChoice=player1LetterChoice;
  var aiPlaysFirst=true;
  that.humanHasPlayed=true;
  that.ticTacToeTable=[
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ]

  caseNonVide = 0;


  this.getUserChoices=function(str){
    var str=str.replace(/<.*>/g,"");
    str=str.replace(/\W?/g,"");
    str=str.toUpperCase();
    switch(str){
      case "PLAYWITHAI":
      that.playWithAI=true;
      vue.hidePlayer2InputField();
      vue.showAiPlayFirstBox();
      break;
      case "PLAYWITHHUMAN":
      that.playWithAI=false;
      vue.showPlayer2InputField();
      vue.hideAiPlayFirstBox();
      break;
      case "SUBMIT":
      if(!that.playWithAI){
        player2Name=$("#player2Name").val();
        player2Name=(player2Name==="")?"NO NAME":player2Name;
      }else{
        player2Name="AI";
      }
      player1Name=$("#player1Name").val();
      player1Name=(player1Name==="")?"NO NAME":player1Name;
      vue.displayPlayerNames(player1Name,player2Name);
      break;
      case "X":
      case "O":
      player1LetterChoice=str;
      player2LetterChoice=(player1LetterChoice==="X")?"O":"X";
      this.playerName=player1Name;
      this.playerLetterChoice=player1LetterChoice;
      // console.log("player1LetterChoice: "+player1LetterChoice+"\n"+"player2LetterChoice: "+player2LetterChoice);
      break;
    }
  }

  this.changePlayer=function(){
    this.playerLetterChoice = (this.playerLetterChoice === player1LetterChoice) ? player2LetterChoice : player1LetterChoice;
    this.playerName = (this.playerName === player1Name) ? player2Name : player1Name;
  }

  this.createTicTacToeGame=function(){
    initValues();
    if (that.playWithAI) {
      aiPlaysFirst = $(".ai-play-first input").prop("checked");
      if (aiPlaysFirst) {
        that.aiPlay();
      }
    }
  }

this.aiPlay=function() {
    that.humanHasPlayed=false;
    var casesVides = [];
    var random = 0;    /**Choisir une case vide aleatoire**/
    for (var i = 0; i < that.ticTacToeTable.length; i++) {
      for (var j = 0; j < that.ticTacToeTable.length; j++) {
        if (that.ticTacToeTable[i][j] == 0) {
          casesVides.push([i,j]);
        }
      }
    }
    random = Math.floor(Math.random()*casesVides.length);
    var caseAleatoire=casesVides[random];
    var choiceRow=caseAleatoire[0];
    var choiceCol=caseAleatoire[1];

    that.updateTicTacToeGame(choiceRow, choiceCol);
    // alert(caseNonVide);
  }

  this.humanPlay=function(row,col){
    that.updateTicTacToeGame(row,col);
    if(that.playWithAI)
    {
      that.humanHasPlayed=true;
      setTimeout(function(){
      that.aiPlay();
      },1000);
    }
  }

  this.updateTicTacToeGame=function(row,col){
    var whichPlayerCoefficient = (this.playerLetterChoice === player2LetterChoice) ? player2WinningCoefficientTracker : player1WinningCoefficientTracker;
    that.ticTacToeTable[row][col] = whichPlayerCoefficient;
    vue.showLetterOnBoard(row,col,that.playerLetterChoice);
    caseNonVide++;
    checkGameState();
    that.changePlayer();
    vue.showPlayerTurn(that.playerName);
  }

  function checkGameState(){
    console.log("TIC TAC TOE MATRIX: "+that.ticTacToeTable);
    var sumLeftDiagonal="";
    var sumRightDiagonal="";
    var sumLeftVertical="";
    var sumLeftVertical="";
    var sumCenterVertical="";
    var sumRightVertical="";
    var sumTopHorizontal="";
    var sumCenterHorizontal="";
    var sumBottomHorizontal="";
    var result="";
    for(var i=0;i<3;i++)
    {
      for(var j=0;j<3;j++)
      {
        if ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0))
        {
          sumRightDiagonal+=that.ticTacToeTable[i][j]
        }
        if(i===j)
        {
          sumLeftDiagonal+=that.ticTacToeTable[i][j];
        }

        switch(i)
        {
          case 0:
          sumTopHorizontal+=that.ticTacToeTable[i][j];
          break;
          case 1:
          sumCenterHorizontal+=that.ticTacToeTable[i][j];
          break;
          case 2:
          sumBottomHorizontal+=that.ticTacToeTable[i][j];
          break;
        }

        switch(j)
        {
          case 0:
          sumLeftVertical+=that.ticTacToeTable[i][j];
          break;
          case 1:
          sumCenterVertical+=that.ticTacToeTable[i][j];
          break;
          case 2:
          sumRightVertical+=that.ticTacToeTable[i][j];
          break;
        }
      }
    }

    var directions=[sumTopHorizontal,sumCenterHorizontal,sumBottomHorizontal,sumLeftVertical,sumCenterVertical,sumRightVertical,sumLeftDiagonal,sumRightDiagonal];

    gameResults(directions);


  }

  function gameResults(directions){
    var result="";
    if(caseNonVide===9){
      result="DRAW!!";
    }
    for (var i=0;i<directions.length;i++)
    {

      if(directions[i]===player1WinningCoefficient)
      {
        result=player1Name+ " Won!";
      }
      else if(directions[i]===player2WinningCoefficient)
      {
        result=player2Name+ " Won!";
      }
    }

    if(result!=="")
    {
      vue.showResults(result);
      setTimeout(function(){
        initValues();
        that.createTicTacToeGame();
      },2000);
    }
  }


  function initValues(){
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
    that.ticTacToeTable=[
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    vue.clearPlayerTurn();
    vue.clearTicTacToeBoard();
    vue.clearResults();
  }
}
