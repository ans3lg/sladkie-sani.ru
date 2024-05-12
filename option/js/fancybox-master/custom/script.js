//$.fancybox.defaults.animationEffect = 'fade';

$.fancybox.defaults.hash=false;
$.fancybox.defaults.loop=true;
//$.fancybox.defaults.clickContent='close';
$.fancybox.defaults.clickOutside='close';
$.fancybox.defaults.buttons=[
	//"zoom",
	//"share",
	//"slideShow",
	//"fullScreen",
	//"download",
	//"thumbs",
	'close',
];
$.fancybox.defaults.animationDuration=150;

/*
$.fancybox.defaults.afterLoad=function( instance,current ){
	$('.fancybox-image').wrap('<div class="fancybox-image_wrap"><div class="fancybox-image_wrap2"><div class="fancybox-image_wrap3"></div></div></div>');
};
*/

/*
$(function(){
	$("[data-fancybox]").fancybox({
	  //thumbs:false,
	  //hash:false,
	  //loop:true,
	  //keyboard:true,
	  //toolbar:false,
	  //animationEffect:false,
	  //arrows:true,
	  //clickContent:false,
	  buttons:[
		//"zoom",
		//"share",
		//"slideShow",
		//"fullScreen",
		//"download",
		//"thumbs",
		"close"
	  ],
	  //clickContent:'close',
	});
});
*/

$(function(){
	$("[data-fancybox]").fancybox({
		  //caption:function(instance,obj){
			//return '<div class="xxx">' + $(this).find('.caption').html() + '</div>';
		  //},
		  //afterShow
	});
	$(".fancybox").fancybox({
	});
	$(".fancybox-my1").fancybox({
	});
	$(".fancybox-my2").fancybox({
	});
	$(".fancybox-my3").fancybox({
	});
});

/******/

/*
$(function(){
	$("[data-fancybox='o_nas_media']").fancybox({
		media:{
			youtube:{
				params:{
					autoplay:1,
				},
				controls:1,
				showinfo:1,
			},
		},
	});
});
*/