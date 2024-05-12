//array divider
function array_chunk2(arr,size){
	var tempAr=[];
	var j=0;
	for(var i=0;i<arr.length;i++){ 
		if(j==size || j==0){
			tempAr.push(arr.slice(i,(i+size)));
			j=0;
		}
		j++;
	}
	return tempAr;
}
//x='59,60,61,62';
//xArr=x.split(',');
//console.log(xArr);
//xArrChunk=array_chunk2(xArr,15);
//console.log(xArrChunk);

function catalog_valid1(val){//only number
    var ret='';
	if (val!=''){
	    var val=val.toString();
		ret=val.replace(/[^\d]/g,'');
	}
	return ret;
}

//check input value
function catalog_basket_value(val){
    //console.log(val);
    val=catalog_valid1(val);
    val=Intval(val);
    if (val<1){
		val=1;
	}
	return val;
}

function catalogBasketDataget(callback){
	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/basket/ajax.php?task=basket_dataget',
		cache:false,
		data:{},
		success:function(data){
			//console.log(data);
			var d=data.split('|');
			var summa_tovar_basic=d[0];
			var summa_tovar=d[1];
			var summa_tovar_discount=d[2];
			var summa_dostav=d[3];
			var summa=d[4];
			var kolvo=d[5];
			var kolvo_wordform=d[6];
			var summa_default=d[7];
			$('.catalog__basket_dataget_summa_tovar_basic').html(summa_tovar_basic);
			$('.catalog__basket_dataget_summa_tovar').html(summa_tovar);
			$('.catalog__basket_dataget_summa_tovar_discount').html(summa_tovar_discount);
			$('.catalog__basket_dataget_summa_dostav').html(summa_dostav);
			$('.catalog__basket_dataget_summa').html(summa);
			$('.catalog__basket_dataget_kolvo').html(kolvo);
			$('.catalog__basket_dataget_kolvo_wordform').html(kolvo_wordform);
		}
	});
}

function catalogBasketAddtovar(tovar_id,kolvo,cat_id,callback){
	///modul/catalog/plugin/basket/ajax.php?task=addtovar&id=26&kolvo=1&cat_id=3
	//console.log('id:'+id+', kolvo:'+kolvo+', cat_id:'+cat_id);
	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/basket/ajax.php?task=addtovar',
		cache:false,
		data:{
		    'tovar_id':tovar_id,
		    'kolvo':kolvo,
		    'cat_id':cat_id
        },
		dataType:"json",
		success:function(data){
			//console.log(data);
			if (data.res){
				if (callback){
					callback();
				}

				catalogBasketDataget();
			}
		}
	});
}

function catalog_basket_deltovar(tovar_id,callback){
	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/basket/ajax.php?task=deltovar',
		cache:false,
		data:{
			'tovar_id':tovar_id,
		},
		success:function(data){
			//console.log(data);
			if (data=='ok'){
				catalogBasketDataget();

				if (callback){
					callback();
				}
			}
		}
	});
}

$(function(){
	catalogBasketDataget();
});

$(document).on('click','.catalog__basket_clear',function(){
    if (confirm("Вы действительно решили очистить корзину?")){
        $.ajax({
            type:'GET',
            url:'/modul/catalog/plugin/basket/ajax.php?task=clear',
            cache:false,
            data:{},
            success:function(data){
                //console.log(data);
                if (data=='ok'){
                    catalogBasketDataget();
                    location.href='/catalog/basket/';
                }
            }
        });
    }else{
        return false;
    }
});

function catalogBasketFormtovarStatus(id,bool,callback){
	var ths=$('.catalog__basket_formtovar[data-tovar_id="'+id+'"]');
	var ths2=$('.catalog__basket_tovarlabel[data-tovar_id="'+id+'"]');
	if (ths.length){//no clean up
		if (bool){
			if (ths){
				ths.addClass('inbasket');
			}
			if (ths2){
				ths2.addClass('inbasket');
			}
		}else{
			if (ths){
				ths.removeClass('inbasket');
			}
			if (ths2){
				ths2.removeClass('inbasket');
			}

			var val;
			val=ths.data('calc_input_default');
			val=catalog_basket_value(val);

			$(ths).find('.catalog__basket_formtovar_kolvo').val(val);
		}
	}

	if (callback){
		callback();
	}
}

function catalogBasketKorzinaDatatovarget(tovar_id){
	//console.log(id);
	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/basket/ajax.php?task=basket_korzina_datatovarget',
		cache:false,
		data:{
			'tovar_id':tovar_id,
		},
		success:function(data){
			//console.log(data);
			var d=data.split('|');
			var tovar_id=d[0];
			var price=d[1];
			var summa=d[2];
			$('.catalog__basket_korzina_datatovarget_summa[data-tovar_id="'+tovar_id+'"]').html(summa);
		}
	});
}

/*
function catalogBasketFormtovar2Kolvo(id,val){
	ths=$('.catalog__basket_formtovar2[data-tovar_id="'+id+'"]');
	if (ths.length){//no clean
		ths.find('.kolvo').val(val);
	}
}
*/

/*****/

$(document).on('click','.catalog__basket_formtovar1_add',function(event){
    event.preventDefault();

	var parent1=$(this).closest('.catalog__basket_formtovar');
	var parent2=$(this).closest('.catalog__basket_tovarlabel');

	var tovar_id=parent1.data('tovar_id');
	var cat_id=parent1.data('cat_id');
	var kolvo=parent1.find('.catalog__basket_formtovar_kolvo').val();
	kolvo=parseInt(kolvo,10);
	//console.log('tovar_id:'+tovar_id+', cat_id:'+cat_id+',kolvo:'+kolvo);

    var bool=0;
	if (kolvo>0){
	    bool=1;
    }

	parent1.addClass('loading');

	catalogBasketAddtovar(tovar_id,kolvo,cat_id,function(){
		//console.log(bool);
		parent1.removeClass('loading');
		catalogBasketFormtovarStatus(tovar_id,bool,'');
	});
});

$(document).on('click','.catalog__basket_formtovar1_del',function(){
	var parent1=$(this).closest('.catalog__basket_formtovar');
	var tovar_id=parent1.data('tovar_id');

	catalog_basket_deltovar(tovar_id,function(){
		catalogBasketFormtovarStatus(tovar_id,0,'');
	});
});

$(document).on('click','.catalog__basket_formtovar1_minus',function(){
	var parent1=$(this).closest('.catalog__basket_formtovar');
	var val=parent1.find('.catalog__basket_formtovar_kolvo').val();
	val=Intval(val);
	val=val-1;
	//console.log(val);

	parent1.find('.catalog__basket_formtovar_kolvo').val(val)
	parent1.find('.catalog__basket_formtovar_kolvo').trigger('keyup');
});

$(document).on('click','.catalog__basket_formtovar1_plus',function(){
	var parent1=$(this).closest('.catalog__basket_formtovar');
	var val=parent1.find('.catalog__basket_formtovar_kolvo').val();
	val=Intval(val);
	val=val+1;
	//console.log(val);

	parent1.find('.catalog__basket_formtovar_kolvo').val(val)
	parent1.find('.catalog__basket_formtovar_kolvo').trigger('keyup');
});



$(document).on('click','.catalog__basket_formtovar2_add',function(event){
    event.preventDefault();

	var parent1=$(this).closest('.catalog__basket_formtovar');
	var parent2=$(this).closest('.catalog__basket_tovarlabel');

	var tovar_id=parent1.data('tovar_id');
	var cat_id=parent1.data('cat_id');
	var kolvo=parent1.find('.catalog__basket_formtovar_kolvo').val();
	kolvo=parseInt(kolvo,10);
	//console.log('tovar_id:'+tovar_id+', cat_id:'+cat_id+',kolvo:'+kolvo);

    var bool=0;
	if (kolvo>0){
	    bool=1;
    }

	parent1.addClass('loading');

	catalogBasketAddtovar(tovar_id,kolvo,cat_id,function(){
		//console.log(bool);
		parent1.removeClass('loading');
		catalogBasketFormtovarStatus(tovar_id,bool,'');
	});
});

$(document).on('click','.catalog__basket_formtovar2_del',function(){
	var parent1=$(this).closest('.catalog__basket_formtovar');
	var tovar_id=parent1.data('tovar_id');

	catalog_basket_deltovar(tovar_id,function(){
		catalogBasketFormtovarStatus(tovar_id,0,'');
	});
});

$(document).on('click','.catalog__basket_formtovar2_minus',function(){
	var parent1=$(this).closest('.catalog__basket_formtovar');
	var val=parent1.find('.catalog__basket_formtovar_kolvo').val();
	val=Intval(val);
	val=val-1;
	//console.log(val);

	parent1.find('.catalog__basket_formtovar_kolvo').val(val)
	parent1.find('.catalog__basket_formtovar_kolvo').trigger('keyup');
});

$(document).on('click','.catalog__basket_formtovar2_plus',function(){
	var parent1=$(this).closest('.catalog__basket_formtovar');
	var val=parent1.find('.catalog__basket_formtovar_kolvo').val();
	val=Intval(val);
	val=val+1;
	//console.log(val);

	parent1.find('.catalog__basket_formtovar_kolvo').val(val)
	parent1.find('.catalog__basket_formtovar_kolvo').trigger('keyup');
});

$(document).on('keyup change','.catalog__basket_formtovar_kolvo',function(event){
	//37-arrw left,39-arrow right,35-end,36-home,8-del,9-tab
	var bool=1;
	if (event.keyCode==37 || event.keyCode==39 || event.keyCode==35 || event.keyCode==36 || event.keyCode==8){
		bool=0;
		//if del end symbo no calc
		if (event.keyCode==8){
			if ($(this).val()!=''){
				bool=1;
			}
		}
	}
	if (bool){
		var parent1=$(this).closest('.catalog__basket_formtovar2');
		var id=parent1.data('tovar_id');

		var val=$(this).val();
		var val=catalog_basket_value(val);
		$(this).val(val);
	}
});



$(document).on('change keyup','.catalog__basket_formtovar_korzina2 input[name="kolvo"]',function(event){
	var parent1=$(this).closest('.catalog__basket_formtovar_korzina2');

	var tovar_id=parent1.data('tovar_id');

	var kolvo=$(this).val();
	//console.log('tovar_id:'+tovar_id+', kolvo:'+kolvo);

	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/basket/ajax.php?task=addtovar',
		cache:false,
		data:{
			'tovar_id':tovar_id,
			//'cat_id':cat_id,
			'kolvo':kolvo,
		},
		dataType:'json',
		success:function(data){
			//console.log(data);
			if(typeof(data)=='object'){
				if (data.res){
					catalogBasketKorzinaDatatovarget(tovar_id);
					catalogBasketDataget();
				}
			}
		}
	});
});

$(document).on('click','.catalog__basket_formtovar_korzina_del span',function(){
	var parent0=$(this).closest('.catalog__basket_action').find('.tovar_list');

	var parent1=$(this).closest('.catalog__basket_formtovar_korzina_del');
	var tovar_id=parent1.data('tovar_id');

	catalog_basket_deltovar(tovar_id,function(){
		parent1.closest('tr').fadeOut(500,function(){
		    $(this).remove();
        });
	});
});