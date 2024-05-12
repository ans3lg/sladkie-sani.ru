function catalog_favorite_tovar_dataget(){
	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/favorite/ajax.php?task=dataget',
		cache:false,
		data:{},
		success:function(data){
			//console.log(data);
			var d=data.split('|');
			var status=d[0];
			var count=d[1];
			count=parseInt(count,10);
			if (status=='OK'){
				if ($('.catalog_favorite_tovar_dataget_isset_condition').length){
					if (count>0){
						$('.catalog_favorite_tovar_dataget_isset_condition').addClass('isset');
					}else{
						$('.catalog_favorite_tovar_dataget_isset_condition').removeClass('isset');
					}
				}
			}
		}
	});
}

function catalog_favorite_tovar_status_set(tovar_id,bool){
	if ($('.catalog_favorite_label[data-tovar_id="'+tovar_id+'"]').length){
		//console.log('x'+bool);
		bool=parseInt(bool,10);
		if (bool){
			$('.catalog_favorite_label[data-tovar_id="'+tovar_id+'"]').addClass('active');
		}else{
			$('.catalog_favorite_label[data-tovar_id="'+tovar_id+'"]').removeClass('active');
		}
	}
}

function catalog_favorite_tovar_status_upd(tovar_id){
	//console.log('tovar_id:'+tovar_id);
	if (tovar_id){
		$.ajax({
			type:'GET',
			url:'/modul/catalog/plugin/favorite/ajax.php?task=status&tovar_id='+tovar_id,
			cache:false,
			data:{},
			success:function(data){
                //console.log(data);
                var d=data.split('|');
				if (d[0]=='OK'){
					catalog_favorite_tovar_status_set(tovar_id,d[1] );
				}
			}
		});
	}

	catalog_favorite_tovar_dataget();
}

$(document).on('click','.catalog_favorite_label',function(){
	var tovar_id=$(this).data('tovar_id');
	//console.log('tovar_id:'+tovar_id);

	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/favorite/ajax.php?task=toggle&tovar_id='+tovar_id,
		cache:false,
		data:{},
		success:function(data){
			//console.log(data);
			if (data=='OK'){
				catalog_favorite_tovar_status_upd(tovar_id);
			}
		}
	});
});

$(document).on('click','.catalog_favorite_delete',function(){
	var tovar_id=$(this).data('tovar_id');
	//console.log('tovar_id:'+tovar_id);

	$.ajax({
		type:'GET',
		url:'/modul/catalog/plugin/favorite/ajax.php?task=delete&tovar_id='+tovar_id,
		cache:false,
		data:{},
		success:function(data){
			//console.log(data);
			if (data=='OK'){
				location.href=location.href;
			}
		}
	});
});