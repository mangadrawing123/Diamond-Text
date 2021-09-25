//enter and tab
$('#textInput').keydown(function (e) { 
    if (e.keyCode == 10 || e.keyCode == 13) {
        console.log("hello")
      button();
    } else if (e.keyCode == 9) { // tab was pressed
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
});

function button() {
  var s = document.getElementById("textInput").value;
  let result = '';
  let regexPanel = /^(PANEL\s+\S+)(.*?)(?=PANEL|$(?!\n))/gms;
  let regexNameBalloon = /^(\t\t)(.*?)(?=\t\t|^(?!\t|$).*)/gms;
  resultPanel = s.replace(regexPanel, '<div class="$1">$2</div>');
  result = resultPanel.replace(regexNameBalloon, '<div class="balloon">$1$2</div>');
  document.querySelector(".side").innerHTML = result;
}



