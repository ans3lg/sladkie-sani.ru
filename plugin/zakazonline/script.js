$(document).on('click','.zakazonline',function(event){
    event.preventDefault();
    event.stopPropagation();

    var param=$(this).data('zakazonline-param');
    var zagol1=$(this).data('zakazonline-zagol1');
    var zagol2=$(this).data('zakazonline-zagol2');
    var template=$(this).data('zakazonline-template');//1,2

    /*
    var direct_id='';
    if ($('.sendparamunion__direct_id').length){
        direct_id=$('.sendparamunion__direct_id').html();
    }
    */

    if (typeof param==="undefined"){
        param='';
    }
    if (typeof zagol1==="undefined"){
        zagol1='';
    }
    zagol1=encodeURIComponent(zagol1).replace(/'/g,"%60");
    if (typeof zagol2==="undefined"){
        zagol2='';
    }
    zagol2=encodeURIComponent(zagol2).replace(/'/g,"%60");
    //console.log('param:'+param+', zagol1:'+zagol1+', zagol2:'+zagol2);

    if (typeof template==="undefined"){
        template='1';
    }
    
    var formdata={};//не квадратные
    if (param){
        $(param).addClass('loading');
        $(param).find('.dialogclass_button').attr('disabled',true);

        formdata=$(param+' form').serializeAll('json');
    }
    formdata['urlsend']=location.href;
    //console.log(formdata);

    if (!param){
        dialogred({
            data:'',
            loading_bool:1,
            width:'420',
        });
    }

    if (param){
        $('.zakazonline__wrap button').prop('disabled',true);
    }

    //+'&direct_id='+direct_id
    $.ajax({
        type:'POST',
        url:'/plugin/zakazonline/ajax.php?param='+param+'&zagol1='+zagol1+'&zagol2='+zagol2+'&template='+template,
        cache:false,
        data:formdata,
        success:function(data){
            dialogred({
                data:data,
                width:'420',
            })

            $('.dialogclass input').attr('autocomplete','off');
        }
    });
});