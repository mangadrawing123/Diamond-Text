

//enbale TAb key
function enableTab(id) {
    var el = document.getElementById(id);
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;

        }
    };
}
enableTab('textInput');


function button() {
  var s = document.getElementById("textInput").value;
  let result = '';
  let regex = /^(PANEL\s+\S+)(.*?)(?=PANEL|$(?!\n))/gms;
  result = s.replace(regex, '<div class="$1">$2</div>');
  document.querySelector(".side").innerHTML = result;
}



//ctrl + Enter
 $('textarea').keydown(function (e) { 
    if ((e.keyCode == 10 || e.keyCode == 13) ) {
      // $('body').append('g ');
      button();
    }
  });