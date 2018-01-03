var Vue=function(){
 var screenAnimationEffect="animated fadeInLeftBig";
 this.navigation_map=[
   "main_heading",
   "choose-player",
   "player-names",
   "letter-choice-box",
   "tic-tac-toe-container"
 ];
 this.currentScreenPosition=0;

  this.showCurrentScreen=function(){
    var currentScreen=$("#"+this.navigation_map[this.currentScreenPosition]);
    currentScreen.show(800);
  };

  this.hidePreviousScreen=function(){
    var currentScreen=$("#"+this.navigation_map[this.currentScreenPosition]);
    currentScreen.hide(500);
  }

  this.showLetterOnBoard=function(ticTacToeBoard,letter){
     console.log("letter: "+letter);
     if(ticTacToeBoard.html()==="")
       ticTacToeBoard.html(letter);
  }

  this.showPlayerTurn=function(playerName){
    $(".show-player-turn p").html(playerName+" just played!");
  }

  this.showResults=function(result){
    $(".game-results-box p").html(result);
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
}
