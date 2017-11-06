$(document).ready(function(){
var animationEffectIn="animated fadeInLeftBig";
var animationEffectOut="animated bounce";
var currentPosition=0;
var playWithAI=false;
var player1Name="";
var player2Name="AI";

var navigation_map=[
    "main_heading",
    "choose-player",
    "player-names",
    "letter-choice-box",
    "tic-tac-toe-container",
];

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


function getUserChoices(str){
  var str=str.replace(/<.*>/g,"");
  str=str.replace(/\W?/g,"");
  str=str.toUpperCase();
    switch(str){
    case "PLAYWITHAI":
    playWithAI=true;
    $("#player2").hide();
    break;
    case "PLAYWITHHUMAN":
    playWithAI=true;
    break;
    case "SUBMIT":
    if(!playWithAI){
      player2Name=$("#player2Name").val();
      player2Name=(player2Name==="")?"NO NAME":player2Name;
    }
    player1Name=$("#player1Name").val();
    player1Name=(player1Name==="")?"NO NAME":player2Name;
    $("#player1").html(player1Name);
    $("#player2").html(player2Name);
    break;
    case "X":
    case "O":
      console.log(str);
    break;
  }
}

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

$("#"+navigation_map[navigation_map.length-1]).hide();
 $("#"+navigation_map[0]).show();

// $(document).ready(function(){
// var animationEffectIn="animated fadeInLeftBig";
// var animationEffectOut="animated fadeOut";
// var currentPosition=0;
//
// var navigation_map=[
//     "main_heading",
//     "choose-player",
//     "player-names",
//     "letter-choice-box",
//     "tic-tac-toe-container",
// ];
//
// $(".back").click(function(){
//   if(currentPosition>0)
//   {
//     currentPosition--;
//     hideAllOtherScreens();
//     showCurrentScreen(currentPosition);
//   }
// });
//
// $(".next").click(function(){
//   if(currentPosition<navigation_map.length-1)
//   {
//
//     hideAllOtherScreens();
//     currentPosition++;
//     showCurrentScreen(currentPosition);
//   }
// });
//
// $(".menu").click(function(){
//   currentPosition=0;
//   hideAllOtherScreens();
//   showCurrentScreen(currentPosition);
// })
//
// function hideAllOtherScreens(){
//   for(var i=0;i<navigation_map.length;i++)
//   {
//     var screen=$("#"+navigation_map[i]);
//     removeAnimationFromScreen(screen);
//     screen.addClass(animationEffectOut).hide();
//   }
// }
//
// function showCurrentScreen(currentPosition){
//     var screen=$("#"+navigation_map[currentPosition]);
//     removeAnimationFromScreen(screen);
//     screen.show().addClass(animationEffectIn);
// }
//
// function removeAnimationFromScreen(screen){
//   if(screen.hasClass(animationEffectIn))
//   {
//     screen.removeClass(animationEffectIn);
//   }
//   else if(screen.hasClass(animationEffectOut)){
//     screen.removeClass(animationEffectOut);
//   }
// }
//
// $("#"+navigation_map[navigation_map.length-1]).hide();
//  $("#"+navigation_map[0]).show();

// $("#tic-tac-toe-container").hide();
// $(".button-group").hide();
// $("#main_heading").show();
//
// $("#start-the-game").click(function(){
// $(".button-group").show().addClass(animationEffectIn);
// $("#choose-player").show().addClass(animationEffectIn);
// $("#main_heading").show().addClass(animationEffectOut);
// });
//
// $("#choose-player span").click(function(){
//    $("#choose-player").removeClass(animationEffectIn).addClass(animationEffectOut);
//    $("#player-names").show().addClass(animationEffectIn);
// });
//
// $("#submit_names").click(function(){
//    $("#player-names").removeClass(animationEffectIn).addClass(animationEffectOut);
//    $("#letter-choice-box").show().addClass(animationEffectIn);
// });
//
// $(".letters").click(function(){
//   $("#letter-choice-box").removeClass(animationEffectIn).addClass(animationEffectOut);
//   $("#tic-tac-toe-container").show().addClass(animationEffectIn);
//   $("#players-box").show().addClass(animatedEffectIn);
// })


// var letterChoices=["o","x"];
// var player1Choice=$("letter-choice");
// var player1Letter=player1Choice;
// var player2Letter=letterChoices.filter(function(x){
//   return x!==player1Letter;
// }).join("");
// var switchTurn=false;
// var cellules=$(".td");
// cellules.click(function(){
// if(switchTurn)
// {
//   cellules.html(player1Letter);
// }
// else{
//   cellules.html(player2Letter);
// }
// switchTurn=!switchTurn;
// })



})
