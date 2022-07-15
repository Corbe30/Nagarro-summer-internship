let check = true;
$(document).ready(function(){
    $('.clicks').on('click',function(){
        if(check==true){
            check = false;
            $('#box').addClass('show');
        }
        else{
            check = true;
            $('#box').removeClass('show');
        }
    })

    $('.submission').on('click',function(){
        check = true;
        $('#box').removeClass('show');
    });

    $('.close').on('click',function(){
        check = true;
        $('#box').removeClass('show');
    });
});