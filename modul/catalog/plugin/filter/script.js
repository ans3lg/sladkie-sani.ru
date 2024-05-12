function catalog_filter_randomInteger(min, max){
    var rand=min + Math.random() * (max + 1 - min);
    rand=Math.floor(rand);
    return rand;
}

function catalog_filter_tryParseInt(str, defaultValue){
    return parseInt(str)==str?parseInt(str,10):defaultValue;
}

function catalog_filter_number_valid(val){//only number
	if (val!=''){
		val=val.replace(/[^\d]/g,'');
	}
	return val;
}

function catalog_filter_EmptyObject(obj){
    if (obj){
        for(var prop in obj){
            return false;
        }
    }
    return true;
}

function catalog_filter_EmptyArray(obj){
    if (obj){
        if(obj.length){
            return false;
        }
    }
    return true;
}

/*
function catalog_filter_past_resizeInput(){
    var len=$(this).val().length;
    if (len<=0){
        len=0;
    }
    if (len>5){
        len=5;
    }

    var w=(len + 2) * 8;
    w=w-3;
    //console.log('len:'+len);
    //console.log('w:'+w);

    $(this).css({'width':w+'px'});
}

$('.catalog_filter_widget_form_between_input')
    // event handler
    .keyup(catalog_filter_widget_resizeInput)
    .change(catalog_filter_widget_resizeInput)
    // resize on page load
    .each(catalog_filter_widget_resizeInput);

*/

//start Refline
function catalog_filter_widget_form_refline_open(elm){
    elm.addClass('open');
}

function catalog_filter_widget_form_refline_close(elm){
    elm.removeClass('open');
}

$(document).on('click','.catalog_filter_widget_form_refline__selection',function(e){
    var elm=$(this).closest('.catalog_filter_widget_form_refline');

    if (elm.hasClass('open')){
        catalog_filter_widget_form_refline_close(elm);
    }else{
        catalog_filter_widget_form_refline_open(elm);
    }
});

$(document).on('click',function(e){
    $(".catalog_filter_widget_form_refline").removeClass('nono');
    if ($(e.target).closest(".catalog_filter_widget_form_refline").length){
        //console.log('y');
        $(e.target).closest(".catalog_filter_widget_form_refline").addClass('nono');
    }

    $(".catalog_filter_widget_form_refline").each(function(i,elm){
        if ($(this).hasClass('nono')){
        }else{
            catalog_filter_widget_form_refline_close($(this));
        }
    });

    //e.stopPropagation();
});
//end Refline


function catalog_filter_widget_init(){
}

var catalog_filter_widget_sentReqCount=0;
function catalog_filter_widget_action(){
    $('.catalog_filter_dinamic_content').addClass('loading');

    setTimeout(function(){
        catalog_filter_widget_sentReqCount++;
        catalog_filter_widget_action2(catalog_filter_widget_sentReqCount);
    },100);
}

function catalog_filter_widget_action2(sentReqNum){
    //console.log('widget action setTimeout');

    var formData={};

    //var u=new Url;
    //u.query.a.push(getPar);
    //u.query.push(getPar);
    //var urlQuery=u.query;
    //var urlQueryString=urlQuery.toString();
    //var urlString=u.toString();
    //console.log(urlQuery);
    //console.log(urlQueryString);
    //return;



    var cat_id_row=[];
    $('.cat_id_input:checked').each(function(){
        var val=$(this).val()
        cat_id_row.push(val);
    });
    //console.log(cat_id_row);

    if (!catalog_filter_EmptyArray(cat_id_row)){
        formData.cat_id_imp=cat_id_row.join(',');
    }




    var value_min_default=$('.catalog_filter_widget_form_between_price').data('value_min_default');
    var value_max_default=$('.catalog_filter_widget_form_between_price').data('value_max_default');
    var input_min=$('.catalog_filter_widget_form_between_price .input_min').val();
    var input_max=$('.catalog_filter_widget_form_between_price .input_max').val();
    //console.log(value_min_default+'='+input_min+','+input_max+'='+input_max);
    if (value_min_default==input_min && value_max_default==input_max){
        //console.log('equal');
    }else{
        //console.log('diff');
        formData.price_min=input_min;
        formData.price_max=input_max;
    }




    var value_min_default=$('.catalog_filter_widget_form_between_weight').data('value_min_default');
    var value_max_default=$('.catalog_filter_widget_form_between_weight').data('value_max_default');
    var input_min=$('.catalog_filter_widget_form_between_weight .input_min').val();
    var input_max=$('.catalog_filter_widget_form_between_weight .input_max').val();
    //console.log(value_min_default+'='+input_min+','+input_max+'='+input_max);
    if (value_min_default==input_min && value_max_default==input_max){
        //console.log('equal');
    }else{
        //console.log('diff');
        formData.weight_min=input_min;
        formData.weight_max=input_max;
    }



    /*
    var obj=$('.catalog__filter_widget_form').serializeObject();
    //console.log(obj);

    if (!catalog__filter_EmptyObject(obj)){
        formData=Object.assign(formData,obj);
    }
    */

    //console.log(formData);

    var get_param=decodeURIComponent($.param(formData));
    //console.log('get_param:'+get_param);

    //var ajaxUnique=catalog__filter_randomInteger(1,999999);

    //var init_sourse=$('.catalog__filter_widget').data('init_sourse');
    //var init_cat_id_imp=$('.catalog__filter_widget').data('init_cat_id_imp');

    // /modul/catalog/plugin/filter/ajax.php?task=dinamic_conent&cat_id_imp=1

    // /podarki/filter/?cat_id_imp=2
    //var url_href='/podarki/filter/?'+get_param;
    //location.href=url_href;
    //return;

    $.ajax({
        type:'GET',
        url:'/modul/catalog/plugin/filter/ajax.php?'+get_param,
        dataType:'json',
        cache:false,
        data:{
            task:'dinamic_conent',
            //ajax_unique:ajax_unique,
            //init_sourse:init_sourse,
            //init_cat_id_imp:init_cat_id_imp,
        },
        success:function(data){
            //console.log('ajax');
            //console.log(data)
            if (sentReqNum===catalog_filter_widget_sentReqCount){
                if(typeof(data)=="object"){
                    var url=data.resArray.url_real;
                    var breadcrumb=data.resArray.breadcrumb;
                    var razdsite=data.resArray.razdsite;
                    var title=data.resArray.title;
                    var redirect_url=data.resArray.redirect_url;
                    var user_picked=data.resArray.user_picked;

                    if (redirect_url){
                        location.href=redirect_url;
                        return;
                    }

                    $('.catalog_filter_dinamic_content_inner').html(data.resEcho);

                    var state={
                        url:url,
                        title:title,
                    };
                    history.pushState(state,title,url);
                    $(document).prop('title',title);
                    //document.title=title;

                    $('title').html(title);

                    $('.cmsl_razdsite h1').html(razdsite);

                    $('.bread_crumb').html(breadcrumb);

                    $('.catalog_filter_user_picked_ppp').html(user_picked);

                    $('.catalog_filter_dinamic_content').removeClass('loading');

                    //#own sladkie-sani
                    $('.cmsl_theme1_content_wrap').css({
                        'background-image':'',
                    });
                }
            }
        }
    });
}


$(document).on('click','.catalog_filter_widget_form_but_button',function(e){
    event.preventDefault();

    //console.log('buton');
    catalog_filter_widget_action();
});



$(document).on('click','.catalog_filter_user_picked__list_item_mark_icon',function(){
    var elm1=$(this).closest('.catalog_filter_user_picked__list_item');

    var href=elm1.data('href');
    if (href){
        location.href=href;
    }
});