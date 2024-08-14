let one = 0
function func(expr) {
 new Function(expr)();
}
function user(user){
  return Login;
}
function Func(javascript){
  Function(javascript);
}
function tp(user,x,y){
  
}
function xp(user,xp){
  
}
function give(user,item,amount){
  
}
function summon(type,name,count,json){
  
}
function zn(){
  
}
function gamerule(gamerule,value){
  
}
function setting(setting,value){
  
}
let CMD = ["user","function","tp","xp","give","summon","zn","gamerule","setting"]
function command(command){
  if (!CMD.some(command)){
    dialog(`${command}は、現在のユーザー権限では認識できないコマンドです。`)
  }else{
    try{
      let returner = func(command);
    }catch(e){
      one = 1;
      console.error("Error"+e);
      return ("Error"+e);
    }finally{
      if(one!=0){
      console.log(returner)
      }
      one = 0;
    }
      }
}