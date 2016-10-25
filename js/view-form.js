$(function(){
    $('.delete-li').remove();
   /*console.log($('.ui-draggable').length);*/
    var _page = $('.ui-draggable').parent('.like_li');
    if(_page.length==0){
        $('.fs_submitBtn').hide();
        $('.no-submit').show();
    }else{
        $('.fs_submitBtn').eq(0).show();
        $('.fs_submitBtn').eq(1).hide();
        $('.no-submit').hide();
    }
    _page.hide();
    _page.eq(0).nextAll().hide();
    var _pagenum=0;

})