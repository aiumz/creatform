$(function(){
    /*筛选栏隐藏显示*/
    $('.fb_toggleFilter').on('click',function(){
        $(this).toggleClass("toggleDown");
        $('.fb_filterField').toggle("fast");
        $('.listView').toggleClass("listView-height");
    });
    /*选择列表操作*/
    $('[select-state]').find('a').on('click',function(){
        var select_type=$(this).attr('select-state');
        if(select_type=="show"){
            $('.checkbox3State').removeClass("no ").addClass('checked').find('input').attr("checked", true);

            /*$("#checkAll").click();*/
        }
        if(select_type=="all"){
            $('.checkbox3State').removeClass("no").addClass('checked').find('input').attr("checked", true);
        }
        if(select_type=="none"){
            $('.checkbox3State').removeClass("checked no").find('input').attr("checked", false);
           // $('input[name=chk_list_child]').removeAttr("checked", true);
        }


    });
   /* $('input[name=chk_list_all]').on('change',function(){
        alert(1111);
        if($(this).is(':checked')){
            $('input[name=chk_list_child]').each(function(){
                $(this).attr("checked", true);
                $(this).parent().addClass('checked');
            })
        }else{
            $('input[name=chk_list_child]').each(function(){
                $(this).attr("checked", false);
                $(this).parent().removeClass('checked');
            })
        }
    });*/

    $('input[name=chk_list_child]').on('change',function(){
       if($(this).is(':checked')){
            $(this).parent().addClass('checked');
       }else{
           $(this).parent().removeClass('checked');
       }
    })
    /*设置星标*/
    $('.btn_mark').on('click',function(){
       if($('.formList_active').find('.item_mark').length){
           $('.formList_active').find('.item_mark').remove();
       }else{
           $('.formList_active').append('<img class="item_mark" src="../images/starBlue.png" title="星标标记">');
       }
    })
    /*设置已处理*/
    $('.btn_dispose').on('click',function(){
        if($('.formList_active').find('.item_disposed').length){
            $('.formList_active').find('.item_disposed').remove();
        }else{
            $('.formList_active').append('<img class="item_disposed" src="../images/processedBlue.png" title="已处理">');
        }
    })
    /*列表添加active*/
    $('.listView').find('.fb_read').on('click',function(){
        $('.listView').find('.fb_read').removeClass('formList_active');
        $(this).addClass('formList_active');
    })
    /*删除列表*/
    $('.btn_delete').on('click',function(){
        $('.formList_active').remove();
        $('.listView').find('.fb_read').eq(0).addClass('formList_active');

    })
    /*发表评论*/
    $('.input_formNote').on('blur',function(){
        var _comment =$(this).val();
        var temp =$('.form_note-item').clone();
        if(_comment){
            temp.find('.finfo').html(_comment);
            $('.form_note-panel').height($('.form_note-panel').height()+44);
            $('.img_formNote-close').height($('.form_note-panel').height());
        }else{
        }
        $(this).val("");
        $('.form_note-list').append(temp);
    })


})