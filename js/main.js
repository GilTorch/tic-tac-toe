$(document).ready(function(){
  var vue=new Vue();
  var model=new Model(vue);
  var controller=new Controller(vue,model);
})
