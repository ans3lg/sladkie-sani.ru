$(document).on('click','.header_menusun_opener_adpt',function(event){
    event.preventDefault();

    if ($('body').hasClass('menu_state_open')){
        $('body').removeClass('menu_state_open');
    }else{
        $('body').addClass('menu_state_open');
    }
});

$(document).on('click','.header_menusun_curtain',function(event){
    $('body').removeClass('menu_state_open');
});

/*
$(function(){
    var tmp=$('#menu_popup_contact_inpast').html();
    //tmp='dddd';
    $('.header1_menu').append(tmp);
});
*/

/*
document.addEventListener('DOMContentLoaded',function(){
    var tmp=document.querySelector('#menu_popup_contact_inpast').innerHTML;
    console.log(tmp);
    tmp='d';

     document.querySelector('.header1_menu').appendChild(tmp);
});
*/