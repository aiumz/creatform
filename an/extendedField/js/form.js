/**
 * Created by l2cplat on 16/12/08.
 */

//容器高度计算：
/*var totalHeight = $(window).height();
var leftHeight = totalHeight - $('.f-header').outerHeight() - $('.f-title-container').outerHeight();
var rightHeight = leftHeight - $('.f-right-title').outerHeight() - $('.f-right-buttons').outerHeight();
$('.f-center-left').height(leftHeight);
$('.f-inputbox-container').height(rightHeight);
$('.f-preview-container').height(leftHeight);

//Collapse：
$('.f-center-title').click(function(){
    var arrowElement = $(this).children('.f-triangle');
    (arrowElement.hasClass('fold')) ? arrowElement.removeClass('fold'):arrowElement.addClass('fold');
    $(this).next().slideToggle('fast');
});


//组件删除：
$('.f-center-left .f-delete').click(function(){
    $(this).parent('.f-form-group').remove()
});
$('.f-center-right .col-sm-12 .f-delete').click(function(){
    $(this).parents('.col-sm-12').remove()
});
$('.f-center-right .col-sm-4 .f-delete').click(function(){
    $(this).parents('.col-sm-4').remove()
});
$('.f-center-right .col-sm-6 .f-delete').click(function(){
    $(this).parents('.col-sm-6').remove()
});

//组件选中样式：
$('.f-center-right .col-sm-12').click(function(){
    $(this).addClass('f-orange').parent().siblings('.row').find('.col-sm-12').removeClass('f-orange')
});


//字段与编辑组件切换：
$('.f-title-container .f-buttons button').click(function(){
    if($(this).hasClass('btn-default')){
        $(this).addClass('btn-primary').removeClass('btn-default').siblings().addClass('btn-default').removeClass('btn-primary')
    }
    if($(this).text()=='字段'){
        $('.f-center-container .f-center-left').eq(0).show().siblings('.f-center-left').hide();
    }else{
        $('.f-center-container .f-center-left').eq(1).show().siblings('.f-center-left').hide();
    }
}).eq(0).trigger('click');


//modal:
$('#f-modal-btn').click(function(e){
    $('#myModal').modal('show');
    e.stopPropagation();
});*/