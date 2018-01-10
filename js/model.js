var Model=function(vue){
  var vue=vue;
  var that=this;
  this.playWithAI=false;
  var players={
    "1":{name:"Player 1",winningCoefficient:"111",winningCoefficientTracker:"1",letter:"X"},
    "2":{name:"Player 2",winningCoefficient:"222",winningCoefficientTracker:"2",letter:"O"}
  };
  this.currentPlayer=players[1];
  var aiPlaysFirst=true;
  that.humanHasPlayed=true;
  this.gameIsOver=false;
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
        var player2Name=vue.getPlayerName("player2");
        if(player2Name==="")
        {
          player2Name="Player 2";
        }
        players[2].name=player2Name;
      }else{
        players[2].name="Computer";
      }
      var player1Name=vue.getPlayerName("player1");
      if(player1Name==="")
      {
        player1Name="Player 1";
      }
      players[1].name=player1Name;
      vue.displayPlayerNames(players[1].name,players[2].name);
      break;
      case "X":
      case "O":
      players[1].letter=str;
      players[2].letter=(players[1].letter==="X")?"O":"X";
          // console.log("player1LetterChoice: "+player1LetterChoice+"\n"+"player2LetterChoice: "+player2LetterChoice);
      break;
    }
  }

  this.changePlayer=function(){
    this.currentPlayer=(this.currentPlayer===players[1])?players[2]:players[1];
  }

  this.createTicTacToeGame=function(){
    initValues();
    if (that.playWithAI) {
      aiPlaysFirst = $(".ai-play-first input").prop("checked");
      if (aiPlaysFirst) {
        this.currentPlayer=players[2];
        that.aiPlay();
      }
    }
    else{
      vue.showPlayerTurn(players[1].name);
      this.currentPlayer=players[1];
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
  }

  this.humanPlay=function(row,col){
    that.updateTicTacToeGame(row,col);
    if(that.playWithAI)
    {
      that.humanHasPlayed=true;
      setTimeout(function(){
        if(!that.gameIsOver)
          that.aiPlay();
      },1000);
    }
  }

  this.updateTicTacToeGame=function(row,col){
    var whichPlayerCoefficient=(this.currentPlayer.letter===players[2].letter)?players[2].winningCoefficientTracker:players[1].winningCoefficientTracker;
    that.ticTacToeTable[row][col] = whichPlayerCoefficient;
    vue.showLetterOnBoard(row,col,this.currentPlayer.letter);
    caseNonVide++;
    checkGameState();
    that.changePlayer();
    vue.showPlayerTurn(this.currentPlayer.name);
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
    if(gameResults(directions)!=="")
    {
      that.gameIsOver=true;
      vue.showResults(gameResults(directions));
      setTimeout(function(){
        initValues();
        that.createTicTacToeGame();
      },2000);
    }
}

  function gameResults(directions){
    var resultat="";
    if(caseNonVide===9){
      resultat="DRAW!!";
    }
    for (var i=0;i<directions.length;i++)
    {
      if(directions[i]===players[1].winningCoefficient)
      {
        resultat=players[1].name+ " Won!";
      }
      else if(directions[i]===players[2].winningCoefficient)
      {
        resultat=players[2].name+ " Won!";
      }
    }
    return resultat;
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
    that.gameIsOver=false;
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
