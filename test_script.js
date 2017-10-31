// JavaScript Document
var plane_size = initialize();
var plane = document.getElementById("plane");//tbody
var turn = 1;
var won = false;
make_plane();
var chess = document.getElementsByClassName("chess");
setInterval(update,100);


function initialize() {
  while (true) {
    var pre = prompt("请设置你的棋盘大小：\n（16到32（包含）的数字）");
    var patt = /\d/
    for (var i = 0; i < pre.length ; i++){
      if (!pre[i].match(patt)) {break;}
      if(i == pre.length-1 ){
        pre = parseInt(pre);
        if (pre<16||pre>32) {break;}
        return pre;
      }
    }
    alert("请输入正确的值！")
  }


}

function update() {

  judge();
  change_color();
  $("#turn").html("回合："+turn);
  var txt
  if (won) {
    txt = "游戏结束"
  }else {
    if (get_player()==0) {
      txt = "蓝方执子"
    }else{
      txt = "红方执子"
    }
  }

  $("#player").html(txt);

}


function make_plane(){
  "use strict"
	var y = 1;
	while (y<=plane_size){
		var new_tr = document.createElement("tr");
		var x = 1;

		while (x<=plane_size){
			var new_td = document.createElement("td");
			var new_div = document.createElement("div");
			var chess = document.createElement("div");
			new_div.setAttribute("class","point");
			chess.setAttribute("class","chess");
			chess.setAttribute("x",x);
			chess.setAttribute("y",y);
			chess.setAttribute("state","off");
			chess.setAttribute("player",null);
			//chess.setAttribute("onClick","place(event)");
			new_div.appendChild(chess);
			new_td.appendChild(new_div);
			new_tr.appendChild(new_td);
			x += 1;
		}

		plane.appendChild(new_tr);
		y+=1;
	}
}

function judge(){
	for (var i in chess){
    if (chess[i].style == undefined) {continue;}
    if (chess[i].getAttribute("state")=="off"){continue;}
    x = parseInt(chess[i].getAttribute("x"));
    y = parseInt(chess[i].getAttribute("y"));
    p = chess[i].getAttribute("player");
    var a = 1;
    while (a<=4){
      if (x+a>plane_size){break;}

      if (get_chess(x+a,y).getAttribute("state")=="off") {break;}
      if (get_chess(x+a,y).getAttribute("player")!=p) {break;}
      a+=1
      if (a<=4){continue;}
      win(get_player)
    }
    var b = 1;
    while (b<=4){
      if (y+b>plane_size){break;}
      if (get_chess(x,y+b).getAttribute("state")=="off") {break;}
      if (get_chess(x,y+b).getAttribute("player")!=p) {break;}
      b+=1;
      if (b<=4){continue;}
      win(get_player)
    }
    var c = 1;
    while (c<=4){
      if (x+c>plane_size){break;}
      if (y+c>plane_size){break;}
      if (get_chess(x+c,y+c).getAttribute("state")=="off") {break;}
      if (get_chess(x+c,y+c).getAttribute("player")!=p) {break;}
      c+=1;
      if (c<=4){continue;}
      win(get_player)
    }
    var d = 1;
    while (d<=4){
      if (y-d<=0){break;}
      if (x+d>plane_size){break;}
      if (get_chess(x+d,y-d).getAttribute("state")=="off") {break;}
      if (get_chess(x+d,y-d).getAttribute("player")!=p) {break;}
      d+=1;
      if (d<=4){continue;}
      win(get_player)
    }
  }
}

function win(player) {
  if (won) {
    return;
  }
  won = true;
  $("#ann").css("opacity","1")
  var txt
  switch (get_player()) {
    case 0:
      txt = "红色玩家赢啦！"
      $("#ann").css("background-color","brown");
      break;
    case 1:
      txt = "蓝色玩家赢啦！"
      $("#ann").css("background-color","blue");
      break;
  }
  $("#ann").html(txt);
  alert(txt);
}

function get_player(){
	"use strict";
	if(turn%2 === 0){
		return 0;
	}else{return 1;}

}
//0蓝，1红
function get_chess(x,y){
	for (var i in chess){
    if (chess[i].style == undefined) {continue;}
		if (chess[i].getAttribute("x")!=x||chess[i].getAttribute("y")!=y){continue;}
		return chess[i];
	}
}

function change_color() {
  for (var i in chess){
    if (chess[i].style == undefined) {continue;}
    if (chess[i].getAttribute("state") == "on") {continue;}
    if (won) {
      $("#main").css("background-color","rgb(238, 249, 34)");
      return;
    }
    if (get_player()==1) {
      chess[i].style.backgroundColor="brown";
      $("#main").css("background-color","rgba(232,133,135,1.00)");
    }else {
      chess[i].style.backgroundColor="blue";
      $("#main").css("background-color","rgba(110,190,250,1.00)");
    }
  }
}

function reset(){
  won = false;
  turn = 1;
  for (var i in chess){
    if (chess[i].style == undefined) {continue;}
		chess[i].setAttribute("state","off");
    chess[i].setAttribute("player",null);
    chess[i].style.opacity = 0;
	}
  $("#ann").css("opacity","0")
}

function surrender(){
  var p
  if (get_player()==1) {
    p = 0;
  }else {
    p = 1;
  }
  win(p)

}

$(function () {
  $(".chess").click(function(){
    if ($(this).attr("state")=="on") {
      alert("这里已经有棋子啦！");
      return;
    }
    if (won) {
      alert("游戏已经结束，请重新开始吧！");
      return;
    }
    $(this).attr("state","on");
    $(this).css("opacity","1.0");
    $(this).css("border-radius","0.5em");
    $(this).attr("player",get_player());
    turn += 1;



  })

})
