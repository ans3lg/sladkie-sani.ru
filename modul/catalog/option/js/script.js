$(function(){
    if ($('.catalog__tovar_list1').length){
        var w=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (w>=768){
            $('.catalog__tovar_list1').each(function(i,elm){
               $(this).find('.catalog__tovar_list1_item_head').matchHeight({});
            });
        }
    }
});

$(document).on('click','.catalog__tovar_list1_item_in_card2_delete',function(){
    var parent0=$(this).closest('.catalog__tovar_list1_item');

    parent0.find('.catalog__basket_formtovar1_del').trigger('click');
});


function catalog_tovar_view_init(){
    //var html=$('.catalog__tovar_view_action_print_wrap').html();
    //$('.catalog__tovar_view_action_print_adpt_wrap').html(html);
}



//start oform
function catalog_basket_oform_delivery_virt_arrange(){
    var value=$('.catalog__basket_action_oform input[name="delivery_virt_type_key"]').filter(':checked').val();
    //console.log(value);
    if (value){
        $('.catalog__basket_action_oform_delivery_need_date').hide();
        $('.catalog__basket_action_oform_delivery_adress').hide();

        $('.catalog__basket_action_oform_itog_summa_delivery_span_standart').show();
        $('.catalog__basket_action_oform_itog_summa_delivery_span_nestandart').hide();

        var split1=value.split('_');
        //console.log(split1[0]);
        if (split1[0]=='1'){
        }else if (split1[0]=='2'){//auto delivery
            $('.catalog__basket_action_oform_delivery_need_date').show();
            $('.catalog__basket_action_oform_delivery_adress').show();
        }else if (split1[0]=='3'){//tk
            $('.catalog__basket_action_oform_delivery_adress').show();

            $('.catalog__basket_action_oform_itog_summa_delivery_span_standart').hide();
            $('.catalog__basket_action_oform_itog_summa_delivery_span_nestandart').show();
        }
    }
}

function catalog_basket_oform_init(){
	$('.catalog__basket_action_oform input[type="text"]').attr('autocomplete','off');
	$('.catalog__basket_action_oform textarea').attr('autocomplete','off');

	catalog_basket_oform_delivery_virt_arrange();

    $('.catalog__basket_action_oform input[name="attach_file"]').change(function(){
        var parent1=$(this).closest('.catalog__basket_action_oform_styling_file');

        var value=$(this).val();
        //console.log(value);
        parent1.find('.catalog__basket_action_oform_styling_file_virt_info').attr('title',value);
        parent1.find('.catalog__basket_action_oform_styling_file_virt_info_span').html(value);
    });

    if ($('.catalog__basket_action_oform input[name="delivery_need_date"]').length){
        $('.catalog__basket_action_oform input[name="delivery_need_date"]').datepicker({
            changeMonth:true,
            changeYear:true,
            //yearRange: '1920:2000',
            yearRange:'2019:+1',
            //maxDate:'@maxDate',
            //minDate:'@minDate',
            //showButtonPanel:true,
            //inline:true,
            firstDay:1,
            showOtherMonths:true,
            dateFormat:'dd.mm.yy',
            dayNamesMin:['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'],
            monthNames:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        });
        $.datepicker.setDefaults($.datepicker.regional['ru']);
    }

     $('.catalog__basket_action_oform input[name="delivery_virt_type_key"]').on('change',function(){
        var value=$(this).filter(':checked').val();
        //console.log(value);

        $.ajax({
            type:'GET',
            url:'/modul/catalog/option/ajax.php?task=basket_oform_send_delivery_virt',
            data:{
                'value':value,
            },
            cache:false,
            success:function(data){
                //console.log(data);
                if (data=='OK'){
                    catalog_basket_oform_delivery_virt_arrange();

                    catalogBasketDataget();
                }
            }
        });
     });
}

$(document).on('click','.catalog__basket_action_oform_type_lico_list_item',function(){
    $('.catalog__basket_action_oform_type_lico_list_item').removeClass('active');

    var id=$(this).data('id');

    $(this).addClass('active');
    $('.catalog__basket_action_oform input[name="type_lico_id"]').val(id);

    $('.catalog__basket_action_oform').data('type_lico_id',id);
    $('.catalog__basket_action_oform').attr('data-type_lico_id',id);
});

$(document).on('click','.catalog__basket_action_oform_but_button',function(){
    var parent1=$('.catalog__basket_action_oform');

    $('.catalog__basket_action_oform').addClass('loading');
    $('.catalog__basket_action_oform_but_button').prop('disabled',true);

    $('.catalog__basket_action_oform_labelform').removeClass('err');
    $('.catalog__basket_action_oform_error').hide();
    $('.catalog__basket_action_oform_error').html('');

	var formdata={};
	formdata=$('.catalog__basket_action_oform_form').serializeJSON({});
	//serializeJSON({});
	//serializeAll('json');
	//console.log(formdata);

	//console.log(formdata);
	$.ajax({
		type:'POST',
		url:'/modul/catalog/option/ajax.php?task=basket_oform_send',
		data:formdata,
        cache:false,
		success:function(data){
			//console.log(data);

            $('.catalog__basket_action_oform').removeClass('loading');
            $('.catalog__basket_action_oform_but_button').prop('disabled',false);

			var split1=data.split('||');
			//console.log(split1);
			if (split1[0]=='result'){
				//console.log('result');
				$('.catalog__basket_action_oform_form').submit();
			}else if (split1[0]=='error'){
			    //console.log('error');
				var split2=split1[1].split('|');
				//console.log(split2);
				for(i=0;i<split2.length;i++){
					var key=split2[i];
					$('.catalog__basket_action_oform_labelform[data-label_key="'+key+'"]').addClass('err');

                    var error_text=split1[2];
                    if (error_text){
                        $('.catalog__basket_action_oform_error').html(error_text);
                        $('.catalog__basket_action_oform_error').show();
                    }
                }
            }
        }
    });
});
//end oform

function catalog_basket_action_oform_manager_change(id){
    $('.catalog__basket_action_oform_manager_list_item').removeClass('active');

    $('.catalog__basket_action_oform_manager_list_item[data-id="'+id+'"]').addClass('active');
    $('.catalog__basket_action_oform_manager_input_manager_id').val(id);

    $('.catalog__basket_action_oform_manager_sel_select').val(id);
}

$(document).on('click','.catalog__basket_action_oform_manager_list_item',function(){
    var id=$(this).data('id');
    catalog_basket_action_oform_manager_change(id);
});

$(document).on('change','.catalog__basket_action_oform_manager_sel_select',function(){
    var id=$(this).val();
    catalog_basket_action_oform_manager_change(id);
});