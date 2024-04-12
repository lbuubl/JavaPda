// sticky menu
$(window).scroll(function() {
	if ($(this).scrollTop() > 120){  
		$('header').addClass("sticky");
	} 
	else{
		$('header').removeClass("sticky");
	}
});