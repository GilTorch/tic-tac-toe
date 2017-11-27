$(document).ready(function(){
  var animationEffectIn="animated fadeInLeftBig";
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
  }

  $("#"+navigation_map[0]).show();

  $(".back").click(function(){
    if(currentPosition>0)
    {
      if(currentPosition===navigation_map.length-1)
        {
          gameRestart();
        }
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
      createGame();
    break;
  }
}

//Creation du Tic-tac-toe en se servant des parametres de l'utilisatuer
function createGame(){
  if(playWithAI)
  {
    alert("PLAY WITH AI");
    var aiPlaysFirst=$(".ai-play-first input").prop("checked");
    if(aiPlaysFirst)
    {
      aiPlay();
    }
    else{
      humanPlay();
    }
  }
  else{
    humanPlay();
  }
}

function aiPlay(){
  var casesVides=[];
  /**Choisir une case vide aleatoire**/
  for(var i=0;i<ticTacToeTable.length;i++)
  {
     for(var j=0;j<ticTacToeTable.length;j++)
     {
       if(ticTacToeTable[i][j]==0)
       {
         var emptyArray=[];
         emptyArray.push(i)
         emptyArray.push(j);
         casesVides.push(emptyArray);
       }
     }
  }

  var random=Math.floor(Math.random()*casesVides.length);
  var choice=casesVides[random];
  console.log("AI CHOICE:"+choice);
  var choiceRow=choice[0];
  var choiceCol=choice[1];
  checkGameState(choiceRow,choiceCol);
  updateTicTacToeGame(choiceRow,choiceCol);
  $("#"+"row-"+choiceRow+"-col-"+choiceCol).html(playerLetterChoice);
  playerLetterChoice=(playerLetterChoice===player1LetterChoice)?player2LetterChoice:player1LetterChoice;
  humanPlay();
}

function humanPlay(){
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
        if(playWithAI)
        {
          setTimeout(function(){
            aiPlay();
          },1000);
        }
      }
    })
  }

function updateTicTacToeGame(row,col){
  // alert("Player1 Letter Choice:"+player1LetterChoice);
  // alert("ligne:"+row+"Colomne"+col);
  if(playerLetterChoice===player1LetterChoice)
  {
    ticTacToeTable[row][col]=player1WinningCoefficientTracker;
  }
  else{
    ticTacToeTable[row][col]=player2WinningCoefficientTracker;
  }
}

function checkGameState(row,col){
  //Check Diagonals
  if(row===col)
  {
    if(playerLetterChoice===player1LetterChoice)
    {
      leftDiagonal+=player1WinningCoefficientTracker;
    }
    else{
      leftDiagonal+=player2WinningCoefficientTracker;
    }
  }
  //Check Right Diagonal cas particulier
  if((row==0 && col==2) || (row==1 && col==1) || (row==2 && col==0))
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
  // console.log("Top Horizontal:"+topHorizontal);
  // console.log("Center Horizontal:"+middleHorizontal);
  // console.log("Bottom Horizontal:"+bottomHorizontal);

 // $(".game-result-box td").html(gameResult());
var gameStates=gameState();
if(gameStates!==undefined)
{
  $(".game-results-box p").html(gameStates);
  setTimeout(function(){
      gameRestart();
  },2000);
}

console.log("RIGHT DIAGONAL:"+rightDiagonal);

}


function gameState()
{
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

  if(caseNonVide===9)
  {
    return "DRAW!!";
  }


}

function gameRestart(){
  player1Name=$("#player1Name").val();
  player2Name=(playWithAI)?"AI":$("#player2Name").val();
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
  var aiPlaysFirst=$(".ai-play-first input").prop("checked");
  ticTacToeTable=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  $("#tic-tac-toe-ui td").html("");
  $(".game-results-box p").html("");
}
})
