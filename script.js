function breakDiamondAtEnterShort() {
    var txtInput1 = document.getElementById("txtInput").value
    var txtInput = txtInput1.replace(/\n\n?/g, "\n")
    let split1= txtInput.split("\n");
    var result = [];
    for (sent of split1) {
        if (sent.split(" ").length <= 6) {
            result.push(breakDiamondAt5(sent))
        } else {
            result.push(breakDiamondMoreThan5Short(sent))
        }
    }
    return result;
    // document.getElementById("txtOutput").value=result.join("\n\n\n");
}

function breakDiamondAtEnterTall() {
    var txtInput1 = document.getElementById("txtInput").value
    var txtInput = txtInput1.replace(/\n\n?/g, "\n")
    let split1= txtInput.split("\n");
    let result = [];
    for (sent of split1) {
        if (sent.split(" ").length <= 6) {
            result.push(breakDiamondAt5(sent))
        } else {
            result.push(breakDiamondMoreThan5Tall(sent))
        }
    }
    return result;
}

function breakDiamondAt5(str) {
    let word =str.split(" ");
    let n=Math.round(Math.sqrt(word.length));
    return word.reduce((a, e, j)=> a + e + (j%n === 0 ? '\n' : ' '), '');
}

function breakDiamondMoreThan5Short(str) {
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
    finalResult = finalResult.join('\n').replace(/\s\s+/g, " ")
    return finalResult;
}


function breakDiamondMoreThan5Tall(str) {
    var rows = Math.ceil(Math.sqrt(str.split(" ").length))+1
    var len = Math.floor(str.length/rows)-3
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
    return finalResult.join('\n').replace(/\s\s+/g, " ")
}

function keepDialogOnly() {
    var txtInputKeepDialog = document.getElementById("txtInput").value;
    var regexKeepDialog = /^\t\S.*/gm
    const a = txtInputKeepDialog
        .match(regexKeepDialog)
        .flatMap((s) => s.split(/\t/))
        .filter(Boolean);
    var resultDialog = a.join("\n");
    document.getElementById("txtOutput").value=resultDialog;
    var txtInputBreakLine, result;
    txtInputBreakLine = document.getElementById("txtOutput").value;
    resultH = txtInputBreakLine.replace(/\-\-\s/g, "--\n");
    resultG = resultH.replace(/\u2026|\.{3}/g, "...\n");
    resultF = resultG.replace(/\!\s/g, "!\n");
    resultE = resultF.replace(/\)\s/g, ")\n");
    resultD = resultE.replace(/\,\s/g, ",\n");
    resultC = resultD.replace(/\:/g, ":\n");
    resultB = resultC.replace(/\.\s/g, ".\n");
    resultA = resultB.replace(/\?\s/g, "?\n");
    result1 = resultA.replace(/\n/g, "\n\n\n");
    let split1= result1.split("\n\n\n");
    var split2= [];
    var result = [];
    for (var i=0; i<split1.length; i++) {
        let l =split1[i].split(" ").length;
        let n=Math.floor(Math.sqrt(l));
        split2 += split1[i].split(" ").reduce((a, e, j)=> a + e + (j%n === 0 ? '\n' : ' '), '')+"\n\n\n";
    }
    result = split2; 
    document.getElementById("txtOutput").value=result;
}

function sketchScript() {
    var txtInputBreakLine, result;
    //  txtInputBreakLine = document.getElementById("txtInput").value;
    txtInputBreakLine = document.getElementById("txtInput").value;
    // function replace /n with /n/n
    resultH = txtInputBreakLine.replace(/\-\-\s/g, "--\n");
    resultG = resultH.replace(/\u2026|\.{3}/g, "...\n");
    resultF = resultG.replace(/\!\s/g, "!\n");
    resultE = resultF.replace(/\)\s/g, ")\n");
    resultD = resultE.replace(/\,\s/g, ",\n");
    resultC = resultD.replace(/\:/g, ":\n");
    resultB = resultC.replace(/\.\s/g, ".\n");
    resultA = resultB.replace(/\?\s/g, "?\n");
    result1 = resultA.replace(/\n/g, "\n\n\n");
    let split1= result1.split("\n\n\n");
    var split2= [];
    var result = [];
    for (var i=0; i<split1.length; i++) {
        let l =split1[i].split(" ").length;
        let n=Math.floor(Math.sqrt(l));
        split2 += split1[i].split(" ").reduce((a, e, j)=> a + e + (j%n === 0 ? '\n' : ' '), '')+"\n\n";
    }
    result = split2; 
    document.getElementById("txtOutput").value=result;
    // // //split lines better fit to ballon
    // var n=Math.floor(Math.sqrt(result1.split(" ").length));
    // var result = result1.split(" ").reduce(
    //         (a, e, i)=> a + e + (i%n === 1 ? '\n' : ' '), '');
    // //  //add Enter after two word or two space
    // //  result = result1.replace(/(\S+\s*){1,2}/g, "$&\n");
    //  document.getElementById("txtOutput").value=result;
}

async function checkBox() {
    var rd1 = document.getElementById("rd1");
    var rd2 = document.getElementById("rd2");
    var rd3 = document.getElementById("rd3");
    var rd4 = document.getElementById("rd4")
    var rd5 = document.getElementById("rd5")
    if (rd1.checked == true && rd4.checked == true) {
        let  myTable = populateTable(breakDiamondAtEnterShort());
        document.getElementById("myDiv").innerHTML = myTable;
        document.getElementById("txtOutput").value=breakDiamondAtEnterShort().join("\n\n\n");
    } else if (rd1.checked == true && rd5.checked == true) {
        let  myTable = populateTable(breakDiamondAtEnterTall());
        document.getElementById("myDiv").innerHTML = myTable;
        document.getElementById("txtOutput").value=breakDiamondAtEnterTall().join("\n\n\n");
    } else if(rd2.checked == true) {
        keepDialogOnly();
    } else if (rd3.checked == true) { 
        sketchScript();
    } else {
        return false;
    }
    copyEach()
}

async function paste(input) {
    var textarea2 = document.getElementById("txtInput");
    textarea2.select()
    const text = await navigator.clipboard.readText();
    textarea2.value = text;
    checkBox();
    }

function copyInput() {
    var textarea = document.getElementById('txtInput');
    textarea.select();
    document.execCommand("copy");
    alert("INPUT copied!")
}

function copyOutput() {
    var textarea = document.getElementById("txtOutput");
    textarea.select();
    document.execCommand("copy");
    alert("ALL OUTPUT copied!")
}

///////////////////////////////////////////////////////////////////////////////////
//// add copy button for each dialog for easy copy and paste//
function populateTable(dataArray) {
    let arrayCopy = dataArray.slice(0); // Create a copy as not to alter the original array
    let myTable = "<table>";
    let nColumns =1;
    // Populate body
    while (arrayCopy.length > 0) {
      myTable += "<tr>";
      for (let i = 0; i < nColumns; i++) {
        if (arrayCopy.length == 0) {
          myTable += "<td>" + "" + "</td>";
        } else {
          myTable += '<td><textarea id="copyEach" cols="30" rows="3">' + arrayCopy.shift() + '</textarea></td>';
        }
      }
      myTable += '<td><button class="otherButton">Copy</button></td></tr>';
    }
    myTable += "</table>";
    return myTable;
}

async function copyEach() {
var a = document.getElementsByClassName('otherButton');
console.log(a);
for (var i = 0; i < a.length; i++) {
  a[i].addEventListener('click', function() {
    var b = this.parentNode.parentNode.cells[0].textContent;
    copyToClipboard(b);
    // alert(b);
  });
}
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}