function catalog__schtovar_action(){
    var argument_url=$('.catalog__schtovar_page_data').data('argument_url');
    var u1=new Url('/modul/catalog/plugin/schtovar/ajax.php'+argument_url);
    //console.log(u1.query);
    var u1_string=u1.toString();
    //console.log(u1_string);

    if ($('.catalog__schtovar_page_infohub_sort_list').length){
        var key='';
        var key_ret='';
        key=$('.catalog__schtovar_page_infohub_sort_list_item.active').data('key');
        if (key=='price' || key=='name'){
            if ($('.catalog__schtovar_page_infohub_sort_list_item.active').hasClass('upper')){
                key_ret=key;
            }else{
                key_ret=key+'_desc';
            }
        }else{
            key_ret=key;
        }

        u1.query.sort=key_ret;
    }else{
        u1.query.sort=null;
    }

    var brand_id='';
    if ($('.catalog__schtovar_page_filterhub select[name="brand_id"]').length){
        var brand_id=$('.catalog__schtovar_page_filterhub select[name="brand_id"]').val();
    }
    if (brand_id){
        u1.query.brand_id=brand_id;
    }else{
        u1.query.brand_id=null;
    }

    u1.query.page='1';


    var action_type_id='';
    var price_share_bool='';
    if ($('.catalog__schtovar_page_filterhub_action_list_item.active').length){
        var event_key=$('.catalog__schtovar_page_filterhub_action_list_item.active').data('event_key');
        var event_id=$('.catalog__schtovar_page_filterhub_action_list_item.active').data('event_id');
        //console.log('event_key:'+event_key+',event_id:'+event_id);

        if (event_key=='action'){
            action_type_id=event_id;
        }else if (event_key=='price_share'){
            price_share_bool=1;
        }
    }
    if (action_type_id){
        u1.query.action_type_id=action_type_id;
    }else{
        u1.query.action_type_id=null
    }
    if (price_share_bool){
        u1.query.price_share_bool=price_share_bool;
    }else{
        u1.query.price_share_bool=null
    }

    u1_string=u1.toString();
    //console.log(u1_string);
    //console.log(u1);

    $('body').addClass('body_catalog__schtovar_loading');

    $.ajax({
        type:'POST',
        url:u1_string,
        dataType:'json',
        cache:false,
        //data:FD,
        success:function(data){
            //console.log(data);

            $('body').removeClass('body_catalog__schtovar_loading');

            if(typeof(data)=="object"){
                //console.log(data.resArray);
                if (data.resArray.result_bool=='OK'){
                    $('.catalog__schtovar_page_data').data('argument_url',data.resArray.argument_url);
                    $('.catalog__schtovar_page_data').attr('data-argument_url',data.resArray.argument_url);

                    $('.catalog__schtovar_page_tovar_all_count').html( data.resArray.tovar_all_count );
                    $('.catalog__schtovar_page_view_list').html( data.resArray.list_view );
                    $('.catalog__schtovar_page_view_pagenav').html( data.resArray.pagenav_view );


                    var url=data.resArray.argument_url;
                    var title='';
                    var state={
                        url:url,
                        title:title,
                    };
                    history.pushState(state,title,url);
                    $(document).prop('title',title);
                }
            }
        },
        error: function(xhr, status, error){
            //console.log(status+' - '+error);
        },
    });
}

//https://stackoverflow.com/questions/8038726/how-to-trigger-change-when-using-the-back-button-with-history-pushstate-and-pops/8038811
//brouser back click
$(function(){
    $(window).on("popstate",function(e){
        location.reload();
        //console.log('reload popstate');
    });
});

$(document).on('click','.catalog__schtovar_page_infohub_sort_list_item',function(){
    var key=$(this).data('key');

    var upperBool=0
    if ($(this).hasClass('upper')){
        upperBool=1;
    }

    var lowerBool=0
    if ($(this).hasClass('lower')){
        lowerBool=1;
    }

    var activeBool=0;
    if ($(this).hasClass('active')){
        activeBool=1;
    }

    $('.catalog__schtovar_page_infohub_sort_list_item').removeClass('active');
    $('.catalog__schtovar_page_infohub_sort_list_item').removeClass('upper');
    $('.catalog__schtovar_page_infohub_sort_list_item').removeClass('lower');

    $(this).addClass('active');
    //console.log(key);
    if (key=='price' || key=='name'){
        var upperBool_new=0;
        var lowerBool_new=0;
        if (upperBool || lowerBool){
            if (upperBool){
                lowerBool_new=1;
            }else{
                upperBool_new=1;
            }
        }else{
            upperBool_new=1;
        }

        if (upperBool_new){
            $(this).addClass('upper');
        }else{
            $(this).addClass('lower');
        }
    }

    catalog__schtovar_action();
});

$(document).on('change','.catalog__schtovar_page_filterhub select[name="brand_id"]',function(){
    catalog__schtovar_action();
});

$(document).on('click','.catalog__schtovar_page_filterhub_action_list_item_span',function(){
    var parent1=$(this).closest('.catalog__schtovar_page_filterhub_action_list_item');

    var activeLastBool=0;
    if (parent1.hasClass('active')){
        activeLastBool=1;
    }

    $('.catalog__schtovar_page_filterhub_action_list_item').removeClass('active');

    if (!activeLastBool){
        parent1.addClass('active');
    }

    catalog__schtovar_action();
});

$(document).on('change','select[name="filterhumb_culumn_sbrand"]',function(){
    var url=$(this).children('option:selected').data('url')
    //console.log(url);
    location.href=url;
});

$(document).on('change','select[name="filterhumb_culumn_color"]',function(){
    var url=$(this).children('option:selected').data('url')
    //console.log(url);
    location.href=url;
});

$(document).on('change','select[name="filterhumb_culumn_material"]',function(){
    var url=$(this).children('option:selected').data('url')
    //console.log(url);
    location.href=url;
});