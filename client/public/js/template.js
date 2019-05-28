'use strict';
kara.test = function(track){
  var text = kara.scoreInfo.track[track].notes;
  var textPlus = "";
  for(var i=0;i<text.length;i++){
    textPlus = textPlus + "|: ";
    for(var j=0;j<text[i].length;j++){
      textPlus = textPlus + "|" + " " + i + " " + j + " " +text[i][j][0] + "_" +text[i][j][1];
    }
    textPlus = textPlus + " :|";
  }

  $('#testpage').text(textPlus);
};
