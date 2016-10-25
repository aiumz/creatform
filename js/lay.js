var myAjax = {

    post : function (url,param,successCallBack) {
        //存储loading
        var loading;
        $.ajax({
            url: url,
            type: "post",
            data: param,
            dataType: "json",
            cache : false,
            //超时
            timeout : 200000,
            processData: false,
            contentType:false,
            xhrFields:{
                withCredentials:true
            },
            success: successCallBack,
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("错误信息："+jqXHR.status+"***"+jqXHR.readyState+"***"+textStatus);

            },
            beforeSend : function () {
                loading = layer.load(1, {shade: [0.65, '#000']});
            },
            complete:function(){
                layer.close(loading);
            }
        });
    },
    get : function (url,successCallBack) {
        //存储loading
        var loading;
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            cache : false,
            //超时
            timeout : 30000,
            processData: false,
            contentType:false,
            xhrFields:{
                withCredentials:true
            },
            success: successCallBack,
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("错误信息："+jqXHR.status+"***"+jqXHR.readyState+"***"+textStatus);

            },
            beforeSend : function () {
                loading = layer.load(1, {shade: [0.65, '#000']});
            },
            complete:function(){
                layer.close(loading);
            }
        });
    }

}
/*调用方法*/

/*
myAjax.post( ip + "add.php",_param,function(data){
 console.log(data)
 })

 myAjax.get( ip + "add.php?id=12&uid=1002",function(data){
 console.log(data)
 })




 */