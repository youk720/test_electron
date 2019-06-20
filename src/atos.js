'use strict';

// $('#kind').change(function (){
//   $('#kind_val').val() = $('#kind').val();
// })


function main(){
}

// 放送パーツの追加関数
function setSoundParts(){
  // パーツ一覧のセレクトタブを定義
	var id = "partsListSelect";
  // 文字列の順番を取得
	var index = document.getElementById(id).selectedIndex;
  // テキスト追加する時に二次元リストの
	var addText = soundData[index][1];
	//入っている文字列を取り出す
  // 放送順を入れるtextareaを定義
	var id = "inputTextarea";
	var text = document.getElementById(id).value;

	//付け足したい文字列を追加する
	//テキストが既に入っており、最後の文字が改行でなければ、改行をまず追加する
	if(text != "" && text.slice(-1) != "\n")
		text += "\n";

	text += addText;

	//文字列を返してあげる
	var id = "inputTextarea";
	document.getElementById(id).value = text;
}

// あらかじめ指定されたものを inputTextarea に追加するもの
function exSoundParts(addText){
	//入っている文字列を取り出す
	var id = "inputTextarea";
	var text = document.getElementById(id).value;
	//テキストが既に入っている場合
	if(text != ""){
		res = confirm("既存の「放送文章」は全てクリアされます。よろしいですか？");
		if(res == true){
			document.getElementById(id).value = addText;
			window.scrollTo(0,100);
		}
	}else{
		document.getElementById(id).value = addText;
    // 以下のコードで画面内の移動
		window.scrollTo(0,100);
	}
}

//放送順を並べたもののリストクリア
function resetInput(){
	var id = "inputTextarea";
	document.getElementById(id).value = "";
}

var inputTextSplit;

// 自動放送再生ボタン
function checkInput(){
	//入っている文字列を取り出す
	var id = "inputTextarea";
  // inputTextareaの文字列を定義
	var inputText = document.getElementById(id).value;
  // inputTextareaの文字列の改行を外す
	inputTextSplit = inputText.split("\n");

  // フラグ初期定義
	var judgeFlag = true;
  // 対応した音源がないもの
	var NGText = "";
  // forでinputTextareaにある要素だけ回す
	for(i=0 ; i<inputTextSplit.length ; i++){
		var innerFlag = false;
		var textBuff = inputTextSplit[i];
		//forで inputTextareaにある要素に該当する音源があるかを検索
		for(j=0 ; j<soundData.length ; j++){
      // 見つかればフラグクリア
			if(textBuff == soundData[j][1]){
				innerFlag = true;
				break;
			}
		}
    // フラグがクリアできていない音源の場合は、止まる
		if(!innerFlag){
			judgeFlag = false;
      // 音源が存在しない放送分節を NGTextへ入れる
			NGText += "\n"+textBuff;
		}
	}
  // 存在しないことをアラートで知らせる
	if(!judgeFlag){
		alert("【エラー】以下の文節が認識できませんでした。登録済みの文節を使用してください。\n"+NGText);
		return;
	}

	//もし放送中の場合はキャンセル
	soundStop();

	//音声の事前ロード
	/*
	for(i=0 ; i<inputTextSplit.length ; i++)
	{
		var phrase = inputTextSplit[i];
		var fileName = getFileName(phrase);

		loadSoundFile(fileName);
	}
	 */

	//音声の事前ロード
	for(i=0 ; i<preLoad ; i++){
		//5ファイル以内だった場合スキップ
		if(i>=inputTextSplit.length)
			break;
    // i番目の音源の文字を定義
		var phrase = inputTextSplit[i];
    // i番目の音源のリンクを読みに行く
		var fileName = getFileName(phrase);
    // 音源ロードの処理をする
		loadSoundFile(fileName);
	}
  // 最初に再生されるものにする
	nowSoundNum = 0;
	setTimeout(soundStart, 2000);
}

//事前に読み込む音声パーツ数
var preLoad = 5;

//入力　日本語の文字列　出力　ファイル名
// 音源のリンクを探しに行く
function getFileName(phrase){
  // soundDataで定義された音源を検索する
	for(j=0; j<soundData.length; j++){

		if(phrase == soundData[j][1]){
			return soundData[j][0];
		}
	}
}

//指定された音声を先にロードだけする
function loadSoundFile(soundFileName){
	audio = new Audio(soundFileName);
	audio.load();
}
// 放送で一番最初に流れるものの配列番号の初期定義
var nowSoundNum = 0;
audio = new Audio("sound/null-250.mp3");
audio0 = new Audio("sound/null-250.mp3");
audio1 = new Audio("sound/null-250.mp3");


//パーツの音声を再生する
function soundStart(){
	// ファイル取得(一番最初のもの)
	var phrase = inputTextSplit[nowSoundNum];
  // 音源のリンクを読みに行く
	var fileName = getFileName(phrase);

	//1つ目の場合
	if(nowSoundNum == 0){
		audio0 = new Audio(fileName);
		audio0.play();
	}
	//偶数の場合
	else if(nowSoundNum % 2 == 0){
		audio0.play();
	}else{
	//奇数の場合
		audio1.play();
	}

	//最後でなければ、次のイベントリスナー貼る
  // inputTextareaで入れた最後の音源でなければ処理を続ける
	if(nowSoundNum < inputTextSplit.length-1){
    // 次の音源を定義
		var phrase = inputTextSplit[nowSoundNum+1];
    // 次の音源のリンクを取得
		var fileName = getFileName(phrase);

    // 順番が偶数の時に再生するもの
		if(nowSoundNum % 2 == 0){
			audio1 = new Audio(fileName);
      // $(audio0).on('ended', nextSound);
			audio0.addEventListener('ended', nextSound, false);
		}else{
			audio0 = new Audio(fileName);
			audio1.addEventListener('ended', nextSound, false);
		}

		//audio.addEventListener('ended', nextSound, false);
	}

	/*
	//最後でなければ、次の放送をセットして流す
	if(nowSoundNum < inputTextSplit.length-1)
	{
		setTimeout("setNextSound()", 30);
	}
	*/

	//5つ先の音声を事前に読み込む
	if(nowSoundNum+5 < inputTextSplit.length){
		var phrase = inputTextSplit[nowSoundNum+5];
		var fileName = getFileName(phrase);

		loadSoundFile(fileName);
	}

  // 再生する順番を進めていく
	nowSoundNum++;
	//alert(audio.duration)
}
// 次の音源へいく処理
function setNextSound(){
  //
	var time = audio.duration*1000;
	setTimeout("soundStart()", time);
	log(time);
}
// 次の放送を再生
function nextSound(event){
	soundStart();
}

var event;

function soundStop(){
	audio.pause();
}

function log(text){
	id = "log";
	document.getElementById(id).innerHTML = document.getElementById(id).innerHTML + "<br />"+text;
}
