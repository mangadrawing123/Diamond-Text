
  var  textInput = document.querySelector(".textInput");
  var output_div = document.querySelector(".content-output");
var save_button = document.querySelector(".save-button");
//   if (window.localStorage["TextEditorData"]) {
//         editor.value = window.localStorage["TextEditorData"];
//   }    
//   editor.addEventListener("keyup", function() {
//   window.localStorage["TextEditorData"] = editor.value;
//   });

textInput.value = localStorage.getItem("content")

save_button.addEventListener("click", function() {
    localStorage.setItem("content", textInput.value);

})

