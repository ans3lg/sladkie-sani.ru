$(document).on('click','.adaptivetoggle a',function(event){
    event.preventDefault();

    $.ajax({
        url:'/option/js/adaptivetoggle/ajax.php?act=toggle',
        type:"POST",
        cache:false,
        //data:data,
        success: function(data){
            //console.log('adp_ajax');
            //location.reload()
            location.href=location.href;
        }
    });
});

$(function(){
    var width=screen.width;//width this screen,no document
    //console.log(width);
    if (width<=1024){
        $('.adaptivetoggle').show();
    }else{//no need to hide
        //$('.adaptivetoggle').hide();
    }
});