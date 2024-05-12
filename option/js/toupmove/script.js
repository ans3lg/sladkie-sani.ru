$(function(){
	$('body').append('<div class="cmsl_toupmove"></div>');

	if ($(this).scrollTop()>100){
		$('.cmsl_toupmove').stop().fadeIn();
	}

	$(window).scroll(function(){
		if ($(this).scrollTop()>100)
			$('.cmsl_toupmove').stop().fadeIn();
		else
			$('.cmsl_toupmove').stop().fadeOut(400);
	});

	$('.cmsl_toupmove').click(function(){
		$('body,html').animate({scrollTop:0},300);
		return false;
	});
});