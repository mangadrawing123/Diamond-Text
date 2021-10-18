// import domtoimage from 'dom-to-image';

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

function copyText() {
    let textarea = document.querySelector("#textInput");
    textarea.select();
    document.execCommand("copy");
    alert("INPUT copied!")
}

function button() { //ENTER BUTTON
  var s = document.getElementById("textInput").value;
  let result = '';

  let regexTwoThreeEnter = /\n{2,}/gms;
  let regexBackflashStart = /^(BACKFLASH)\s+?(START)/gm;
  let regexBackflashEnd = /^(BACKFLASH)\s+?(END)/gm;
  let regexNoThreeEnter = /^(?!\t|<\/?div)(^PANEL\s+(\S+))?(?:(^NORMAL|SMALL|FULL|LEFT|RIGHT|FOCUS|CENTER|NONE|SKEW)\W*)?([^\n]+)(.+?)(?=^(?!\t)\w+?|^<|$(?!\n))/gms;
  let regexNameBalloonType = /^\t{2,}(\w+)\s+?(\(?(\w+)\)?\n)?(.*?)(?=^\t{2,}|^(?!\t)|$(?!\n))/gms; 
  let regexBalloon = /(^\t)(\S.*)/gm;
  let regexActionMini = /^\t{1,}\((\S.*)\)/gm;

  result = s.replace(regexTwoThreeEnter, '\n');
  result = result.replace(regexBackflashStart, '<div class="$1 $2">');
  result = result.replace(regexBackflashEnd, '</div>\n');
  result = result.replace(regexNoThreeEnter, '<div class="PANEL ">\n<div class="action $3">$4</div>$5</div>\n\n');
  result = result.replace(regexNameBalloonType, '<div class="nameAndBalloon">\n<div class="name">$1</div>\n<div class="container $3">\n$4</div></div>\n');
  result = result.replace(regexActionMini, '<div class="mini">$1</div>');
  result = divAddBrTagBalloonDiv(result);
  console.log(result);
  result = result.replace(regexBalloon, '<div class="balloon">$2</div>');
  
  document.querySelector(".webtoonImage").innerHTML = result;
  ///copy each balloon
  $(document).ready(function() {
      $('.balloon').on('click', function() {
        var copyText = this.innerText;
        var textarea = document.createElement('textarea');
        textarea.id = 'temp_element';
        textarea.style.height = 0;
        document.body.appendChild(textarea);
        textarea.value = copyText;
        var selector = document.querySelector('#temp_element')
        selector.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        $(this).toggleClass("selected");
      });
    });
}

function downloadWebtoonDesktop() {
    const balloons = document.querySelectorAll('.balloon')
    balloons.forEach(function(balloon) { 

        balloon.classList.remove("selected");
    })
    let node = document.querySelector(".webtoonImage");
        domtoimage.toPng(node)
        .then(function (dataUrl) {
            let downloadLink = document.createElement('a');
                  downloadLink.setAttribute('download', 'DiamondWebtoonLayout-Episode-.png');
                  let url = dataUrl.replace(/^data:image\/png/,'data:application/octet-stream');
                  downloadLink.setAttribute('href', url);
                  downloadLink.click();
        })
}