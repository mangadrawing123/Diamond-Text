//enter and tab
$('#textInput').keydown(function (e) { 
    if (e.keyCode == 10 || e.keyCode == 13) {
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

  let regexAction = /^(?!\t|^([A-Z\s]+)$)(\S.*)/gm;
  let regexPanel = /^(PANEL\s+\S+)(.*?)(?=PANEL|$(?!\n))/gms;
  let regexNameAndBalloon = /^(\t\t)(.*?)(?=\t\t|^(?!\t|$).*)/gms;
  let regexName = /(\t\t)(\S.*)/gm;
  let regexBalloon = /(^\t)(\S.*)/gm;

  result = s.replace(regexAction, '<div class="action">$2</div>');
  result = result.replace(regexPanel, '<div class="$1">$2</div>');
  result = result.replace(regexNameAndBalloon, '<div class="nameAndBalloon">$1$2</div>');
  result = result.replace(regexName, '<div class="name">$2</div>');
  result = result.replace(regexBalloon, '<div class="balloon">$2</div>');

  console.log(result)
  document.querySelector(".webtoonImage").innerHTML = result;
}



