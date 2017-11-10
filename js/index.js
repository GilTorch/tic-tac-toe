$(document).ready(function(){
  var animationEffectIn="animated fadeInLeftBig";
  var animationEffectOut="animated bounce";
  var currentPosition=0;
  var playWithAI=false;
  var player1Name="";
  var player2Name="AI";
  var player1LetterChoice="X";
  var player2LetterChoice="O";
  var playerLetterChoice=player1LetterChoice;

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
    else if(screen.hasClass(animationEffectOut)){
      screen.removeClass(animationEffectOut);
    }
  }

  $("#"+navigation_map[0]).show();

  $(".back").click(function(){
    if(currentPosition>0)
    {
      hidePreviousScreen(currentPosition);
      currentPosition--;
      showCurrentScreen(currentPosition);
    }
  });

  $(".next").click(function(){
    var textInbutton=$(this).html();
    getUserChoices(textInbutton);
    if(currentPosition<navigation_map.length-1)
    {
      hidePreviousScreen(currentPosition);
      currentPosition++;
      showCurrentScreen(currentPosition);
    }
  });

  $(".menu").click(function(){
    hidePreviousScreen(currentPosition);
    currentPosition=0;
    showCurrentScreen(currentPosition);
  })

  function hidePreviousScreen(currentPosition){
    var screen=$("#"+navigation_map[currentPosition]);
    removeAnimationFromScreen(screen);
    // screen.addClass(animationEffectOut);
    screen.hide(300);
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
      break;
      case "PLAYWITHHUMAN":
      playWithAI=false;
      $(".player2-input-box").show();
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

//Creation du Tic-tac-toe en se servant des parametres de l'utilisatuer
function createGame(){
  var ticTacToeTable=[
    0,0,0,
    0,0,0,
    0,0,0,
  ];

  function updateTicTacToeGame(row,col,playerLetterChoice){

    if(playerLetterChoice===player1LetterChoice)
    {
      ticTacToeTable[row][col]=1;
    }
    else{
      ticTacToeTable[row][col]=2;
    }
   alert(ticTacToeTable);
  }

  function checkGameState(row,col){
    alert("OH");
    updateTicTacToeGame(row,col,playerLetterChoice);
    var sumDiagonals=0;
    for(var i=0;i<ticTacToeTable.length;i++)
    {
      for(var j=0;j<ticTacToeTable.length;j++)
      {
         if(i===j)
         {
           sumDiagonals+=ticTacToeTable[i][j]
         }
      }
    }
  }

  var clickCoordinates="";
  var row="";
  var col=""
  $("#tic-tac-toe-ui td").click(function(){
    if($(this).html()==="")
    {
      $(this).html(playerLetterChoice);
      playerLetterChoice=(playerLetterChoice===player1LetterChoice)?player2LetterChoice:player1LetterChoice;
      clickCoordinates=$(this).attr('id').replace(/row-(\d)-col-(\d)/,"$1$2");// tranform id "row-1-col-2" to "12" for example
      row=clickCoordinates[0];
      col=clickCoordiantes[1];
      checkGameState(row,col);
    }
  })

}
createGame();
})
