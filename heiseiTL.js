//問題と解答
qa = new Array();
qa[0] = ["ベルリンの壁崩壊",19891110,1989,11,10];
qa[1] = ["ゲームボーイ発売",19890421,1989,4,21];
qa[2] = ["Wii発売",20061119,2006,11,19];
qa[3] = ["PS3発売",20061111,2006,11,11];
qa[4] = ["たまごっち発売",19961123,1996,11,23];
qa[5] = ["消費税3%導入",19890401,1989,4,1];
qa[6] = ["mixi(SNS)開始",20040303,2004,3,3];
qa[7] = ["Windows Vista 全世界に一般リリース",20070130,2007,1,30];
qa[8] = ["LINEサービス開始",20110623,2011,6,23];
qa[9] = ["女々しくて発売",20091021,2009,10,21];
qa[10] = ["郵政民営化",20071001,2007,10,01]

result = new Array();
random_number = new Array();

//初期設定
count = 0; //問題番号
setReady();

//初期設定
function setReady() {
	count = 0; //問題番号
	answers = new Array(); //解答記録
	random_number[0]= Math.floor( Math.random() * qa.length );
	random_number[1]= Math.floor( Math.random() * qa.length );
	while(random_number[0]===random_number[1]){
		random_number[1]= Math.floor( Math.random() * qa.length );
	}
	quiz(); //最初の問題
	document.getElementById("text_a").innerHTML = "";
}

function setReset() {
	result = new Array();
	document.getElementById("text_result").innerHTML = "";
	setReady();
}



//最初の問題
quiz();


//問題表示
//問題表示
function quiz() {
	var choices = "";
	//問題
	document.getElementById("text_quiz").innerHTML = (count + 1) + "問目：" + qa[random_number[0]][0] + "は、" + qa[random_number[1]][0] +"より？";
	//選択肢
	choices += "【<a href='javascript:answer(0)'>前</a>】";
	choices += "【<a href='javascript:answer(1)'>後</a>】";
	document.getElementById("text_s").innerHTML = choices;
}

//解答表示
function answer(num) {
	var s = (count + 1) + "問目：" + qa[[random_number[0]]][0] + "は、" + qa[random_number[1]][0] +"より？";
	//答え合わせ
  if(qa[[random_number[0]]][1]<qa[random_number[1]][1] && num === 0){
    answers[count] = "<p>【正解】</p>" ;
		result[count] = "<li>" + (count + 1) + "問目：○</li>"
  } else if (qa[[random_number[0]]][1]>qa[random_number[1]][1] && num === 1){
    answers[count] = "<p>【正解】</p>";
		result[count] = "<li>" + (count + 1) + "問目：○</li>"
  } else {
    answers[count] = "<p>【不正解】</p>"
		result[count] = "<li>" + (count + 1) + "問目：×</li>"
  }

  var commentary = ""
  commentary += "<p>" + qa[[random_number[0]]][0] + "は、" + qa[[random_number[0]]][2] + "年" + qa[[random_number[0]]][3] + "月" +qa[[random_number[0]]][4] + "日</p>";
  commentary += "<p>" + qa[random_number[1]][0] + "は、" + qa[random_number[1]][2] + "年" + qa[random_number[1]][3] + "月" +qa[random_number[1]][4] + "日</p>";

	s += answers[count];
	document.getElementById("text_a").innerHTML = s + commentary;
	document.getElementById("text_result").innerHTML += result[count];

	//次の問題を表示
	count++;
	if (count+1 < qa.length) {
		random_number[0]= Math.floor( Math.random() * qa.length );
		random_number[1]= Math.floor( Math.random() * qa.length );
		while(random_number[0]===random_number[1]){
			random_number[1]= Math.floor( Math.random() * qa.length );
		}
		quiz();
	} else {
		//終了
		document.getElementById("text_quiz").innerHTML = "( ˙ㅂ˙)ﾉｼ　終了！";
		s = "【<a href='javascript:setReady()'>もう一度</a>】";
		s += "【<a href='javascript:setReset()'>成績をリセットして最初から</a>】";
		document.getElementById("text_s").innerHTML = s;
	}
}
