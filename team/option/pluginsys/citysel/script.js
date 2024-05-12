//текст
function citysel_randomInteger(min,max){
    var rand=min + Math.random() * (max + 1 - min);
    rand=Math.floor(rand);
    return rand;
}

$(document).on('click','.citysel_pane_open',function(event){
    event.preventDefault();
    event.stopPropagation();

    var data='';

    //var rand=citysel_randomInteger(1,999999);
    //data+='<link rel="stylesheet" href="/team/option/pluginsys/citysel/dialog_style.css?rand='+rand+'" type="text/css">';

    data+=$('.citysel_dialog_par').html();
    //console.log(data);

    dialogred({
        data:data,
        width:'900',
        vert:'center',
        //advent:'simple',
        template:'3',
    });
});

$(document).on('click','.citysel_dialog_city_change_click',function(event){
    event.preventDefault();
    //event.stopPropagation();

    var formdata={};

    var city_par=$(this).data('city_par');
    //formdata.city_par=city_par;

    //https://stackoverflow.com/questions/332872/encode-url-in-javascript
    //var url=window.location.href ;
    //var url=location.pathname+location.search;
    var url=window.location.pathname + window.location.search + window.location.hash;
    //console.log(url);
    url=encodeURIComponent(url);
    formdata.url=url;

	$.ajax({
		type:'POST',
		url:'/team/option/pluginsys/citysel/ajax.php?task=change_change&city_par='+city_par,
		cache:false,
		data:formdata,
		dataType:'json',
		success:function(data){
		    //console.log(data);
			if(typeof(data)=="object"){
                if (data.resExecute=='OK'){
                    if (data.resValue=='OK'){
                        location.href=data.resArray.url;
                    }
                }
            }
		}
	});
});


$(document).on('click','.citysel_pane_selectloc_elect',function(event){
	event.preventDefault();

	var parent0=$(this).closest('.citysel_pane_selectloc');

	if (parent0.hasClass('show')){
		//console.log('d');
		parent0.removeClass('show');
	}else{
		parent0.addClass('show');
	}
});

//$(document).mouseup(function(e){
$(document).on('click',function(e){
    //console.log('x1');
    if ($(e.target).closest('.citysel_pane_selectloc').length){
        return;
    }
    $('.citysel_pane_selectloc').removeClass('show');
    e.stopPropagation();
});