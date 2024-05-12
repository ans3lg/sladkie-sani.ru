/*
function headerfixed_size(){
    var width=$(window).width();
    //console.log(width);
    var bool=0;
    if (width>0){
        if (width>768){
            bool=1;
        }
    }

    var h='auto';

    if (bool){
        $('.headerfixed').addClass('fixed');

        var h=$('.headerfixed_inner2').height()+'px'
    }else{
        $('.headerfixed').removeClass('fixed');
    }

    //console.log(h);
    $('.headerfixed').css({'height':h,});
}
*/

$(window).scroll(function(){
    var scr=$(this).scrollTop();
    var width=$(window).width();
    //console.log(width);

    //console.log(scr);

    if (scr>35){
        $('body').addClass('body_headerfixed_fixed0');
    }else{
        $('body').removeClass('body_headerfixed_fixed0');
    }

    var indent=130;
    if (scr>indent){
        $('body').addClass('body_headerfixed_fixed2');
    }else{
        $('body').removeClass('body_headerfixed_fixed2');
    }
});

//$(function(){
    //headerfixed_size();
    //$(window).trigger('scroll');
//});

/*
setInterval(function(){
  headerfixed_size();
},500);

$(function(){
    //console.log('d');
    setInterval(function(){
        headfixed_check();
    },500);
});
*/

//Start New scroll fixed 2018
var scroll_value=0;
$(function(){
    scroll_value=$(window).scrollTop();
    //console.log(scroll_value);

    $(window).scroll(function(){
        var scr=$(this).scrollTop();
            //console.log('scr:'+scr+', scroll_value:'+scroll_value);

            //var diff=scr-scroll_value;
            //var diff=Math.abs(diff);
            //console.log(diff);

            if (scr>scroll_value){//exactly so
                $('body').removeClass('body_headerfixed_scrolling_back_fixed');
                //$('.header1').addClass('header1_start');
            }else{
                $('body').addClass('body_headerfixed_scrolling_back_fixed');
            }

        scroll_value=scr;
    });
});
//End New scroll fixed 2018

$(function(){
    $(window).trigger('scroll');
});