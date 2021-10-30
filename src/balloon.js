// import domtoimage from 'dom-to-image';


// auto click ctrl + enter when refresh
window.onload = function() {
    $(".ctrlEnterBtn, #nameRemoveCheckbox").click();
}

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


// AUTO SAVE  textarea to local storage
$(document).ready (function() {
    $(".textInput").val(localStorage.getItem("userText"));
    $(".textInput").on("keyup", function(itm) { 
        localStorage.setItem("userText", $(".textInput").val());

    })
})


//Break word for index.html
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
  let regexEpisodeChapter = /^(EPISODE|CHAPTER)\W+(\w.+)/gm;
  let regexBackflashStart = /^(BACKFLASH)\s+(START)/gms
  let regexBackflashEnd = /^.*\bEND\b.*/gm; //anythign END
  //   let regexPANElimg = /((?:^[^\t<].*\n?)+)((?:^\t.*\n?)+)?/mg;
  let regexPANELaction = /^(?!\t|<|\n{1,})(?:(^\b[A-Z\s]+\b)?\W*)?([^\n]+)(.+?)(?=^(?!\t)\w+?|^<|$(?!\n))/gms;
  let regexAddImgLink = /(^(?!\t|\n|<|.*http|.*\w+\.(jpe?g|png|bmp|gif)).*$)/gm;
  let regexLocalImgSrc = /^\s-\s(img\/white.jpg)/gm;    
    let regexImgSrc = /^(?!\t|\n|<)(\w.+)\s?\-\s+(.*)\n/gm;
//   let regexImgSrc = /(\W+)((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/gm;
  let regexActionTextP = /(^(?!\t|<).+)/gm;
  let regexNameBalloonType = /^\t{2,}(\w+)\s+?(\(?(\w+)\)?\n)?(.*?)(?=^\t{2,}|^(?!\t)|$(?!\n))/gms; 
  let regexBalloon = /(^\t)(\S.*)/gm;

  
//   let regexActionMini = /^\t{1,}\((\S.*)\)/gm;
result = s.replace(regexTwoThreeEnter, '\n');
result = result.replace(regexEpisodeChapter, '<div class="$1 episode-text">$1 $2</div>')
result = result.replace(regexBackflashStart, '<div class="$1 $2">'); //BACKFLASH START
result = result.replace(regexBackflashEnd, '</div>\n'); //BACKFLASH end
// result = result.replace(regexPANELaction, '<div class="PANEL $1">\n$2</div>\n\n');
result = result.replace(regexPANELaction, '<div class="PANEL $1">\n<div class="action">\n$2\n</div>$3</div>\n\n');
result = result.replace(regexAddImgLink, '$1 - img/white.jpg');
result = result.replace(regexLocalImgSrc, '\n<div class="container-img" display="none"><img class="action-img" src="$1" display="></div>')
result = result.replace(regexImgSrc, '<div class="action-text">$1</div>\n<div class="container-img"><img class="action-img" src="$2"></div>');
// result = result.replace(regexImgSrc, '\n<div class="container-img"><img class="action-img" src="$2"></div>');
result = result.replace(regexActionTextP, '<div class="action-text">$1</div>')
result = result.replace(regexNameBalloonType, '<div class="nameAndBalloon">\n<div class="name">$1</div>\n<div class="container $3">\n$4</div></div>\n');
result = divAddBrTagBalloonDiv(result);
result = result.replace(regexBalloon, '<div class="balloon">$2</div>');
console.log(result);

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
        $('.side').toggleClass("active");
        $('.grid').toggleClass("gridToggle")
    })
    $('.button.old-version').on('click', function() { console.log("hello")})

    $(".download-toggle").on('click', function(e) { 
        e.preventDefault();
        $(".download-option-panel").toggleClass("is-visible");
    })
})

function downloadWebtoonImage() {
    let node = document.querySelector(".webtoonImage"); 
    domtoimage.toPng(node)
    .then(function (dataUrl) {
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', 'DiamondWebtoonLayout-Episode-.png');
            let url = dataUrl.replace(/^data:image\/png/,'data:application/octet-stream');
            downloadLink.setAttribute('href', url);
            downloadLink.click();
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }



    // checkbox list functio
$(".checkbox-name").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".name").toggleClass("visibility-hidden");
    }
})
$(".checkbox-action").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".action-text").toggleClass("visibility-hidden");
    }
})

$(".checkbox-img").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".action-img").toggleClass("visibility-hidden");
    }
})
$(".checkbox-panel").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".action").toggleClass("visibility-hidden");
    }
})
$(".checkbox-balloon").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".balloon").toggleClass("visibility-hidden");
    }
})

$(".checkbox-gradient").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".BACKFLASH").toggleClass("background-none");
    }
})
$(".checkbox-2000px").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".webtoonImage").toggleClass("webtoon2000px");
    }
})

$(".checkbox-transparent").change(function() {
    if($(this).is(":checked")) {
        alert("checked");
    } else {
        $(".webtoonImage").toggleClass("background-white");
    }
})


// ons screen name and action remove
// $(".nameRemoveCheckbox").change(function() {
//     if($(this).is(":checked")) {
//         alert("checked");
//         $(".name, .action-text").toggleClass("visibility-hidden");
//     } else {
//         // alert("hello")
//         $(".name, .action-text").toggleClass("visibility-visible");
//     }
// })