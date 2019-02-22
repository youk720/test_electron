'use strict';
let melo = $("#melo");
let door = $('#door');
function off_1(){
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
function off(){
  melo.get(0).pause();
  melo.get(0).currentTime = 0;
  melo.get(0).loop = false;
  setTimeout(off_1, 1780);
}

$('#on').on('click', function(e) {
  //on関数召喚
  on();
});
$('#off').on('click', function (){
  //off関数召喚
    off();
});
