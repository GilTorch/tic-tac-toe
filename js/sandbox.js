var players={
  "1":{name:"PLAYER 1",winningCoefficient:"111",winningCoefficientTracker:"1",letter:"X"},
  "2":{name:"PLAYER 2",winningCoefficient:"222",winningCoefficientTracker:"2",letter:"O"}
};

for(var elements in players)
{
  if(players[elements].letter==="X")
  {
    console.log(players[elements].name);
  }
}
