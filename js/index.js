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
  var caseNonVide=0;
  var leftDiagonal="";
  var rightDiagonal="";
  var leftVertical="";
  var centerVertical="";
  var rightVertical="";
  var topHorizontal="";
  var bottomHorizontal="";
  var middleHorizontal="";
  var player1WinningCoefficientTracker="1";
  var player2WinningCoefficientTracker="2";
  var ticTacToeTable=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
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
  function updateTicTacToeGame(row,col){
    // alert("Player1 Letter Choice:"+player1LetterChoice);
    // alert("ligne:"+row+"Colomne"+col);
    if(playerLetterChoice===player1LetterChoice)
    {
      ticTacToeTable[row][col]=1;
    }
    else{
      ticTacToeTable[row][col]=2;
    }
  }
  var clickCoordinates="";
  var row="";
  var col="";
  $("#tic-tac-toe-ui td").click(function(){
    if($(this).html()==="")
    {
      $(this).html(playerLetterChoice);
      clickCoordinates=$(this).attr('id').replace(/row-(\d)-col-(\d)/,"$1$2");// tranform id "row-1-col-2" to "12" for example
      row=clickCoordinates[0];
      col=clickCoordinates[1];
      caseNonVide++;
      checkGameState(row,col);
      updateTicTacToeGame(row,col);
      playerLetterChoice=(playerLetterChoice===player1LetterChoice)?player2LetterChoice:player1LetterChoice;
    }
  })

}

function checkGameState(row,col){
  //Check Diagonals

  if(row===col)
  {
    if(playerLetterChoice===player1LetterChoice)
    {
      leftDiagonal+=player1WinningCoefficientTracker;
      if(row==1 && col===1)// row 1 column 1 is common to both diagonals
        rightDiagonal+=player1WinningCoefficientTracker;
    }
    else{
      leftDiagonal+=player2WinningCoefficientTracker;
      if(row==1 && col===1)
        rightDiagonal+=player2WinningCoefficientTracker;
    }
  }
  //Check Right Diagonal cas particulier
  if((row===0 && col===2)||(row===2 && col===0))
  {
    if(playerLetterChoice===player1LetterChoice)
    {
      rightDiagonal+=player1WinningCoefficientTracker;
    }
    else{
      rightDiagonal+=player2WinningCoefficientTracker;
    }
  }
 //Check Verticals
   switch(col)
   {
     case "0":
         leftVertical+=(playerLetterChoice===player1LetterChoice)?player2WinningCoefficientTracker:player1WinningCoefficientTracker;
       break;
     case "1":
           centerVertical+=(playerLetterChoice===player1LetterChoice)?player1WinningCoefficientTracker:player2WinningCoefficientTracker;
       break;
     case "2":
           rightVertical+=(playerLetterChoice===player1LetterChoice)?player1WinningCoefficientTracker:player2WinningCoefficientTracker;
       break;
   }
  // console.log("Center Vertical:"+centerVertical);
  //check horizontals
  switch(row)
  {
    case "0":
           topHorizontal+=(playerLetterChoice===player1LetterChoice)?player1WinningCoefficientTracker:player2WinningCoefficientTracker;
         break;
    case "1":
         middleHorizontal+=(playerLetterChoice===player1LetterChoice)?player1WinningCoefficientTracker:player2WinningCoefficientTracker;
        break;
    case "2":
          bottomHorizontal+=(playerLetterChoice===player1LetterChoice)?1:2;
        break;
  }
  console.log("Top Horizontal:"+topHorizontal);
  console.log("Center Horizontal:"+middleHorizontal);
  console.log("Bottom Horizontal:"+bottomHorizontal);

 // $(".game-result-box td").html(gameResult());
var gameResults=gameResult();
if(gameResults!==undefined)
{
  $(".game-results-box p").html(gameResults);
  gameRestart();
}

}


function gameResult()
{
  if(caseNonVide===9)
  {
    return "DRAW!!";
  }

  var player1WinningCoefficient="111";
  var player2WinningCoefficient="222";
  //**Horizontal****
  if(topHorizontal===player1WinningCoefficient || middleHorizontal===player1WinningCoefficient || bottomHorizontal===player1WinningCoefficient)
  {
    return player1Name+" Won!";
  }

  if(topHorizontal===player2WinningCoefficient || middleHorizontal===player2WinningCoefficient || bottomHorizontal===player2WinningCoefficient)
  {
    return player2Name+" Won!";
  }
  //**Vertical**
  if(leftVertical===player1WinningCoefficient || centerVertical===player1WinningCoefficient || rightVertical===player1WinningCoefficient)
  {
    return player1Name+" Won!";
  }

  if(leftVertical===player2WinningCoefficient || centerVertical===player2WinningCoefficient || rightVertical===player2WinningCoefficient)
  {
    return player2Name+" Won!";
  }

  //**Diagonals**
  if(leftDiagonal===player1WinningCoefficient || rightDiagonal===player1WinningCoefficient)
  {
    return player1Name+" Won!";
  }

  if(leftDiagonal===player2WinningCoefficient || rightDiagonal===player2WinningCoefficient)
  {
    return player2Name+" Won!";
  }
}

function gameRestart(){
  currentPosition=0;
  playWithAI=false;
  player1Name="";
  player2Name="AI";
  player1LetterChoice="X";
  player2LetterChoice="O";
  playerLetterChoice=player1LetterChoice;
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

  // for(var i=0;i<navigation_map.length;i++)
  // {
  //   $("#"+navigation_map[i]).hide();
  // }
  //
  // $("#"+navigation_map[0]).show();

  $(".game-results-box p").html("");
}


createGame();
})
