function dialogred_past(data){
	$('.dialogred_data').html(data);
}

function dialogred_loading_show(){
    $('.dialogred_modal').addClass('loading');
}
function dialogred_loading_hide(){
    $('.dialogred_modal').removeClass('loading');
}

function dialogred(data){
	if(data.width==undefined){
		data.width='600';
	}
	if(data.height==undefined){
		data.height='300';
	}
	if(data.data==undefined){
	    data.data=0;
    }
	if(data.loading_bool==undefined){
		data.loading_bool=0;
	}

	if(data.template==undefined){
		data.template='';
	}

	if(data.theme==undefined){
		data.theme='';
	}

	if(data.adjust==undefined){
		data.adjust='default';
	}

	if(data.curtain_close_bool==undefined){
		data.curtain_close_bool=1;
	}

    //twice
    $('.dialogred_inner').css({
        'max-width':data.width+'px',
    });

	if (!$(".dialogred_modal").length){
		var dialkarkas='';
		//dialkarkas+='<div class="dialogred_zanoves"></div>';
        dialkarkas+='<div class="dialogred_modal" data-template="'+data.template+'" data-theme="'+data.theme+'" data-adjust="'+data.adjust+'" data-curtain_close_bool="'+data.curtain_close_bool+'">';
            dialkarkas+='<div class="dialogred_overlay"></div>';
            //dialkarkas+='<div class="dialogred_wall"></div>';
            dialkarkas+='<div class="dialogred_inner">'+
                '<div class="dialogred_close2 dialogred_close_esh"><span class="dialogred_close2_img"></span></div>'+
                '<div class="dialogred_data"></div>'+
            '</div>'+
            //'<div class="dialogred_wall2">' +
                //'<div class="dialogred_close dialogred_close_esh"><span class="dialogred_close_img"></span></div>'+
             //'</div>' +
             '<div class="dialogred_loader">'+
                '<div class="dialogred_loader1">'+
                  '<div class="rect1"></div>'+
                  '<div class="rect2"></div>'+
                  '<div class="rect3"></div>'+
                  '<div class="rect4"></div>'+
                  '<div class="rect5"></div>'+
                '</div>'+
             '</div>'+
        '</div>';

		$("body").append(dialkarkas);
	}

    //twice
    $('.dialogred_inner').css({
        'max-width':data.width+'px',
    });


    if (data.loading_bool){
        dialogred_loading_show();
    }

    dialogred_past(data.data);

    //if (!$(".body_dialogred_open").length){
        $('body').animate({scrollTop:0},2000);
    //}

    if (!$(".body_dialogred_open").length){
        //opening
        var scrTop=$(window).scrollTop();
        //console.log('scrTop:'+scrTop);

        $('body,html').animate({scrollTop:0},0);

        $('body').addClass('body_dialogred_open');

        $('.cmsl_outer').css({top:'-'+scrTop+'px'});
        $('.cmsl_outer').data('top',scrTop);
        $('.cmsl_outer').attr('data-top',scrTop);
    }

    if (!data.loading_bool){
        dialogred_loading_hide();

        $('body').addClass('body_dialogred_inner_show');

        setTimeout(function(){
            $('.dialogred_inner').addClass('dialogred_inner_show');
        },100);
    }
}

function dialogred_close(){
    if ($('body').hasClass('body_dialogred_inner_show')){//to not close before open
        $('body').removeClass('body_dialogred_open');

        var indent=$('.cmsl_outer').data('top');
        //console.log('indent:'+indent);
        $('.cmsl_outer').css({top:'0'});
        $('body,html').animate({scrollTop:indent+'px'},0);

        $('body').removeClass('body_dialogred_inner_show');
        $('.dialogred_inner').removeClass('dialogred_inner_show');

        $('.dialogred_modal').remove();
    }
}


$(document).on("click",".dialogred_close_esh",function(){
    //console.log(dialogred_close_bool);
    dialogred_close();
});

/*
//$(document).mouseup(function(e){
$(document).on('click',function(e){
    //console.log('x1');
    if ($('.dialogred_modal').data('curtain_close_bool')){
        if ($(e.target).closest(".dialogred_inner").length) return;
        dialogred_close();
        e.stopPropagation();
    }
});
*/

$(document).on('click','.dialogred_overlay',function(e){
    if ($('.dialogred_modal').data('curtain_close_bool')){
        dialogred_close();
        e.stopPropagation();
    }
});