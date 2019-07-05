'use strict';
// textareaサイズ初期設定
$("#playlist_out").width(321);
$("#playlist_out").height(196);

let jun = [
  atos_cross[37][1],
  bansen_num[1][1],
  train_type[1][1],
  buund_for[10][1],
  atos_cross[40][1],
  atos_cross[41][1],
  atos_cross[46][1],
]

let info = [
  atos_cross[0][1],
  atos_cross[1][1],
  bansen_num[0][1],
  atos_cross[2][1],
  train_type[1][1],
  buund_for[10][1],
  atos_cross[5][1],
]

let playlist = [];
let list_link = [];

// 行き先任意選択
let bound = 10;
$("#destination").change(function(){
  bound = $("#destination").val();
  jun[3] = buund_for[bound][1];
  info[5] = buund_for[bound][1];
});
// 種別任意選択
let kind_num = 1;
$("#kind").change(function(){
  kind_num = $("#kind").val();
  jun[2] = train_type[kind_num][1];
  info[4] = train_type[kind_num][1];

  if(jun[2] === train_type[10][1]){
    jun.push(atos_cross[25][1])
    jun.push(atos_cross[28][1])
    console.log("out of service");
  }else if(jun.length === 9){
    jun.pop()
    jun.pop()
    console.log("change");
  }
});
// 

// 音声定義
let soundnum = 0;
let atos1 = new Audio();
let atos2 = new Audio();


function arriv(){
   $("#playlist_out").html();
   $("#playlist_out").html(jun.join('\n'));
}

function yokoku(){
  $("#playlist_out").html();
  $("#playlist_out").html(info.join('\n'));
}
// 音源が実際に存在するかどうか、確認
function check_sound(){
  if (list_link.length != 0 ) {
    console.log("clear");
    setTimeout(sound_start, 1000)
  }else{
    playlist = $("#playlist_out").val().split('\n');
    let check_flag = false;
    for (let i = 0; i < playlist.length; i++) {
      for (let t = 0; t < atos.length; t++) {
        if (playlist[i] === atos[t][1]) {
          check_flag = true;
          list_link.push(atos[t][0]);
          break;
        }
      }
      // console.log(list_link[i]);
    }
    if (check_flag === false) {
      alert("定義されていない音源があります\n"+ playlist + "は、音源管理ファイルにありません");
    }else{
      console.log("clear");
      setTimeout(sound_start, 1000)
    }
  }
    console.log(list_link)
  }
    

// 音声再生枠
function sound_start(){
   if (soundnum === 0) {
    atos1 = new Audio(list_link[soundnum]);
    atos1.play();
    console.log("src1: " + atos1.src);
  }else if (soundnum % 2 === 0) {
    atos1.play();
  }else{
    atos2.play();
  }
  if(soundnum < list_link.length-1){
    console.log(soundnum)
    if(soundnum % 2 === 1){
      $(atos2).on('ended', function(){
        soundnum++;
        console.log("src1: " + list_link[soundnum]);
        atos1 = new Audio(list_link[soundnum]);
        // console.log("src1: " + atos1.src);
        nextsound();
      });
    // }else if (soundnum === 2) {
    //   $(atos1).on('ended', function(){
    //     soundnum++;
    //     console.log("src2: " + bound_for[bound]);
    //     atos2 = new Audio(bound_for[bound][0]);
    //     // console.log("src2: " + atos2.src);
    //     nextsound();
    //   });
    }else{
      $(atos1).on('ended', function(){
        soundnum++;
        console.log("src2: " + list_link[soundnum]);
        atos2 = new Audio(list_link[soundnum]);
        // console.log("src2: " + atos2.src);
        nextsound();
     });
    }
   }else{
     if (soundnum%2===1) {
      //  atos2.loop = true;
     }else{
      //  atos1.loop = true;
     }
     console.log("over");

   }
}

function nextsound() {
  sound_start();
}

function atos_clear(){
  playlist = []
  list_link = []
  $("#playlist_out").html("");
}

$('#arriv').on('click', function(){
  arriv();
});
$("#info").on('click', function(){
  yokoku();
})

$('#atos_start').on('click', function(){
  soundnum = 0;
  check_sound();
})
$("#atos_stop").on('click', function(){
  atos1.loop = false;
  atos1.pause();
  atos2.loop = false;
  atos2.pause();
})
$("#clear").on('click', function(){
  atos_clear();
  
});