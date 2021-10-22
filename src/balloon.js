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

//for balloon.js

function breakWebtoonAt5(str) {
    let word =str.split(" ");
    let n=Math.round(Math.sqrt(word.length));
    return word.reduce((a, e, j)=> a + e + (j%n === 0 ? '<br>' : ' '), '');
}

function breakWebtoonMoreThan5(str) {
    var rows = Math.ceil(Math.sqrt(str.split(" ").length))
    var len = Math.ceil(str.length/rows)
    var re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
    var res = [];
    var finalResult = [];
    while ((m = re.exec(str)) !== null) {
        res.push(m[1]);
    }
    for (var i = 0; i < res.length - 1; i++){    
        if(res[i].indexOf(' ') != -1){  
        while(res[i].length < len){      
            for(var j=0; j < res[i].length-1; j++){
            if(res[i][j] == ' '){
                res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
                if(res[i].length == len) break;
                while(res[i][j] == ' ') j++;
            }
            }
        }      
        }    
        finalResult.push(res[i]);    
    }
    finalResult.push(res[res.length - 1]);
    finalResult = finalResult.join('<br>').replace(/\s\s+/g, " ")
    return "\t" + finalResult;
}

function divAddBrTagBalloonDiv(divInput) {
        let result = "";
        let sentenceArray = divInput.split("\n");
        sentenceArray.forEach(sentence => {
          if (sentence.startsWith("\t")) {
            if (sentence.split(" ").length <= 6) {
                result += breakWebtoonAt5(sentence) + '\n';
            } else {
                result +=  breakWebtoonMoreThan5(sentence) + '\n';
            }
          } else {
                  result += sentence + "\n";
      }})
        return result;
}

// end ballon.js

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
  //   let regexPANElimg = /((?:^[^\t<].*\n?)+)((?:^\t.*\n?)+)?/mg;
  let regexPANELaction = /^(?!\t|<)(?:(^\b[A-Z\s]+\b)?\W*)?([^\n]+)(.+?)(?=^(?!\t)\w+?|^<|$(?!\n))/gms;
  let regexImgSrc = /(\W+)((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/gm;
  let regexActionTextP = /(^(?!\t|<).+)/gm;
//   let regexSkewDown = /^(?!\t|<)(?:(^[A-Z\s]+)?\W*)?([^\n]+)(.+?)(?=^(?!\t)\w+?|^<|$(?!\n))/gms;
//   let regexNoThreeEnter = /^(?!\t|<\/?div)(^PANEL\s+(\S+))?(?:(^NORMAL|SMALL|FULL|LEFT|RIGHT|FOCUS|CENTER|NONE|SKEW)\W*)?([^\n]+)(.+?)(?=^(?!\t)\w+?|^<|$(?!\n))/gms;
  let regexNameBalloonType = /^\t{2,}(\w+)\s+?(\(?(\w+)\)?\n)?(.*?)(?=^\t{2,}|^(?!\t)|$(?!\n))/gms; 
  let regexBalloon = /(^\t)(\S.*)/gm;
  let regexActionMini = /^\t{1,}\((\S.*)\)/gm;

  result = s.replace(regexTwoThreeEnter, '\n');
  result = result.replace(regexBackflashStart, '<div class="$1 $2">'); //BACKFLASH START
  result = result.replace(regexBackflashEnd, '</div>\n'); //BACKFLASH end
  result = result.replace(regexPANELaction, '<div class="PANEL">\n<div class="action $1">\n$2\n</div>$3</div>\n\n');
  result = result.replace(regexImgSrc, '\n<img class="action-img " src="$2">');
  result = result.replace(regexActionTextP, '<p class="action-text">$1<p>');
  console.log(result);
  result = result.replace(regexNameBalloonType, '<div class="nameAndBalloon">\n<div class="name">$1</div>\n<div class="container $3">\n$4</div></div>\n');
  result = result.replace(regexActionMini, '<div class="mini">$1</div>');
  result = divAddBrTagBalloonDiv(result);
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

$(document).ready(function() {
    $('.toggle-btn').on('click', function() { 
        // console.log("hello")
        $('.side').toggleClass("active");
        $('.grid').toggleClass("gridToggle")
    })
    $('.button.old-version').on('click', function() { console.log("hello")})
})

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


//togglebutton hide textarea
// function toggleSidebar(ref) {
//     document.getElementsByClassName('toggle-btn').classList.toggle('active');
// //   document.getElementById("sidebar").classList.toggle('active');
// }