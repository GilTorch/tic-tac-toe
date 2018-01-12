var Vue=function(){
 var screenAnimationEffect="animated fadeInLeftBig";
 this.navigation_map=[
   "welcome-screen",
   "choose-opponent",
   "player-names",
   "letter-choice-box",
   "tic-tac-toe-container"
 ];
 this.currentScreenPosition=0;

  this.getPlayerName=function(player)
  {
    return $("#"+player+"Name").val();
  }

  this.showCurrentScreen=function(){
    var currentScreen=$("#"+this.navigation_map[this.currentScreenPosition]);
    currentScreen.show(800);
  };

  this.hidePreviousScreen=function(){
    var currentScreen=$("#"+this.navigation_map[this.currentScreenPosition]);
    currentScreen.hide(500);
  }

  this.showLetterOnBoard=function(row,col,letter){
    var ticTacToeBoard=$("#"+"row-"+row+"-col-"+col);
     if(ticTacToeBoard.html()==="")
     {
       if(letter==="X")
       {
         if(ticTacToeBoard.hasClass("o-letter"))
           ticTacToeBoard.removeClass("o-letter");
         ticTacToeBoard.addClass("x-letter");
       }
       else {
         if(ticTacToeBoard.hasClass("x-letter"))
           ticTacToeBoard.removeClass("x-letter");
         ticTacToeBoard.addClass("o-letter");
       }
       ticTacToeBoard.html(letter);

     }
  }

  this.showPlayerTurn=function(playerName){
    console.log(playerName);
    $(".show-player-turn p").html(playerName+" turn!");
  }

  this.showResults=function(result){
    $(".game-results-box p").html(result);
  }

  this.hightLightTheWinner=function(direction){
      for(var i=0;i<3;i++)
      {
        for(var j=0;j<3;j++)
        {
          if ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0))
          {
            if(direction==="Right Diagonal")
            {
              addWinnerClass(i,j);
            }
          }
          if(i===j)
          {
            if(direction==="Left Diagonal")
            {
              addWinnerClass(i,j);
            }
          }

          switch(i)
          {
            case 0:
            if(direction==="Top Horizontal")
            {
              addWinnerClass(i,j);
            }
            break;
            case 1:
            if(direction==="Center Horizontal")
            {
              addWinnerClass(i,j);
            }
            break;
            case 2:
            if(direction==="Bottom Horizontal")
            {
              addWinnerClass(i,j);
            }
            break;
          }

          switch(j)
          {
            case 0:
            if(direction==="Left Vertical")
            {
              addWinnerClass(i,j);
            }
            break;
            case 1:
            if(direction==="Center Vertical")
            {
              addWinnerClass(i,j);
            }
            break;
            case 2:
            if(direction==="Right Vertical")
            {
              addWinnerClass(i,j);
            }
            break;
          }
        }
      }
}

function addWinnerClass(i,j){
  var cell=$("#"+"row-"+i+"-col-"+j);
  cell.addClass("winner");
}

  this.removeWinnerClass=function(){
    for(var row=0;row<3;row++)
    {
      for(var col=0;col<3;col++)
      {
        var cell=$("#"+"row-"+row+"-col-"+col);
        cell.removeClass("winner");
      }
    }
  }

  this.clearTicTacToeBoard=function(){
    $("#tic-tac-toe-ui td").html("");
  }

  this.clearPlayerTurn=function(){
    $(".show-player-turn p").html("");
  }

  this.clearResults=function(){
    $(".game-results-box p").html("");
  }
  this.showCurrentScreen(this.currentScreenPosition);

  this.showAiPlayFirstBox=function(){
    $(".ai-play-first").show();
  }

  this.hideAiPlayFirstBox=function(){
    $(".ai-play-first").hide();
  }

  this.updatePlayersScore=function(players){
    $("#player1-score").html(players[1].score);
    $("#player2-score").html(players[2].score);
  }

  this.clearPlayersScore=function(){
    $(".player1-score").html("0");
    $(".player2-score").html("0");
  }

  this.displayPlayerNames=function(name1,name2){
    $("#player1").html(name1+":");
    $("#player2").html(name2+":");
  }

  this.showPlayer2InputField=function(){
    $(".player2-input-box").show();
  }

  this.hidePlayer2InputField=function(){
    $(".player2-input-box").hide();
  }
}
