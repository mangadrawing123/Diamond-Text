
$("#decreaseText").click(function() {
    curSize = parseInt($("textarea").css("font-size")) - 2;
	// if (curSize >= 14) 
    $("textarea").css("font-size", curSize);
    // alert("hello");
});
$("#increaseText").click(function() {
    curSize = parseInt($("textarea").css("font-size")) + 2;
	// if (curSize >= 14) 
    $("textarea").css("font-size", curSize);
    // alert("hello");

});


