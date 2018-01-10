var Controller=function(vue,model){
var model=model;
var vue=vue;
var nextButton=$(".next");
var backButton=$(".back");
var menuButton=$(".menu");
var tictactoeBoard=$("#tic-tac-toe-ui td");

nextButton.click(function(){
  if(vue.currentScreenPosition<vue.navigation_map.length-1)
  {
    model.getUserChoices($(this).html());
    vue.hidePreviousScreen(vue.currentScreenPosition);
    vue.currentScreenPosition++;
    vue.showCurrentScreen(vue.currentScreenPosition);
  }
  if(vue.currentScreenPosition===4){
    model.createTicTacToeGame();
  }
});

backButton.click(function(){
  if(vue.currentScreenPosition>0)
  {
    vue.hidePreviousScreen(vue.currentScreenPosition);
    vue.currentScreenPosition--;
    vue.showCurrentScreen(vue.currentScreenPosition);
  }});


  tictactoeBoard.click(clickHandler);

  function clickHandler(){
    clickCoordinates = $(this).attr('id').replace(/row-(\d)-col-(\d)/, "$1$2"); // tranform id "row-1-col-2" to "12" for example
    row = clickCoordinates[0];
    col = clickCoordinates[1];
    if(model.playWithAI)
    {
      if(!model.humanHasPlayed)
      {
        if(model.ticTacToeTable[row][col]===0)
        {
          model.humanPlay(row,col)
        }
      }
    }
    else{
      if(model.ticTacToeTable[row][col]===0)
      {
        model.humanPlay(row,col)
      }
    }
  }


menuButton.click(function(){
  vue.hidePreviousScreen(vue.currentScreenPosition);
  vue.currentScreenPosition=0;
  vue.showCurrentScreen(vue.currentScreenPosition);
});


}
