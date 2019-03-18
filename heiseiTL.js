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
qa[10] = ["郵政民営化",20071001,2007,10,01];
qa[11] = ["新潟県中越地震",20041023,2004,10,23];

var tl = [];

//初期設定
result = new Array();
setReady();

//初期設定
function setReady() {
	count = 0; //問題番号
	answers = new Array(); //解答記録

	for (var i = qa.length - 1; i >= 0; i--){
	  // 0~iのランダムな数値を取得
		var j = Math.floor( Math.random() * ( i + 1 ) );
		// 配列の数値を入れ替える
		[qa[i], qa[j]] = [qa[j], qa[i]]
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
function quiz() {
	if(count === 0){
		tl[0] = qa[0];
		tl[1] = qa[1];
	} else {
	  tl[count+1] = qa[count+1];
	}
	for(var x = count; x >= 0; x--){
		if(tl[x][1] > tl[x+1][1]){
      var karioki = tl[x];
			tl[x] = tl[x+1];
			tl[x+1] = karioki;
		} else {
			break;
		}
	}

	var timeline = (count + 1) + "問目：";
	timeline += "<p>⬆︎前</p>";
	for(i=0; i <= count+1; i++){
		timeline += "<p>【<a href='javascript:answer(" + i + ")'>★</a>】</p>";
		timeline += "<p>" + tl[i][0] + "<p>";
	}
	timeline += "<p>【<a href='javascript:answer(" + count+2 + ")'>★</a>】</p>";
	timeline += "<p>⬇︎後</p>";
	timeline += "<br>";
	timeline += "<p>【問】" + qa[count+2][0] + "はどこに当てはまる？</p>";
	//問題
	document.getElementById("text_quiz").innerHTML = timeline;
}

//解答表示
function answer(num) {
	var s = "";
  if(qa[count+2][1] < tl[0][1]){
		var seikai = 0;
	} else {
		for(var y = count+2; y >= 0; y--){
			if(qa[count+2][1] > tl[y-1][1]){
				var seikai = y;
				break;
			}
		}
	}

	if(num === seikai){
    answers[count] = "<p>" + (count + 1) + "問目：【正解】</p>" ;
		result[count] = "<li>" + (count + 1) + "問目：○</li>"
  } else{
		answers[count] = "<p>" + (count + 1) + "問目：【不正解】</p>"
		result[count] = "<li>" + (count + 1) + "問目：×</li>"
  }
	document.getElementById("text_s").innerHTML = answers[count];
	document.getElementById("text_result").innerHTML += result[count];

	//次の問題を表示
	count++;
	if (count+2 < qa.length) {
		quiz();
	} else {
		//終了
		document.getElementById("text_quiz").innerHTML = "( ˙ㅂ˙)ﾉｼ　終了！";

		tl[tl.length] = qa[tl.length];
		for(var x = tl.length - 1; x >= 0; x--){
			if(tl[x][1] < tl[x-1][1]){
	      var karioki = tl[x];
				tl[x] = tl[x-1];
				tl[x-1] = karioki;
			} else {
				break;
			}
		}

		var commentary = ""
		for(var z = 0; z<tl.length; z++){
			commentary += "<p>" + tl[z][0] + "は、" + tl[z][2] + "年" + tl[z][3] + "月" +tl[z][4] + "日</p>";
		}
		document.getElementById("text_a").innerHTML = commentary;
		var s = "【<a href='javascript:setReady()'>もう一度</a>】";
		s += "【<a href='javascript:setReset()'>成績をリセットして最初から</a>】";
		document.getElementById("text_s").innerHTML = s;
	}
}
