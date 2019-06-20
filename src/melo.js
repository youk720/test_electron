'use strict';

// 変数にhtml内のidを定義
let melo = new Audio("https://youk720.github.io/melo_work/melo/電車ごっこ ver D_1.mp3");
$("#melo_select").change(function(){
melo.src = $("#melo_select").val();
});
// let door = $('#door');

// 番線任意選択
let bansen = new Audio("./sound/1bansen.mp3");
$("#bansen").change(function(){
  bansen.src = $("#bansen").val();
});
let dor_cls = new Audio("./sound/door_close.mp3");

// 禁煙放送用オーディオ起動
let sm_vi = new Audio("./禁煙voicetext_men.mp3");
sm_vi.volume = 1;

melo.volume = 0.5; //ボリューム初期設定値
// door.volume = 0.5; //ボリューム初期設定値
//ボリューム数値,元値を100倍して出力
$("#mv_value").html("メロディ用ボリューム" + " 現在:" + Math.floor(melo.volume * 100));
//ボリューム数値,元値を100倍して出力
$("#dov_value").html("ドア閉め放送用ボリューム" + " 現在:" + Math.floor(bansen.volume * 100));
// ボリューム数値,元値を100倍して出力
$("#smoking_value").html("禁煙音源ボリューム" + " 現在:" + Math.floor(sm_vi.volume * 100));



// off操作時の禁煙放送停止して、ドア閉め放送再生する処理の関数を定義。
function off_1(){
  // off操作時の禁煙放送停止
  if(typeof(bansen.currentTime) != 'undefined'){
  sm_vi.pause();
  }
  bansen.play();
  $(bansen).on('ended', function(){
    if (!bansen.src.startsWith('https://youk720.github.io/melo_work')) {
      dor_cls.play();
    }
  });
}

// on操作時の処理を関数定義
function on(){
  $(function(){
    // 禁煙放送強制停止
    if(typeof(bansen.currentTime) != 'undefined'){
    sm_vi.pause();
  }
    melo.play();
    melo.loop = true;
    console.log("melody's loop is " + melo.loop);

  })
}
//off関数を新たに定義しました。しとかないとoffクリックしたり,dキークリックした時の処理文が長くなってめんどくなる
function off(){
  $(function(){
    //以下は通常モードの処理
    if($('[name=sw_mode][value=0]').prop('checked')){

      if(typeof($("#melo").currentTime) != 'undefined'){
      bansen.currentTime = 0;
    }
    melo.pause();
    melo.currentTime = 0;
    melo.loop = false;

      setTimeout(off_1, 1780);

    console.log("melody's loop is " + melo.loop);
    }
    //以下は立川モードの処理
    else if($('[name=sw_mode][value=1]').prop('checked')){
      // if(typeof(door.currentTime) != 'undefined'){
      // sm_vi.pause();
      // }

      if(typeof(melo.currentTime) != 'undefined'){
      bansen.currentTime = 0;
    }
    melo.loop = false;
    setTimeout(off_1, 1780);
    // door.play();
    console.log("melody's loop is " + melo.loop);
    }
    // 別モード
    else if($('[name=sw_mode][value=2]').prop('checked')){
      $("#melo").on("ended", function(){

      sm_vi.pause();
      setTimeout(off_1, 1780);
      console.log("melody's loop is " + melo.loop);
      if(typeof(melo.currentTime) != 'undefined'){
        setTimeout(off_1, 1780);
      }
      melo.loop = false;
    // if(melo.loop == false && melo.currentTime == 'undefined'){
    //   sm_vi.pause();
    //   door.play();
    //     };
      });
    }
  });
  // $("#on").removeClass().addClass("btn btn-danger btn-lg  text-center");
}

//戸閉放送流れてる時にonを押したら止める処理の関数定義
function on_door(){
  $(function(){
    if($('[name=on_mode][value=0]').prop('checked')){
      return;
    };
    if($('[name=on_mode][value=1]').prop('checked')){
    // if(typeof($("#door").currentTime) != 'undefined'){
      // door.pause();
      // door.currentTime = 0;
      bansen.pause();
      bansen.currentTime = 0;
      dor_cls.pause();
      dor_cls.currentTime = 0;
    // }
    }
  });
}

// メロディの再生時間と、合計時間表示
function time(){
  $(function (){
    setInterval(function(){
      let m = ('0' + Math.floor( melo.currentTime / 60 )) .slice( -2 );
      let s = ( '0' + Math.floor( melo.currentTime % 60 )) .slice( -2 );
      let dm = ( '0' + Math.floor( melo.duration / 60 ) ) .slice( -2 );
      let ds = ( '0' + Math.floor( melo.duration % 60 ) ) .slice( -2 );
      $("#time").html(m + ":" + s + " / " + dm + ":" + ds);
    }, 1);
  });
}
time();

function smoking(){
  $(function(){
    // sm_vi.src = "./禁煙voicetext_men.mp3";
    // sm_vi.volume = 1;
    sm_vi.play();
  });
  if(typeof(sm_vi.currentTime) != 'undefined'){
  sm_vi.currentTime = 0;
  // $("#on").removeClass().addClass("btn btn-danger btn-lg  text-center");
  // $("#off").removeClass().addClass("btn btn-success btn-lg");
  }
}
$('#smoking').on('click', function(f){
  smoking();
});
$('body').on("keydown", function(k){
  if(k.keyCode === 88){
      smoking();
    }
});

$('#on').on('click', function(e) {
  //on関数召喚
  on();
  on_door()
});
$('body').on("keydown", function(e) {
if(e.keyCode === 70) {
  //70キー=Fキー off関数召喚
  on();
  on_door()
  }
});
$('#off').on('click', function (){
  //off関数召喚
    off();
});
$('body').on("keydown", function (m){
  if(m.keyCode === 68){
    //68 = dキー off関数召喚
    off();
  }
});

//メロディ音源ボリューム制御
let volume = $("#melo_volume");
$(volume).change(function() {

  let volumeValue = (volume.val().length == 1) ? '0.0' + volume.val() : '0.' + volume.val();

    if (volumeValue === "0.100") {
        melo.volume = 1;
        $("#mv_value").html("メロディ用ボリューム" + " 現在:" + 100);//ボリューム数値,元値を100倍して出力
    }else{
      melo.volume = volumeValue;
      $("#mv_value").html("メロディ用ボリューム" + " 現在:" + (volumeValue * 1000)/ 10);//ボリューム数値,元値を100倍して出力
    }

  // $(volume).val(volumeValue);
});
//ドア閉放送ボリューム制御
let volume_door = $("#door_volume");
$(volume_door).change(function() {
  let volumeValue = (volume_door.val().length == 1) ? '0.0' + volume_door.val() : '0.' + volume_door.val();

  if (volumeValue === "0.100") {
    bansen.volume = 1;
    dor_cls.volume = 1;
    $("#dov_value").html("ドア閉め放送用ボリューム" + " 現在:" + 100);
  }else{
  $("#dov_value").html("ドア閉め放送用ボリューム" + " 現在:" +((volumeValue) * 1000)/10);//ボリューム数値,元値を100倍して出力
  bansen.volume = volumeValue;
  dor_cls.volume = volumeValue;
  // $(volume_door).val(volumeValue);
      }
  });
// 禁煙放送ボリューム制御
let volume_smoking = $("#smoking_volume");
$(volume_smoking).change(function(){
  let volumeValue = (volume_smoking.val().length === 1) ? '0.0' + volume_smoking.val() : '0.' + volume_smoking.val();
  if(volumeValue === "0.100"){
    sm_vi.volume = 1;
    $("#smoking_value").html("禁煙音源ボリューム" + " 現在:" + 100);
  }else{
    $("#smoking_value").html("禁煙音源ボリューム" + " 現在:" + ((volumeValue) * 1000)/10);
    //ボリューム数値,元値を100倍して出力
    sm_vi.volume = volumeValue;
  }
});
