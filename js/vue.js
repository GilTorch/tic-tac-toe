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

  this.showLetterOnBoard=function(row,col,letter){
    var ticTacToeBoard=$("#"+"row-"+row+"-col-"+col);
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

  this.showAiPlayFirstBox=function(){
    $(".ai-play-first").show();
  }

  this.hideAiPlayFirstBox=function(){
    $(".ai-play-first").hide();
  }

  this.displayPlayerNames=function(name1,name2){
    $("#player1").html(name1);
    $("#player2").html(name2);
  }

  this.showPlayer2InputField=function(){
    $(".player2-input-box").show();
  }

  this.hidePlayer2InputField=function(){
    $(".player2-input-box").hide();
  }
}
