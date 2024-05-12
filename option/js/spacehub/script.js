function spaceHub(){
    $('.spacehub').each(function(index){
        //reset
        $(this).css({
            'width':'auto',
            'left':'auto',
        });

        var o=$(this).offset();

        var window_width=$(window).width();
        var spacehub_width=$(this).outerWidth();
        //console.log('window_width:'+window_width+', spacehub_width:'+spacehub_width);

        if (window_width>spacehub_width){
            //var indent=(window_width-spacehub_width)/2;
            var indent=o.left;
            var width=window_width;
            //console.log('indent:'+indent+', width:'+width);

            $(this).css({
                'width':width+'px',
                'left':'-'+indent+'px',
            });
        }
    });
}

function spaceHub2(){
    $('.spacehub2').each(function(index){
        //reset
        $(this).css({
            'margin-left':'auto',
            'margin-right':'auto',
        });

        var o=$(this).offset();

        var window_width=$(window).width();
        var spacehub_width=$(this).outerWidth();//otherwise shown outwith "padding"
        //console.log('window_width:'+window_width+', spacehub_width:'+spacehub_width);

        var l_indent=o.left;

		var r_indent=window_width-(o.left+spacehub_width);
		if (r_indent<0){
			r_indent=0;
		}
		//console.log('l_indent:'+l_indent+', r_indent:'+r_indent);
		
		$(this).css({
			'margin-left':'-'+l_indent+'px',
			'margin-right':'-'+r_indent+'px',
		});
    });
}

var k_spacehub=0;
setInterval(function(){
    k_spacehub++;
    if (k_spacehub<=3){
        //console.log('k_spacehub-'+k_spacehub);
        spaceHub();
        spaceHub2();
    }
},350);

$(function(){
    spaceHub();
	spaceHub2();

    //setInterval(function(){
      //spaceHub();
	  //spaceHub2();
    //},1000);
});

$(window).on('load',function(){
    spaceHub();
	spaceHub2();
});

$(window).on('resize',function(){
    spaceHub();
	spaceHub2();
});