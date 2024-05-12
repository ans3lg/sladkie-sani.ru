var images=[];
function commeronline_preload(){
    for (var i=0;i<arguments.length;i++){
        images[i]=new Image();
        images[i].src=commeronline_preload.arguments[i];
    }
}
commeronline_preload(
	"/plugin/commeronline/custom_img/commeronline_ng_bg.png",
)


function commeronline_send(gennum){
    var parent1=$('.commeronline[data-gennum="'+gennum+'"]');

	var formdata={};
	formdata=parent1.find('.commeronline_form').serializeJSON({});
	//serializeJSON({});
	//serializeAll('json');
    formdata['urlsend']=location.href;

    parent1.find('.commeronline_button').prop('disabled',true);

	//console.log(formdata);
	$.ajax({
		type:'POST',
		url:'/plugin/commeronline/ajax.php?task=send',
		data:formdata,
        cache:false,
		success:function(data){
			//console.log(data);

			parent1.removeClass('loading');
			parent1.removeClass('error');
            parent1.find('.commeronline_button').prop('disabled',false);

			parent1.find('.commeronline_label').removeClass('err');
   
			var split1=data.split('||');
			//console.log(split1);
			if (split1[0]=='result'){
				//parent1.find('.commeronline_form_content').css({'visibility':'hidden'});
				//parent1.find('.commeronline_result').show();
				parent1.addClass('result');
			}else if (split1[0]=='error'){
				var split2=split1[1].split('|');
				for(i=0;i<split2.length;i++){
					var key=split2[i];
					//console.log(key);
					//console.log(gennum);
					//console.log(parent1);
					parent1.find('.commeronline_label[data-label_key="'+key+'"]').addClass('err shadowred');
					//parent1.find('.commeronline_label[data-label_key="'+key+'"] textarea').addClass('err shadowred');
				}

                var error_text=split1[2];
                parent1.addClass('error');
                parent1.find('.commeronline_error').html(error_text);

                if (parent1.find('.commeronline_label').length){
                    parent1.find('.commeronline_label').each(function(i,elm){
                        if (i=='0'){
                            //$(elm).find('input').focus();
                            //console.log(elm);
                        }
                        setTimeout(function(){
                                $(elm).removeClass('shadowred');
                        },1200);
                    });
                }
			}
		}
	});
}

$(document).on('click','.commeronline_button',function(){
    var parent1=$(this).closest('.commeronline');
	parent1.addClass('loading');
	var gennum=parent1.data('gennum');
	//console.log(gennum);

    commeronline_send(gennum);
});

function commeronline_init(gennum){
	$('.commeronline input').attr('autocomplete','off');
}

$(document).on('click','.commeronline_action',function(event){
	event.preventDefault();
	event.stopPropagation();

	//console.log('commeronline');

	dialogred({
		data:'',
		loading_bool:1,
		width:'1288',
		theme:'commeronline_ng',
		adjust:'scale',
		curtain_close_bool:0,
	});

    $.ajax({
        type:'POST',
        url:'/plugin/commeronline/ajax.php?task=dialog',
        cache:false,
        data:{},
        success:function(data){
            dialogred({
                data:data,
                width:'1288',
            })
        }
    });
});