'use strict';
let melo = $("#melo");
let door = $('#door');

let sm_vi = new Audio();
sm_vi.volume = 1;

melo.get(0).volume = 0.5; //ボリューム初期設定値
door.get(0).volume = 0.5; //ボリューム初期設定値;
//ボリューム数値,元値を100倍して出力
$("#mv_value").html("メロディ用ボリューム" + " 現在:" + Math.floor(melo.get(0).volume * 100));
//ボリューム数値,元値を100倍して出力
$("#dov_value").html("ドア閉め放送用ボリューム" + " 現在:" + Math.floor(door.get(0).volume * 100));

function off_1(){
  if(typeof(door.get(0).currentTime) != 'undefined'){
  sm_vi.pause();
  }
  door.get(0).play();
}
function on(){
  $(function(){
  //   if(typeof(door.get(0).currentTime) != 'undefined'){
  //   sm_vi.pause();
  // }
    melo.get(0).play();
    melo.get(0).loop = true;
    console.log("melody's loop is " + melo.get(0).loop);

  })
}
//off関数を新たに定義しました。しとかないとoffクリックしたり,dキークリックした時の処理文が長くなってめんどくなる
function off(){
$(function(){
  //以下は通常モードの処理
  if($('[name=sw_mode][value=0]').prop('checked')){

    if(typeof($("#melo").get(0).currentTime) != 'undefined'){
    door.get(0).currentTime = 0;
  }
  melo.get(0).pause();
  melo.get(0).currentTime = 0;
  melo.get(0).loop = false;

    setTimeout(off_1, 1780);

  console.log("melody's loop is " + melo.get(0).loop);
  }
  //以下は立川モードの処理
  else if($('[name=sw_mode][value=1]').prop('checked')){
    // if(typeof(door.get(0).currentTime) != 'undefined'){
    // sm_vi.pause();
    // }

    if(typeof(melo.get(0).currentTime) != 'undefined'){
    door.get(0).currentTime = 0;
  }
  melo.get(0).loop = false;
  setTimeout(off_1, 1780);
  // door.get(0).play();
  console.log("melody's loop is " + melo.get(0).loop);
  };
  if($('[name=sw_mode][value=2]').prop('checked')){
    $("#melo").on("ended", function(){

sm_vi.pause();
door.get(0).play();
console.log("melody's loop is " + melo.get(0).loop);
if(typeof(melo.get(0).currentTime) != 'undefined'){
door.get(0).play();
}
  melo.get(0).loop = false;
  if(melo.get(0).loop == false && melo.get(0).currentTime == 'undefined'){
    sm_vi.get(0).pause();
    door.get(0).play();
      };
});
   };
});
// $("#on").removeClass().addClass("btn btn-danger btn-lg  text-center");
};

function on_door(){
  //戸閉放送流れてる時にonを押したら止めるコード
  $(function(){
    if($('[name=on_mode][value=0]').prop('checked')){
      return;
    };
    if($('[name=on_mode][value=1]').prop('checked')){
    // if(typeof($("#door").get(0).currentTime) != 'undefined'){
      door.get(0).pause();
      door.get(0).currentTime = 0;
    // }
    }
  });
}

function time(){
    $(function (){
      setInterval(function(){
        let m = ('0' + Math.floor( $("#melo").get(0).currentTime / 60 )) .slice( -2 );
        let s = ( '0' + Math.floor( $("#melo").get(0).currentTime % 60 )) .slice( -2 );
        let dm = ( '0' + Math.floor( $("#melo").get(0).duration / 60 ) ) .slice( -2 );
        let ds = ( '0' + Math.floor( $("#melo").get(0).duration % 60 ) ) .slice( -2 );
            $("#time").html(m + ":" + s + " / " + dm + ":" + ds);

          }, 1);

    });
}
time();

function smoking(){
  $(function(){
    sm_vi.src = "./禁煙voicetext_men.mp3";
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
})

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

//ドア閉放送ボリューム制御
let volume_door = $("#door_volume");

$(volume).change(function() {

  let volumeValue = (volume.val().length == 1) ? '0.0' + volume.val() : '0.' + volume.val();

    if (volumeValue === "0.100") {
        melo.get(0).volume = 1;
        $("#mv_value").html("メロディ用ボリューム" + " 現在:" + 100);//ボリューム数値,元値を100倍して出力
    }else{
      melo.get(0).volume = volumeValue;
      $("#mv_value").html("メロディ用ボリューム" + " 現在:" + (volumeValue * 1000)/ 10);//ボリューム数値,元値を100倍して出力
    }

  // $(volume).val(volumeValue);
});

//ドア閉放送ボリューム制御


$(volume_door).change(function() {
  let volumeValue = (volume_door.val().length == 1) ? '0.0' + volume_door.val() : '0.' + volume_door.val();

  if (volumeValue === "0.100") {
    door.get(0).volume = 1;
    $("#dov_value").html("ドア閉め放送用ボリューム" + " 現在:" + 100);
  }else{
  $("#dov_value").html("ドア閉め放送用ボリューム" + " 現在:" +((volumeValue) * 1000)/10);//ボリューム数値,元値を100倍して出力
  door.get(0).volume = volumeValue;
  // $(volume_door).val(volumeValue);
      }
  });
