'use strict';

// 初期定義
let melo = new Audio("https://youk720.github.io/melo_work/melo/summer%20night_v1.mp3");

// メロディ(セレクトタブからの選曲時の処理)
$("#melo_select").change(function(){
  melo.src = $("#melo_select").val();
  console.log("now melody: " + melo.src);
});
// ドア閉処理(セレクトタブ選択時)
let bansen = new Audio("./sound/1bansen.mp3");
$("#bansen").change(function(){
  bansen.src = $("#bansen").val();
  console.log("now bansen: " + bansen.src);
});
// 自動音声つぎはぎ用の別音声
let dor_cls = new Audio("./sound/door_close.mp3");

// メロディ&ドア閉処理(手動入力時の処理)
$('#custam_sw').on('click', function(){
  // 手動入力のところが未入力の時の処理
  if ($("#melo_input").val() != "") {
    // セレクトタブで選択されているものを入れる
    melo.src = $("#melo_input").val();
  }else{
    // 手動入力されたものを入れる
    melo.src = $("#melo_select").val();
  }
  // ドア閉も上記と同様の処理
  if ($("#door_input").val() != "") {
    bansen.src = $("#door_input").val();
  }else{
    bansen.src = $("#bansen").val();
  }
  // リンク切り替えのデバッグ処理
  console.log("now melody: " + melo.src);
  console.log("now bansen: " + bansen.src);
});


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
    if (bansen.src.endsWith("bansen.mp3")) {
      dor_cls.play();
    }
    if (start_sw === 1) {
      setTimeout(on, 400);
      setTimeout(on_door, 400);
      setTimeout(function(){
        melo.loop = false
        console.log(melo.loop)
      }, 500);
      start_sw = 0;
    }

  });
}

// メロディ終わりのフラグ
let melo_over = 0;

// on操作時の処理を関数定義
function on(){
  $(function(){
    
    melo.play();
    melo.loop = true;
    console.log("melody's loop is " + melo.loop);

  })
}

//off関数を新たに定義しました。しとかないとoffクリックしたり,dキークリックした時の処理文が長くなってめんどくなる
function off(){
    //以下は通常モードの処理
    if($('[name=sw_mode][value=0]').prop('checked')){
      if(typeof(melo.currentTime) != 'undefined'){
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
      if(typeof(melo.currentTime) != 'undefined'){
      bansen.currentTime = 0;
      }
      melo.loop = false;
      setTimeout(off_1, 200);
      // door.play();
      console.log("melody's loop is " + melo.loop);
    }
    // 別モード
    else if($('[name=sw_mode][value=2]').prop('checked')){
      if(typeof(melo.currentTime) != 'undefined'){
      bansen.currentTime = 0;
      }
      melo.loop = false;
      console.log("melody's loop is " + melo.loop);
    }
  // $("#on").removeClass().addClass("btn btn-danger btn-lg  text-center");
}

// メロディが流れ終わってからの処理
$(melo).on("ended", function(){
  if ($('[name=sw_mode][value=2]').prop('checked')) {
    setTimeout(off_1, 1780);
    
  }
});

//戸閉放送流れてる時にonを押したら止める処理の関数定義
function on_door(){
  $(function(){
    if($('[name=on_mode][value=0]').prop('checked')){
      return;
    };
    if($('[name=on_mode][value=1]').prop('checked')){
      bansen.pause();
      bansen.currentTime = 0;
      dor_cls.pause();
      dor_cls.currentTime = 0;
      // 禁煙放送強制停止
      if(typeof(bansen.currentTime) != 'undefined'){
        sm_vi.pause();
      }
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
    }, 100);
  });
}
// $(melo).on('play', function(){
//   time();
// });
time()
// $(melo.src).change(function(){
//   time();
// })

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
/*
setInterval(function(){
  smoking();
  $("#smoking").removeClass().addClass("btn btn btn-default");
  setTimeout(smok_end, 7000);
  function smok_end(){
    $("#smoking").removeClass().addClass("btn btn btn-primary");
  }
}, 60000);
*/


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

let start_sw;
$("#first_off").on('click', function(){
  start_sw = 1;
  off_1();
})


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
