/**
 * Created by Administrator on 2016/8/9.
 */
$(document).ready(function () {
    //选择表单类型 显示填写表单名称
    $('.popwin_formtype').on('click', function () {
        $(this).siblings(".sjmf-set-form-name").show().siblings().hide();
    });
    //点击创建并保存表单
    $('.creat-form-btn').on('click', function () {
        $('#sjmfmodal').modal('hide');
        $('.sjmf-set-form-name').hide().siblings().show();
        var $formName = $('.sjmf-set-name').val();
        var $formHtml = '<li class="form-creation new-form-li">'
            + '<div class="settop-container">'
            + '<span class="new-form-color set-top">设置置顶</span>'
            + '<div class="is-top-logo"></div>'
            + '</div>'
            + '<input class="name-of-form new-form-font" value="' + $formName + '" readonly="readonly">' //显示表单名称
            + '<div class="check-feedback pull-right new-form-color">查看反馈<em>(0)</em></div>'
            + '<div class="form-settings clearfix">'
            + '<div class="btn-group ">'
            + '<button type="button" class="btn btn-default dropdown-toggle form-settings-btn" data-toggle="dropdown">分组 <span class="caret"></span></button>'
            + '<ul class="dropdown-menu min-width-110" role="menu">'
            + '<li><a href="#" class="move-to-group" data-group="#erhao">二号分组</a></li>'
            + '</ul>'
            + '</div>'
            + '<a class="form-edit sjmf-fll" href="#"><svg style="width: 14px;height: 14px;position: absolute;margin-left: -20px;" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css">  @font-face { font-family: ifont; src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); } </style></defs><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M0.0002 1023.999975 262.593097 941.470007 870.30586 333.757245 690.24193 153.694315 82.530168 761.407078ZM825.288878 18.646368l-75.023971 75.025971 180.06293 180.06193 75.024971-75.024971c24.85999-24.86099 24.85999-65.169975 0-90.030965l-90.030965-90.030965C890.461852-6.215623 850.151868-6.215623 825.288878 18.646368z" fill="#E25E14"></path></g></g></svg>编辑</a>'
            + '<a class=" form-derive sjmf-fll" href="#"><svg style="width: 14px;height: 14px;position: absolute;margin-left: -20px;" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css">  @font-face { font-family: ifont; src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); }</style></defs><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M432.699272 639.576626l156.795061 0c0-108.744961 0-326.302624 0-326.302624l127.621786-1.851555L514.754752 72.617067 305.100066 305.958104l0 1.851555 127.599206 5.464344C432.699272 313.274002 432.699272 530.831665 432.699272 639.576626zM863.027652 490.120044c-11.809305-23.234752-38.950386-74.626681-47.417861-80.249085-17.996207-1.128997-128.299184-5.757883-143.992238-1.828975-5.735303 9.573892-7.632018 62.433517 0 67.446262 10.002911 6.074002 66.678545-0.903197 72.865447 16.438192 10.31903 7.022359 134.960265 236.998986 134.960265 236.998986l-209.654686 0-9.167453 136.721499-317.248071-1.806395 3.635369-138.527894L159.211114 725.312635c0 0 70.088115-133.582889 120.328467-235.192591 10.635149-20.683219 66.317266 6.119162 72.910606-16.460772l0-52.837045c-2.416053-3.657949-7.270739-10.951268-7.270739-10.951268l-133.10871-1.828975-167.768908 344.61495 0 198.725998c0 0 616.974112 0 920.832282 0 6.209482-3.138611 12.396384-8.015877 14.518897-14.631797l0-218.776979C940.770364 642.015259 901.910298 566.056362 863.027652 490.120044z" fill="#E25E14"></path></g></g></svg>生成</a>'
            + '<a class=" form-preView sjmf-fll" href="#"><svg style="width: 18px;height: 18px;position: absolute;margin-left: -20px;" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css">  @font-face { font-family: ifont;  src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); }  </style></defs><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M28.48 479.296c0 0 452.288 553.6 894.208 0C431.488-108.48 28.48 479.296 28.48 479.296zM477.696 626.24c-83.456 0-151.168-67.712-151.168-151.168S394.24 323.968 477.696 323.968c83.392 0 151.104 67.712 151.104 151.168S561.152 626.24 477.696 626.24zM473.344 475.136m-75.584 0a1.181 1.181 0 1 0 151.168 0 1.181 1.181 0 1 0-151.168 0Z" fill="#E25E14"></path></g></g></svg>预览</a>'
            + '<div class="operate_more dropdown_wrapper pull-right">'
            + '<div class="btn-group ">'
            + '<button type="button" class="btn btn-default dropdown-toggle more-settings" data-toggle="dropdown">更多<span class="caret"></span></button>'
            + '<ul class="dropdown-menu width-li-62" role="menu">'
            + '<li><a href="#" class="change-form-name">重命名</a></li>'
            + '<li><a href="#" class="clone-form">创建副本</a></li>'
            + '<li><a href="#" class="delete-form">删除表单</a></li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<a class="form-info-more" href="#">'
            + '</a>'
            + '</div>'
            + '<div class="form-moreInfos new-form-color" style="display: none;"><p class="p-moreInfos">创建时间：<span class="moreInfo-createAt">2016-07-17 13:03:55</span>创建人：<span class="moreInfo-createBy">lucifer</span>最近编辑：<span class="moreInfo-modifiedAt">2016-07-17 13:03:55</span>编辑人：'
            + '<span class="moreInfo_modifiedBy">lucifer</span></p></div>'
            + '</li>';
        $('.form-block-box').find('li').eq(0).before($formHtml);
    });
    //取消创建表单
    $('.cancel-form-btn').on('click', function () {
        $('#sjmfmodal').modal('hide');
        $('.sjmf-set-form-name').hide().siblings().show();
    });

    //显示表单更多消息，创建人、创建时间
    $('.form-block-box').on('click','.form-info-more', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).parent().next().show();
        } else {
            $(this).parent().next().hide();
        }

    });
    //显示设置表单
    $('.form-block-box').on('mouseover','.is-top-logo', function () {
  /*  $('.is-top-logo').mouseover(function () {*/
        $(this).prev().css({
            display: "block",
            top: 0,
            left: 0
        })
    });
    $('.form-block-box').on('mouseout','.set-top', function () {
        $(this).css({
            display: "none",
            top: "-23px",
            left: "-63"
        })
    });
    /*点击表单设置 添加组件 编辑组件之前切换隐藏下显示*/
    $('.formBuilder-interim-edit').on('click', function () {
        $(this).addClass("active").siblings().removeClass("active");
        var $showFormSet = $(this).attr("data-show");
        console.log($showFormSet);
        var $parent = $(this).parent().next().next();
        $parent.children().addClass("hide");
        $parent.children("." + $showFormSet).removeClass("hide");

    })
    $('.delete-li').on('click', function () {
        $(this).parent().remove();
    });
    /*保存样式设置*/
    $('.style-design-pad').on('click', function () {
        var _stylepad = $('.style-pad');
        var _height = $(this).parent().height();
        if (_height === 32) {
            $(this).parent().css({height: "60%", overflow: "auto"});
            _stylepad.css("bottom", "60%");
            $('#pad_up').show();
            $('#pad_down').hide();
            $(this).next('.save_icon').show()

        } else {
            $(this).parent().css({height: "32px", overflow: "hidden"});
            _stylepad.css("bottom", "32px");
            $('#pad_up').hide();
            $('#pad_down').show();
            $(this).next('.save_icon').hide()

        }
    });
    /*实时获取时间*/
        setInterval(function () {
            var time = new Date(); // 程序计时的月从0开始取值后+1
            var m = time.getMonth() + 1;
            var t = time.getFullYear() + "-" + m + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes();
           $('.now-year').html(time.getFullYear());
           $('.now-month').html(m);
           $('.now-day').html(time.getDate());
           $('.now-time').html(time.getHours() + ":" + time.getMinutes());
        }, 1000);
    /*获取下拉内容到dropdown-menu*/
    $(document).on('click', '.get-li-html.dropdown-menu li', function () {
        var $_self = $(this).find("a").html();
            $(this).parent().parent().find('.select-text').text($_self);
    });
    /*置顶列表*/
    $(document).on('click', '.set-top', function () {
        var $parentLi = $(this).parents('li').clone(true);
        var $parentUi = $(this).parents('ul');
        $(this).parents('li').remove();
        $parentUi.prepend($parentLi);
        //$(this).parents('li').remove();
    })
    /*移动分组*/
    $(document).on('click', '.move-to-group', function () {
        var newGroup=$(this).attr("data-group");
        var theForme =$(this).parents('.form-creation').clone();
        var emptyUl ='<div class="noForm"><p>该分组下没有表单</p></div>';
        var parentUl= $(this).parents('.form-block-box');
        if(parentUl.find('.form-creation').length==1){
            parentUl.append(emptyUl);
        }
        $(this).parents('.form-creation').remove();
        $(newGroup).find('.form-block-box').append(theForme);
        $(newGroup).find('.form-block-box').find('.noForm').remove()

    })
});
