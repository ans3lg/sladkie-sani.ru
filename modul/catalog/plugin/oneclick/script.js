//par-откуда отправляются данные, чтобы не пересекались переменные,
//one_bool - первая загрузка
function catalog_oneclick(event,idtovar,par,photoOneUrl){
    event.preventDefault();

	if (idtovar!=''){
		var one_bool=0;
		if (par==''){
			one_bool=1;
		}

		var formdata={};
		if ($(par).length){
            $(par).addClass('loading');
            $(par).find('.dialogclass_button').attr('disabled',true);

			formdata=$(par).serializeAll('json');
		}

		var advent='';
		if (one_bool){
			advent='topis3';
		}

		//if (!photoOneUrl){
			//var url='';
			//if ($('.slick-active span').length){
				//url=$('.slick-active span').css('background-image');
			//}
			//if (url){
				//url=url.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
			//}
			//console.log(url);
			//photoOneUrl=url;
		//}
		//console.log(photoOneUrl);

        if (typeof photoOneUrl=="undefined"){
            photoOneUrl='';
        }

		//console.log('name:'+name+', tel:'+tel+', email:'+email+', primech:'+primech+', param:'+param);

        if (one_bool){
            dialogred({
                data:'',
                width:'1115',
                loading_bool:1,
            });
        }

		$.ajax({
			type:'POST',
			url:'/modul/catalog/plugin/oneclick/ajax.php?idtovar='+idtovar+'&one_bool='+one_bool+'&photo_one_url='+photoOneUrl,
			cache:false,
			data:formdata,
			success:function(html){
				dialogred({
					data:html,
                    width:'1115',
				});
			}
		});
	}
}