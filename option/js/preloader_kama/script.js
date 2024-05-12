/*
var preload_kama_images=new Array()
function preload_kama_preloadImages(arg){
	for(var i=0;i<arg.length;i++){
		//new Image().src=arg[i];

		preload_kama_images[i]=new Image()
		preload_kama_images[i].src=arg[i];

		//console.log(arg[i]);

        //$('<img/>')[0].src=this;
        // (new Image()).src=this;
	}
}
preload_kama_preloadImages(
  ['/file/i_pic/cmsl/loader1.svg']
);
*/

function preload_kama_end(){
	var is_load=$('body').data('preload_kama_is_load');	
	//if (is_load===undefined){
		//is_load=0;
	//}
	//console.log(is_load);

	if (is_load!='1'){
		//console.log('end+');

		$('body').data('preload_kama_is_load','1');
		$('.preloader_bg').delay(100).fadeOut(100);
		//$('.preloader_bg').hide();
		$('.preloader_content').delay(100).fadeOut(500);
	}
}

function preload_kama_init(){
    /*
	var html='';

	var img;
	//img='/file/i_pic/cmsl/loader1.svg';
	img='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU2cHgiICBoZWlnaHQ9IjE1NnB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcm9sbGluZyIgc3R5bGU9ImJhY2tncm91bmQ6IG5vbmU7Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuY29sb3J9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIG5nLWF0dHItcj0ie3tjb25maWcucmFkaXVzfX0iIG5nLWF0dHItc3Ryb2tlLWRhc2hhcnJheT0ie3tjb25maWcuZGFzaGFycmF5fX0iIHN0cm9rZT0iIzFkMGUwYiIgc3Ryb2tlLXdpZHRoPSIzIiByPSIzNSIgc3Ryb2tlLWRhc2hhcnJheT0iMTY0LjkzMzYxNDMxMzQ2NDE1IDU2Ljk3Nzg3MTQzNzgyMTM4IiB0cmFuc2Zvcm09InJvdGF0ZSg1MC43MjQgNTAgNTApIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyLjZzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9zdmc+';

	html='<div class="preloader_bg"></div>'+
    '<div class="preloader_content">'+
		'<span>'+
			'<img src="'+img+'" alt="">'+
		'</span>'+
    '</div>';
    $('body').prepend(html);

	$('.preloader_bg,.preloader_content').show();
    */

	$(window).on('load',function(){
		preload_kama_end();
	});

	setTimeout(function(){
		preload_kama_end();
	},8000);
}