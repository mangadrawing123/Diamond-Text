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

  let regexTwoThreeEnter = /\n{2,}/gms;
//   let regexAction = /^(?!\t|^([A-Z\s]+)$)(\S.*)/gm;
  let regexNoThreeEnter = /^(?!\t)(^PANEL\s+(\S+))?(?:(NORMAL|SMALL|FULL|LEFT|RIGHT|FOCUS|CENTER|NONE)\W*)?([^\n]+)(.+?)(?=^(?!\t)\w+?|$(?!\n))/gms;
//   let regexThreeEnter = /^\n{2,}(^PANEL\s+(\S+))?(^(NORMAL|FULL|LEFT|RIGHT|FOCUS|CENTER|NONE))?(.*?)(?=^\n{2,}|$(?!\n))/gms;
  let regexNameBalloonType = /^\t{2,}(\w+\s+?)(\((\w+)\)\n)?(.*?)(?=^\t{2,}|^(?!\t)|$(?!\n))/gms;
//   let regexNameAndBalloon = /^(\t\t)(.*?)(?=\t\t|^(?!\t|$).*)/gms;
//   let regexName = /(\t\t)(\S.*)/gm;
  let regexBalloon = /(^\t)(\S.*)/gm;
  let regexActionMini = /^\t{1,2}\((\S.*)\)/gm;

  result = s.replace(regexTwoThreeEnter, '\n');
//   result = result.replace(regexAction, '<div class="action">$2</div>');
  result = result.replace(regexNoThreeEnter, '<div class="PANEL $2">\n<div class="action">$4</div>$5</div>\n\n');
//   result = result.replace(regexThreeEnter, '<div class="PANEL $2$4">\n$5</div>\n\n');
  result = result.replace(regexNameBalloonType, '<div class="nameAndBalloon $3">\n<div class="name">$1</div>\n$4</div>');
//   result = result.replace(regexNameAndBalloon, '<div class="nameAndBalloon">$1$2</div>');
//   result = result.replace(regexName, '<div class="name">$2</div>');
result = result.replace(regexActionMini, '<div class="mini">$1</div>');
result = result.replace(regexBalloon, '<div class="balloon">$2</div>');

  console.log(result)
  document.querySelector(".webtoonImage").innerHTML = result;
}


function downloadWebtoonDesktop() {
    html2canvas(document.querySelector(".webtoonImage")).then(function(canvas) {
        // document.body.appendChild(canvas);
        console.log("hello")
		var dataURL = canvas.toDataURL("image/png");
        let downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', 'DiamondWebtoonLayout-Episode-.png');
      let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
		// document.querySelector("#theimage9").src = theimage9; 
	});
}


function copyText() {
    let textarea = document.querySelector("#textInput");
    textarea.select();
    document.execCommand("copy");
    alert("INPUT copied!")
}


