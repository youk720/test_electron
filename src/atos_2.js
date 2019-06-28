'use strict';

// console.log(atos1.src);

let jun = [
  ["./sound/mamonaku.mp3", "まもなく"],
  ["./sound/1banseni.mp3", "1番線に"],
  ["./sound/futsu.mp3", "普通"],
  ["./sound/kagohara.mp3", "籠原"],
  ["./sound/yukiga.mp3", "行きが"],
  ["./sound/mairimasu.mp3", "まいります"],
  ["./sound/abunaidesu.mp3", "危ないですから、黄色い点字ブロックまで、お下がりください"],
  ["/users/yuki_tajima/desktop/メロディ.mp3", "接近メロディ"]
]
let bound_for = [
    ["./sound/fukaya.mp3", "深谷"],
    ["./sound/kagohara.mp3", "籠原"],
    ["./sound/takasaki.mp3", "高崎"],
    ["./sound/ageo.mp3", "上尾"],
    ["./sound/nozaki.mp3", "野崎"],
    ["./sound/koganei.mp3", "小金井"],
    ["./sound/utsunomiya.mp3", "宇都宮"],
    ["./sound/yaita.mp3", "矢板"],
    ["./sound/shiraoka.mp3", "白岡"],
    ["./sound/omiya.mp3", "大宮"],
    ["./sound/ueno.mp3", "上野"],
    ["./sound/tokyo.mp3", "東京"],
    ["./sound/kozu.mp3", "国府津"],
    ["./sound/odawara.mp3", "小田原"],
    ["./sound/echigoyuzawa.mp3", "越後湯沢"],
    ["./sound/shinagawa.mp3", "品川"],
    ["./sound/shinjuku.mp3", "新宿"],
    ["./sound/shibuya.mp3", "渋谷"],
    ["./sound/ikebukuro.mp3", "池袋"],
    ["./sound/osaki.mp3", "大崎"]
    // ["./sound/", ""],
  ]

let soundnum = 0;
let atos1 = new Audio();
let atos2 = new Audio();

let bound = 0;
$("#destination").change(function(){
  bound = $("#destination").val();
});

function arriv(){
  if (soundnum === 0) {
    atos1 = new Audio(jun[soundnum][0]);
    atos1.play();
    console.log("src1: " + atos1.src);
  }else if (soundnum % 2 === 0) {
    atos1.play();
  }else{
    atos2.play();
  }
  if(soundnum < jun.length-1){
    console.log(soundnum)
    if(soundnum % 2 === 1){
      $(atos2).on('ended', function(){
        soundnum++;
        console.log("src1: " + jun[soundnum]);
        atos1 = new Audio(jun[soundnum][0]);
        // console.log("src1: " + atos1.src);
        nextsound();
      });
    }else if (soundnum === 2) {
      $(atos1).on('ended', function(){
        soundnum++;
        console.log("src2: " + bound_for[bound]);
        atos2 = new Audio(bound_for[bound][0]);
        // console.log("src2: " + atos2.src);
        nextsound();
      });
    }else{
      $(atos1).on('ended', function(){
        soundnum++;
        console.log("src2: " + jun[soundnum]);
        atos2 = new Audio(jun[soundnum][0]);
        // console.log("src2: " + atos2.src);
        nextsound();
     });
    }
   }else{
     if (soundnum%2===1) {
       atos2.loop = true;
     }else{
       atos1.loop = true;
     }
     console.log("over");

   }
}

function nextsound() {
  arriv();
}

$('#arriv').on('click', function(){
  soundnum = 0;
  arriv();
});

$('#atos_start').on('click', function(){
  atos1.loop = false;
  atos1.pause();
  atos2.loop = false;
  atos2.pause();
})

