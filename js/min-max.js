function Max(jeu,profondeur)
{
     if(profondeur == 0 || gagnant(jeu)!=0)
     {
          return eval(jeu);
     }

     var max = -10000;
     var tmp;

     for(var i=0;i<3;i++)
     {
          for(var j=0;j<3;j++)
          {
                if(jeu[i][j] == 0)
                {
                      jeu[i][j] = 2;
                      tmp = Min(jeu,profondeur-1);

                      if(tmp > max)
                      {
                            max = tmp;
                      }
                      jeu[i][j] = 0;
                }
          }
     }

     return max;

}

function Min(jeu,profondeur)
{
     if(profondeur == 0 || gagnant(jeu)!=0)
     {
          return eval(jeu);
     }

     var min = 10000;
     var tmp;

     for(var i=0;i<3;i++)
     {
          for(var j=0;j<3;j++)
          {
                if(jeu[i][j] == 0)
                {
                      jeu[i][j] = 1;
                      tmp = Max(jeu,profondeur-1);
                      if(tmp < min)
                      {
                            min = tmp;
                      }
                      jeu[i][j] = 0;
                }
          }
     }
   return min;
}
