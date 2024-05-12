$.preloadImages=function(){
	for(var i=0;i<arguments.length;i++){
		$("<img>").attr("src",arguments[i]);
		//console.log(arguments[i]);
	}
};

$(document).on('click','.anchorto',function(){
    var id=$(this).attr('rel');
    var o=$('#anchorto_'+id).offset();
    //console.log(o);
    if (o.top>0){
        $('body,html').animate({scrollTop:o.top},500);
    }
});

function Get(par1){
    location.href=par1;
}

function Intval(mixed_var,base){
  var type=typeof(mixed_var);
  if (type==='boolean'){return +mixed_var;}
  else if (type==='string'){
    var tmp=parseInt(mixed_var, base || 10);
    return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
  }else if (type === 'number' && isFinite(mixed_var)){
    return mixed_var | 0;
  }else{return 0;}
}

function Posmo(par,d_tx_block,d_tx_none,thiss){
	var d=$('#posmo_'+par).css('display');
	if (d!='none'){
		$(thiss).html(d_tx_block);
	}else{
		$(thiss).html(d_tx_none);
	}
	if (d=='none'){
		$('#posmo_'+par).slideDown(300);
		
	}else{
		$('#posmo_'+par).slideUp(320);
	}
}

(function($){
    $.fn.serializeAll=function(type){
        if(type=='uri'){
            var toReturn=[];
            var els= $(this).find(':input').get();
            $.each(els,function(){
                if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))){
                    var val=$(this).val();
                    toReturn.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( val ) );
                }
            });
            return toReturn.join("&").replace(/%20/g,"+");
        } 

        if(type=='json'){
            var els=$(this).find(':input').get();
            var json={};
            $.map($(els).serializeArray(),function(n,i){
				value=n['value'];
				value=encodeURIComponent(value).replace(/'/g,"%60");
                json[n['name']]=value;
            });
         return json;
        };
   };
})(jQuery);

$(function(){
    //$(".gallerybox").fancybox({});
    $(".gallerybox").data('fancybox','');
    $(".gallerybox").attr('data-fancybox','');

    $(".gallerybox_group1").data('fancybox','gallerybox_group1');
    $(".gallerybox_group1").attr('data-fancybox','gallerybox_group1');
    //$("[data-fancybox='gallerybox_group1']").fancybox({});
});

//<a href="#" class="site_dialog" data-id="210">Пользовательское соглашение</a>
$(document).on('click','.site_dialog',function(event){
    event.preventDefault();

    var id=$(this).data('id');
    //console.log('id:'+id);

    if (id){
        dialogred({
            data:'',
            loading_bool:1,
            width:'600',
            //template:'1',
        });
        $.ajax({
            type:'GET',
            url:'/option/ajax.php?task=site_dialog&id='+id,
            cache:false,
            data:{},
            success:function(data){
                //console.log('data:'+data);

                dialogred({
                    data:data,
                    width:'600',
                    //template:'1',
                })
            }
        });
    }
});

$(document).on('click','.custom_toggle_header',function(){
    var parent1=$(this).closest('.custom_toggle');

    var hasClassBool=0;
    if (parent1.hasClass('active')){
        hasClassBool=1;
    }

    if (!hasClassBool){
        parent1.addClass('active');
		parent1.find('.custom_toggle_content').slideDown(400);
    }else{
		parent1.removeClass('active');
		parent1.find('.custom_toggle_content').slideUp(200);
	}
});