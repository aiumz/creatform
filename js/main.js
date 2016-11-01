(function () {
    /*******************************************jquery 扩展*********************************/
    jQuery.fn.extend({
        anysc:function(fn){
            this.on("keyup",function(){
                fn&&fn($(this).val())
            })
            this.on("keypress",function(){
                fn&&fn($(this).val())
            })
        }
    })
    /***************************************根配置 start *****************************************/
    window.config = {
        indexId:0,
        formSet:{
            "is_first":"1",
            "form_id":"1",
            "title":"",
            "description":"",
            "uid":"1",
            "theme":"",
            "writeLimit":"",
            "startTime":"",
            "endtime":"",
            "maxnum":"",
            "isweixin":"",
            "isonevote":"",
            "completeinfotype":"",
            "completeinfo":"",
            "feedbackview":"",
            "feedbackdetail":"",
            "isaddcontacts":"",
            "group_id":"",
            "view":"",
            "feedback":"",
            "status":"",
            "atime":"",
            "ip":"",
            "maxid":"",
            "body":"",
            "html":""
        },
        colorSet:{},
        allElem: [],
        mainSelector: "#main",
        editSelector: "#edit",
        defultSize: "MX"
    }
    /***************************************根配置 end *****************************************/
    function start() {
        /*模版数据*/
        var allHTML = {
            defultEdit: null,
            init: function () {
                var _this = this;
                this.defultEdit = $("[defultEdit]").html()
                $("[main]").html(function (index, oldValue) {
                    var _index = $(this).attr("main");
                    _this[_index] = {
                        main: oldValue
                    }
                })
                $("[edit]").html(function (index, oldValue) {
                    var _index = $(this).attr("edit");
                    _this[_index].edit = oldValue;
                })
                $(".load").remove()
                $("<input type='file' id='_displayInput' style='display: none'/>").appendTo($("body"))
            }
        }
        allHTML.init()
   
        /*所有组件原型*/
        function $Elem(ID) {
            return new $Elem.prototype.init(ID)
        }

        $Elem.prototype = {
            IMGLIST:[],
            active: '',
            MX: '100%',
            MD: '66.666%',
            SM: '33.333%',
            mainWrap: null,
            editWrap: null,
            mainElem: null,
            editElem: null,
            indentify: null,
            title: null,
            width: null,
            desc: null,
            required: false,
            height: '',
            rangeIndex: "0",
            init: function (ID) {
                this.id="com"+config.indexId;
                config.indexId++;
                this.elemId=ID;
                this.mainWrap = $(config.mainSelector);
                this.editWrap = $(config.editSelector);
                this.mainElem = $(allHTML[ID].main);
                this.editElem = $(allHTML[ID].edit || allHTML.defultEdit);
                this.mainElem.appendTo(this.mainWrap);
                this.width=config.defultSize;
                this.eventManager()
                return this;

            },
            getConfig:function() {
                var _this=this;
                return {
                    id:this.id,
                    elemId:this.elemId,
                    title:this.title,
                    desc:this.desc,
                    required:this.required,
                    width:this.width,
                    componenttype:this.componenttype
                }
            },
            setConfig:function(obj) {
                for(var i in obj){
                    this[i]=obj[i]
                }
                this.setTitle()
                this.setWidth()
                this.setDesc()
                this.setRequired()
                this.addEdit;
            },
            setTitle: function (title) {
                if (title) {
                    this.title = title;
                }
                this.mainElem.find('.title').html(this.title)
                return this;
            },
            getTitle: function () {
                this.editElem.find('.title').val(this.title)
                return this;
            },
            setWidth: function () {
                var width=this[this.width]
                this.mainElem.css({
                    width:width
                })
                return this;
            },
            setRequired: function () {
                var checked=this.required;
                 if(checked){
                        this.mainElem.attr("isRequired",true).find(".com-required").show()

                    }else{
                        this.mainElem.attr("isRequired",false).find(".com-required").hide()
                    }
                this.editElem.find('.isRequired ').attr("checked", checked); 
                return this;
            },
            getWidth: function () {
            },
            setDesc: function () {
                var str = this.desc;
                var patt = /\[[^\[]+\)/g;
                var result;
                while ((result = patt.exec(str)) != null) {
                    var arr = result[0].split("](")
                    var text = arr[0].substring(1)
                    var link = arr[1].substring(1, arr[1].length - 1)
                    var html = "<a href='http://" + link + "'>" + text + "</a>"
                    str = str.replace(result[0], html);
                }
                this.mainElem.find('.desc').html(str)
                return this;
            },
            getDesc: function () {
                this.editElem.find(".desc").val(this.desc)
                return this;
            },
            setRangeIndex: function (obj) {
                if (obj.value.length == 0)return;
                var result = 0;
                if (obj.selectionStart) { //IE以外
                    result = obj.selectionStart
                } else { //IE
                    var rng;
                    if (obj.tagName == "textarea") { //TEXTAREA
                        rng = event.srcElement.createTextRange();
                        rng.moveToPoint(event.x, event.y);
                    } else { //Text
                        rng = document.selection.createRange();
                    }
                    rng.moveStart("character", -event.srcElement.value.length);
                    result = rng.text.length;
                }
                this.rangeIndex = result;
                return this;
            },
            addLink: function (){
                this.desc = this.desc.substring(0, this.rangeIndex) + "[连接文字](www.baidu.com)" + this.desc.substring(this.rangeIndex, this.desc.lenght)
                this.addEdit()
                this.setDesc()
                return this;
            },
            setHeight: function () {
                return this;
            },
            getHeight: function () {
                return this;
            },
            setActive: function () {
                return this;
            },
            getActive: function () {
                return this;
            },
            addEdit: function () {
                this.setWidth()
                this.getTitle()
                this.getDesc()
                this.beforAdd && this.beforAdd()
                this.editWrap.html('')
                var _elem = this.editElem.clone(true)
                _elem.appendTo(this.editWrap)
                return this;
            },
            remove: function () {
                var _this = this;
                this.mainElem.remove();
                this.editElem.remove();
                this.editWrap.html('<p class="form_componentEdit_tips" style="display: block;">请先选择组件</p>');
                $.each(config.allElem, function (index, value, obj) {
                    if (value.indentify == _this.indentify) {
                        config.allElem[index] = null
                        config.allElem.splice(index,1)
                        return false
                    }
                })
                return this;
            },
            changeActive:function() {
                $(".edit-plug").trigger("click")
                return this;
            },
            fileInput:$('<input type="file" name="img" id="" style="display:none"/>'),
            getUrl: function(oInput,fn) {
                oInput.trigger("click")
                oInput.one("change",function(argument) {
                    /*   var oMyForm = new FormData();*/
                    var oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                    if (oInput[0].files.length === 0){ return; }
                    var oFile = oInput[0].files[0];
                    if (!rFilter.test(oFile.type)) { alert("你必须选择合法的图片格式!"); return; }
                    if (!rFilter.test(oFile.type)) { alert("你必须选择合法的图片格式!"); return; }
                    oFReader.readAsDataURL(oFile);

                    oFReader.onload = function (oFREvent) {
                        fn&&fn(oFREvent.target.result,oFile);
                    };
                })
                return this;
            },
            eventManager: function () {
                var _this = this;
                this.mainElem.on('click', function () {
                    _this.changeActive()
                    _this.addEdit()
                })
                this.editElem.find('.isRequired').on('click', function () {
                    var checked=$(this).is(':checked')
                    _this.required=checked;
                    _this.setRequired()
                })
                this.editElem.find('.el-md').on('click', function () {
                    _this.width='MD'
                    _this.setWidth()
                })
                this.editElem.find('.el-mx').on('click', function () {
                    _this.width='MX'
                    _this.setWidth()
                })
                this.editElem.find('.el-sm').on('click', function () {
                    _this.width="SM"
                    _this.setWidth()
                })
                this.mainElem.find('.el-remove').on('click', function () {
                    _this.remove()
                })
                this.editElem.find('.addLink').on('click', function () {
                    _this.addLink()
                })
                this.editElem.find(".title").keyup(function () {
                    _this.title = $(this).val();
                    _this.setTitle()
                })
                this.editElem.find(".title").keypress(function () {
                    _this.title = $(this).val();
                    _this.setTitle()
                })
                this.editElem.find(".desc").click(function () {
                    _this.setRangeIndex(this)
                })
                this.editElem.find(".desc").keyup(function () {
                    _this.setRangeIndex(this)
                    _this.desc = $(this).val();
                    _this.setDesc()
                })
                this.editElem.find(".desc").keypress(function () {
                    _this.setRangeIndex(this)
                    _this.desc = $(this).val();
                    _this.setDesc()
                })
                return this;
            },
            extend: function (obj) {
                var _this = this;
                $.each(obj, function (index, value) {
                    $.each(_this, function (_index) {
                        if (_index == index) {
                            console.warn("niu:在继承 extend 函数中" + _index + "为内置键 继续操作将覆盖")
                        }
                    })
                })
                $.extend(this, obj)
            }
        }
        $Elem.prototype.init.prototype = $Elem.prototype;

        /*具体元素*/
        window.Elem = {
            /*单行输入*/
            input: function (obj) {
                var a = $Elem("1")
                a.extend({
                    type:null,
                    setType:function(type) {
                        if(!this.type){
                            this.type=type
                        }
                        this.mainElem.attr("type",this.type)
                    },
                    getConfig:function() {
                        var _this=this;
                        return {
                            id:this.id,
                            type:this.type,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            componenttype:this.componenttype
                            }
                    },
                    setConfig:function(obj) {
                            for(var i in obj){
                                this[i]=obj[i]
                            }
                            this.setTitle()
                            this.setWidth()
                            this.setDesc()
                            this.setRequired()
                            this.setType()
                            this.addEdit();
                            }
                })
                a.componenttype="singleLine" ;
                a.title="单行文本"
                a.setTitle()
                config.allElem.push(a)
                return a;
            },
            /*多选*/
            select: function () {
                var itemList = [];
                var a = $Elem("2")
                a.componenttype="dropDown"
                a.title="多选"
                a.setTitle()
                config.allElem.push(a)
                function Item() {
                    var _this = this;
                    this.name = null;
                    if (itemList.length == 0) {
                        this.name = "请选择";
                    } else {
                        this.name = "选项" + (itemList.length);
                    }
                    this.id = (new Date()).getTime()
                    this.mainPath = $("<option>2222</option>")
                    this.editPath = $('<label class="checkbox-inline p-l-0 m-l-0 m-t-20">'
                        + '<input type="radio" name="selectOption" value="option1">'
                        + '<textarea class="edittext textarea input_textarea">选项1</textarea>'
                        + '<span class="delete-radio"></span>'
                        + '<span class="add-radio" ></span>'
                        + '</label>')
                    this.setName = function () {
                        this.mainPath.html(this.name)
                        this.editPath.find("textarea").val(this.name)
                    }
                    this.editPath.find(".delete-radio").click(function () {
                        _this.mainPath.remove()
                        _this.editPath.remove()
                        $.each(itemList, function (index, value) {
                            if (value.id == _this.id) {
                                itemList.splice(index, 1)
                                return false
                            }
                        })
                        itemList[itemList.length - 1].editPath.find(".add-radio").css("display", "inline-block")
                        a.addEdit()
                    })
                    this.editPath.find(".add-radio").click(function () {
                        $.each(itemList, function (index, value) {
                            value.editPath.find(".add-radio").hide()
                        })
                        a.addItem()

                    })
                    this.editPath.find("textarea").keypress(function () {
                        this.name = $(this).val()
                        _this.mainPath.html(this.name)
                    })
                    this.editPath.find("textarea").keyup(function () {
                        this.name = $(this).val()
                        _this.mainPath.html(this.name)
                    })
                }

                a.extend({//这里是组件独有属性的扩展函数
                    itemList: itemList,
                    addItem: function () {
                        var a = new Item();
                        itemList.push(a)
                        this.mainElem.find("select").append(a.mainPath)
                        this.editElem.find(".labelList").append(a.editPath)
                        $.each(itemList, function (index, value) {
                            value.setName()
                        })
                        this.addEdit()
                    },
                    removeItem: function () {

                    },
                    getConfig:function() {
                        var _this=this;
                        var obj={
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            componenttype:this.componenttype,
                            itemList:[]
                        }
                        for(var i in itemList){
                            var item={
                                id: itemList[i].id,
                                name:itemList[i].name,
                            }
                            obj.itemList.push(item)
                        }
                        return obj
                    },
                    setConfig:function(obj) {
                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.addItem()
                        this.setTitle()
                        this.setWidth()
                        this.setRequired()
                        this.addEdit;
                    },
                    /*beforAdd: function () {
                     $.each(itemList, function (index, value) {
                     value.setName()
                     })
                     }*/

                })
                a.addItem()
                return a
            },
            /*图片*/
            img: function () {
                var a = $Elem("3")
                a.componenttype="picture";
                a.title="多选"
                a.setTitle()
                config.allElem.push(a)
                a.extend({//这里是组件独有属性的扩展函数
                    setConfig:function(obj) {
                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.setTitle()//设置表头
                        /*                  this.setId()//设置id*/
                        this.setRequired()//设置必填
                        this.setDesc()//设置描述
                        this.setWidth()//设置尺寸
                        this.setImgLink()//设置图片点击跳转连接
                        this.setImgName()//设置图片名字
                        this.setImgSrc()//设置图片路径
                        this.setImgStyle()//设置图片样式
                        this.setTextAlign()//设置文字对齐方式
                    },
                    getConfig:function() {
                        var _this=this;
                        var obj={
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            imgsrc:this.imgSrc,
                            imgName:this.imgName,
                            imgLink:this.imgLink,
                            componenttype:this.componenttype
                        }
                        return obj
                    },
                    imgSrc:null,
                    imgName:null,
                    imgLink:null,
                    textAlign:"left",
                    imgStyle:"left",//初始化左对齐  center 居中对齐  spread 平铺
                    setImgLink:function() {
                        this.editElem.find(".setImgLink").val(this.imgLink)
                        this.mainElem.find(".imgLink").attr("data-url",this.imgLink)
                    },
                    setImgName:function() {
                        this.editElem.find(".imgName").html(this.imgName)
                        this.addEdit()
                    },
                    setImgSrc:function() {
                        this.mainElem.find("img").attr("src",this.imgSrc)
                        this.addEdit()
                    },
                    setImgStyle:function() {
                        if(this.imgStyle=="center"){
                            this.mainElem.find("img").css("width", "33.33%")
                            this.mainElem.find(".imgWrap").css("text-align", "center")
                        }
                        if(this.imgStyle=="spread"){
                            this.mainElem.find("img").css("width", "100%")
                        }
                        if(this.imgStyle=="left"){
                            this.mainElem.find("img").css("width", "33.33%")
                            this.mainElem.find(".imgWrap").css("text-align", "left")
                        }
                    },
                    setTextAlign:function() {
                        this.mainElem.find(".textWrap").css("text-align", this.textAlign)
                    },
                    event: function () {
                        var _this = this;
                        this.editElem.find(".el-right").click(function () {
                            _this.textAlign="right"
                            _this.setTextAlign()
                        })
                        this.editElem.find(".el-choseImg").click(function () {
                            var oInput=$(this).next("input")
                            _this.getUrl(oInput,function(src,oImg) {
                                _this.imgSrc=src;
                                _this.imgName=oImg.name;
                                _this.setImgSrc()
                                _this.setImgName()
                            })

                        })
                        this.editElem.find(".setImgLink").keypress(function () {
                            _this.imgLink=$(this).val();
                            _this.setImgLink()

                        })
                        this.editElem.find(".setImgLink").keyup(function () {
                            _this.imgLink=$(this).val();
                            _this.setImgLink()
                        })

                        this.editElem.find(".el-center").click(function () {
                            _this.textAlign="center"
                            _this.setTextAlign()
                        })
                        this.editElem.find(".el-left").click(function () {
                            _this.textAlign="left"
                            _this.setTextAlign()
                        })
                        this.editElem.find(".el-img-center").click(function () {
                            _this.imgStyle="center"
                            _this.setImgStyle()
                        })
                        this.editElem.find(".el-img-width").click(function () {
                            _this.imgStyle="spread"
                            _this.setImgStyle()
                        })
                    }
                })
                a.setWidth("MX")
                a.event()
                return a
            },
            /*数字*/
            number: function () {
                var a = $Elem("4")
                a.componenttype="number";
                a.title='数字'  ;
                a.setTitle()
                config.allElem.push(a)
                return a;
            },
            /*多行输入*/
            mulitInput: function () {
                var a = $Elem("5")
                a.componenttype="multiple"
                a.title="多行输入"
                a.setTitle()
                config.allElem.push(a)
                return a;
            },
            /*单选框*/
            /*单选框*/
            radio: function () {
                var itemList = [];
                var a = $Elem("6")
                a.componenttype="radio"
                a.title="单选框"
                a.setTitle()
                config.allElem.push(a)
                function Item() {
                    var __this = this;
                    this.name= "选项" + (itemList.length+1);
                    this.id = (new Date()).getTime()
                    this.mainPath = $( '<div class="checkbox">'
                        +'<label>'
                        +'<input type="radio" value="" disabled><span class="radioName"></span>'
                        +'</label>'
                        +'</div>');
                    this.editPath = $('<label class="checkbox-inline m-l-0 m-t-20">'
                        +'<input type="checkbox" value="">'
                        +'<textarea class="edittext textarea input_textarea width-110">选项3</textarea>'
                        +'<span class="delete-radio"></span>'
                        +'<span class="add-radio"></span>'
                        +'</label>')

                    this.setConfig=function(argument) {
                        this.name=argument.name;
                        this.setName()
                    }

                    this.getConfig=function(argument) {
                        return{
                            name:this.name,

                            id:this.id,
                        }
                    }
                    this.setName = function () {
                        this.mainPath.find(".radioName").html(this.name)
                        this.editPath.find("textarea").val(this.name)

                    }
                    this.editPath.find(".delete-radio").click(function () {
                        __this.mainPath.remove()
                        __this.editPath.remove()
                        $.each(itemList, function (index, value) {
                            if (value.id == __this.id) {
                                itemList.splice(index, 1)
                                return false
                            }
                        })
                        itemList[itemList.length - 1].editPath.find(".add-radio").css("display", "inline-block")
                        a.addEdit()
                    })
                    this.editPath.find(".add-radio").click(function () {
                        $.each(itemList, function (index, value) {
                            value.editPath.find(".add-radio").hide()
                        })
                        a.addItem()

                    })
                    this.editPath.find("textarea").anysc(function (value) {
                        __this.name = value
                        __this.setName()

                    })

                }
                a.extend({//这里是组件独有属性的扩展函数
                    itemList: itemList,
                    addItem: function () {
                        var a = new Item();
                        itemList.push(a)
                        this.mainElem.find(".labelList").append(a.mainPath)
                        this.editElem.find(".labelList").append(a.editPath)
                        this.addEdit()
                        return a;
                    },
                    removeItem: function () {

                    },
                    getConfig:function() {
                        var obj=[];
                        for(var i in itemList){
                            obj.push(itemList[i].getConfig())
                        }
                        var _this=this;
                        return {
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            attribute:"",
                            componenttype:this.componenttype,
                            itemList:obj,
                        }
                    },
                    setConfig:function(obj) {
                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.setTitle()
                        this.setWidth()
                        this.setDesc()
                        this.setRequired()
                        for(var i=0;i<obj.itemList.length;i++){
                            this.addItem().setConfig(obj.itemList[i])
                        }
                    },
                    beforAdd: function () {
                        $.each(itemList, function (index, value) {
                            value.setName()
                        })
                    },
                    setRadioSize:function(argument) {
                        var size=(100/this.radioSize)+"%"
                        this.mainElem.find('.checkbox').css("width",size)
                    },
                    event:function() {
                        var _this=this;
                        this.editElem.find('.radioSize').on("click",function(argument) {
                            _this.radioSize=$(this).val()
                            alert(_this.radioSize)
                            _this.setRadioSize()
                        })
                    }

                })
                a.addItem()
                return a
            },
            /*多选框*/
            mulitRadio: function (bool) {
                var itemList = [];
                var a = $Elem("7")
                a.componenttype="checkBox"
                a.title="多选框"
                a.setTitle()
                config.allElem.push(a)
                function Item() {
                    var __this = this;
                    this.name= "选项" + (itemList.length+1);
                    this.id = (new Date()).getTime()
                    this.mainPath = $( '<div class="checkbox">'
                        +'<label>'
                        +'<input type="checkbox" value="" disabled><span class="radioName"></span>'
                        +'</label>'
                        +'</div>');
                    this.editPath = $('<label class="checkbox-inline m-l-0 m-t-20">'
                        +'<input type="checkbox" value="">'
                        +'<textarea class="edittext textarea input_textarea width-110">选项3</textarea>'
                        +'<span class="delete-radio"></span>'
                        +'<span class="add-radio"></span>'
                        +'</label>')

                    this.setConfig=function(argument) {
                        this.name=argument.name;
                        this.setName()
                    }
                    this.getConfig=function(argument) {
                        return{
                            name:this.name,
                            id:this.id,
                        }
                    }
                    this.setName = function () {
                        this.mainPath.find(".radioName").html(this.name)
                        this.editPath.find("textarea").val(this.name)

                    }
                    this.editPath.find(".delete-radio").click(function () {
                        __this.mainPath.remove()
                        __this.editPath.remove()
                        $.each(itemList, function (index, value) {
                            if (value.id == __this.id) {
                                itemList.splice(index, 1)
                                return false
                            }
                        })
                        itemList[itemList.length - 1].editPath.find(".add-radio").css("display", "inline-block")
                        a.addEdit()
                    })
                    this.editPath.find(".add-radio").click(function () {
                        $.each(itemList, function (index, value) {
                            value.editPath.find(".add-radio").hide()
                        })
                        a.addItem()

                    })
                    this.editPath.find("textarea").anysc(function (value) {
                        __this.name = value
                        __this.setName()

                    })

                }
                a.extend({//这里是组件独有属性的扩展函数
                    itemList: itemList,
                    addItem: function () {
                        var a = new Item();
                        this.mainElem.find(".labelList").append(a.mainPath)
                        this.editElem.find(".labelList").append(a.editPath)
                        this.addEdit()
                        return a;
                    },

                    removeItem: function () {

                    },
                    getConfig:function() {
                        var obj=[];
                        for(var i in this.itemList){
                            obj.push(this.itemList[i].getConfig())
                        }
                        var _this=this;
                        return {
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            attribute:"",
                            componenttype:this.componenttype,
                            itemList:obj,
                        }
                    },
                    setConfig:function(obj) {

                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.setTitle()
                        this.setWidth()
                        this.setDesc()
                        this.setRequired()
                      
                        for(var i=0;i<obj.itemList.length;i++){

                            this.addItem().setConfig(obj.itemList[i])
                        }
                    },

                    beforAdd: function () {
                        $.each(itemList, function (index, value) {
                            value.setName()
                        })
                    },
                    setRadioSize:function(argument) {
                        var size=(100/this.radioSize)+"%"
                        this.mainElem.find('.checkbox').css("width",size)
                    },
                    event:function() {
                        var _this=this;
                        this.editElem.find('.radioSize').on("click",function(argument) {
                            _this.radioSize=$(this).val()
                            alert(_this.radioSize)
                            _this.setRadioSize()
                        })
                    }

                })
                if(!bool){
                    a.addItem()
                }
                return a
            },
            /*图片单选*/
            imgRadio: function (bool) {
                var itemList = [];
                var a = $Elem("8")
                a.componenttype="pictureRadio"
                a.title="图片单选"
                a.setTitle()
                config.allElem.push(a)
                function Item() {
                    var __this = this;
                    var name= "选项" + (itemList.length+1);
                    this.id = (new Date()).getTime()
                    this.mainPath = $('<li class="img-radio">'
                        +' <div class="img-box"></div>'
                        +'<label class="checkbox-inline">'
                        +'<input type="radio" name="optionsRadiosinline" value="option1" class="img-radio-option" disabled><span class="radioName"></span></label>'
                        +'</li>');
                    this.editPath = $('<label class="checkbox-inline m-l-0 m-t-20">'
                        +'<input type="checkbox" value="">'
                        +'<div class="imgcontect imgBtn">'
                        +'<span class="upload_btn">上传图片<br>(限2MB)</span>'
                        +'</div>'
                        +'<input type="file" name="img" id="" style="display:none"/>'
                        +'<textarea class="edittext textarea input_textarea width-110">选项3</textarea>'
                        +'<span class="delete-radio"></span>'
                        +'<span class="add-radio"></span>'
                        +'</label>')
                    this.src=null;
                    this.setConfig=function(argument) {
                        name=argument.name;
                        this.src=argument.src;
                        this.setName()
                    }
                    this.getConfig=function(argument) {
                        return{
                            name:name,
                            id:this.id,
                            src:this.src
                        }
                    }
                    this.setName = function () {
                        this.mainPath.find(".radioName").html(name)
                        this.editPath.find("textarea").val(name)
                        if(this.src){
                            this.editPath.find(".imgBtn").html("<img style='width:100%;height:100%' src="+this.src+" alt="+1+" />")
                            this.mainPath.find(".img-box").html("<img style='width:100%' src="+this.src+" alt="+1+" />")
                        }
                    }
                    this.editPath.find(".delete-radio").click(function () {
                        __this.mainPath.remove()
                        __this.editPath.remove()
                        $.each(itemList, function (index, value) {
                            if (value.id == __this.id) {
                                itemList.splice(index, 1)
                                return false
                            }
                        })
                        itemList[itemList.length - 1].editPath.find(".add-radio").css("display", "inline-block")
                        a.addEdit()
                    })
                    this.editPath.find(".add-radio").click(function () {
                        $.each(itemList, function (index, value) {
                            value.editPath.find(".add-radio").hide()
                        })
                        a.addItem()

                    })
                    this.editPath.find("textarea").keypress(function () {
                        __this.name = $(this).val()
                        __this.setName()
                    })
                    this.editPath.find("textarea").keyup(function () {
                        __this.name = $(this).val()
                        __this.setName()
                    })
                    this.editPath.find(".imgBtn").on("click",function() {
                        var _this=this;
                        a.getUrl($(this).next('input'),function(src) {
                            __this.src=src;
                        })
                    })

                }
                a.extend({//这里是组件独有属性的扩展函数
                    itemList: itemList,
                    addItem: function () {
                        var a = new Item();
                        itemList.push(a)
                   
                        this.mainElem.find(".labelList").append(a.mainPath)
                        this.editElem.find(".labelList").append(a.editPath)
                        this.addEdit()
                        return a;
                    },
                    removeItem: function () {

                    },
                    getConfig:function() {
                        var obj=[];

                        for(var i=0;i<itemList.length;i++){
                            obj.push(itemList[i].getConfig())
                        }
                        var _this=this;
                        return {
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            itemList:obj,
                            componenttype:this.componenttype
                        }
                    },
                    setConfig:function(obj) {
                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.setTitle()
                        this.setWidth()
                        this.setDesc()
                        this.setRequired()
                        for(var i=0;i<obj.itemList.length;i++){
                       
                            this.addItem().setConfig(obj.itemList[i])
                        }
                    },
                    beforAdd: function () {
                        $.each(itemList, function (index, value) {
                            value.setName()
                        })
                    }

                })
                if(!bool){
                    a.addItem()
                }
                return a
            },
            /*图片多选*/
            imgMulit:function(bool) {
                var a = $Elem("9")
                a.componenttype="pictureCheckedBox"
                a.title="图片多选"
                a.setTitle()
                config.allElem.push(a)
                function Item() {
                    var __this = this;
                    var name= "选项" + (a.itemList.length+1);
                    this.id = (new Date()).getTime()
                    this.mainPath = $('<li class="img-radio">'
                        +' <div class="img-box"></div>'
                        +'<label class="checkbox-inline">'
                        +'<input type="checkbox" name="optionsRadiosinline" value="option1" class="img-radio-option" disabled><span class="radioName"></span></label>'
                        +'</li>');
                    this.editPath = $('<label class="checkbox-inline m-l-0 m-t-20">'
                        +'<input type="checkbox" value="">'
                        +'<div class="imgcontect imgBtn">'
                        +'<span class="upload_btn">上传图片<br>(限2MB)</span>'
                        +'</div>'
                        +'<input type="file" name="img" id="" style="display:none"/>'
                        +'<textarea class="edittext textarea input_textarea width-110">选项3</textarea>'
                        +'<span class="delete-radio"></span>'
                        +'<span class="add-radio"></span>'
                        +'</label>')
                    this.src=null;
                    this.setConfig=function(arg) {
                        this.name=arg.name;
                        this.id=arg.id;
                        this.src=arg.src;
                        this.setName()
                    }
                    this.getConfig=function() {
                        return{
                            name:name,
                            id:this.id,
                            src:this.src,
                        }
                    }
                    this.setName = function () {
                        this.mainPath.find(".radioName").html(name)
                        this.editPath.find("textarea").val(name)
                    
                        if(this.src){
                            this.editPath.find(".imgBtn").html("<img style='width:100%;height:100%' src="+this.src+" alt="+1+" />")
                            this.mainPath.find(".img-box").html("<img style='width:100%' src="+this.src+" alt="+1+" />")
                        }
                    }
                    this.editPath.find(".delete-radio").click(function () {
                        __this.mainPath.remove()
                        __this.editPath.remove()
                        $.each(a.itemList, function (index, value) {
                            if (value.id == __this.id) {
                                a.itemList.splice(index, 1)
                                return false
                            }
                        })
                        a.itemList[a.itemList.length - 1].editPath.find(".add-radio").css("display", "inline-block")
                        a.addEdit()
                    })
                    this.editPath.find(".add-radio").click(function () {
                        $.each(a.itemList, function (index, value) {
                            value.editPath.find(".add-radio").hide()
                        })
                        a.addItem()

                    })
                    this.editPath.find("textarea").keypress(function () {
                        __this.name = $(this).val()
                        __this.setName()
                    })
                    this.editPath.find("textarea").keyup(function () {
                        __this.name = $(this).val()
                        __this.setName()
                    })
                    this.editPath.find(".imgBtn").on("click",function() {
                        var _this=this;
             
                        a.getUrl($(this).next('input'),function(src) {
                            __this.src=src;
                            $(_this).html("<img style='width:100%;height:100%' src="+src+" alt="+1+" />")
                     
                            __this.mainPath.find(".img-box").html("<img style='width:100%' src="+src+"  />")
                        })
                    })

                }
                a.extend({//这里是组件独有属性的扩展函数
                    itemList:[],
                    addItem: function () {
                        console.log( this.itemList)
                        var a = new Item();
                        
                        this.mainElem.find(".labelList").append(a.mainPath)
                        this.editElem.find(".labelList").append(a.editPath)
                        this.addEdit()

                        return a
                    },
                    getConfig:function() {
                        var obj=[];
                        for(var i in this.itemList){
                            

                            obj.push(this.itemList[i].getConfig())
                          
                        }
                        var _this=this;
                        return {
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            itemList:obj,
                            componenttype:this.componenttype
                        }
                    },
                    setConfig:function(obj) {
                        var newObject = JSON.parse(JSON.stringify(obj));
                        for(var i in newObject){
                            if(i!=="itemList"){
                                this[i]=newObject[i]
                            }
                        }
                        this.setTitle()
                        this.setWidth()
                        this.setDesc()
                        this.setRequired()
                        for(var i=0;i<obj.itemList.length;i++){
                            this.addItem().setConfig(obj.itemList[i])
                        }
                            
                    },
                  /*  beforAdd: function () {
                        $.each(this.itemList, function (index, value) {
                            value.setName()
                        })
                    }*/

                })
                if(!bool){
                    a.addItem()
                }
                return a;
            },
            /*时间*/
            date:function(argument) {
                var a = $Elem("10");
                a.componenttype="date"
                a.title="时间"
                a.setTitle()
                config.allElem.push(a);
                a.extend({//这里是组件独有属性的扩展函数
                    event: function () {
                        var _this = this;
                        this.editElem.find(".dateymd").click(function () {
                            _this.mainElem.find(".form-control").attr("onfocus", "WdatePicker({dateFmt:'yyyy年MM月dd日'})")
                        })
                        this.editElem.find(".dateym").click(function () {
                            _this.mainElem.find(".form-control").attr("onfocus", "WdatePicker({dateFmt:'yyyy年MM月'})")
                        })
                    }
                });
                a.event()
                return a;
            },
            /*附件*/
            appendix:function(argument) {
                var a = $Elem("11")
                a.componenttype="fileUpload"
                a.title="附件"
                a.setTitle()
                config.allElem.push(a)
                return a;
            },
            /*评分*/
            grade:function(argument) {
                var a = $Elem("12")
                a.componenttype="star"
                a.title="评分"
                a.setTitle()
                config.allElem.push(a)
                function Item(argument) {
                    var _this=this;
                    this.index=0;
                    this.Star=$('')

                    this.StarOn=function(argument) {
                        this.Star.html('<li class="pingfenimg satrContent"><span style="display:none"><svg style="width: 20px;height: 20px;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[@font-face { font-family: ifont; src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); }  ]]></style></defs><g class="transform-group"><g transform="scale(0.125, 0.125)"><path d="M512.042467 85.638449 650.594033 366.339526 960.284351 411.382395 736.140385 629.831662 789.018709 938.361551 512.042467 792.660144 234.979244 938.361551 287.858592 629.831662 63.714625 411.382395 373.489878 366.339526Z" fill="#ff4400"></path></g></g></svg></span>'
                            +'<span><svg style="width: 20px;height: 20px;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[@font-face { font-family: ifont; src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); }  ]]></style></defs><g class="transform-group"><g transform="scale(0.125, 0.125)"><path d="M512.042467 85.638449 650.594033 366.339526 960.284351 411.382395 736.140385 629.831662 789.018709 938.361551 512.042467 792.660144 234.979244 938.361551 287.858592 629.831662 63.714625 411.382395 373.489878 366.339526Z" fill="#cecece"></path></g></g></svg></span></li>')
                    }
                    this.getConfig=function() {
                        return{
                            id:this.id,
                            index:this.index
                        }
                    }
                    this.setConfig=function() {

                    }
                    this.Star.on("click",function (argument) {
                        a.changeStar(_this.index)
                    })
                    this.StarOn()
                }
                a.extend({
                    starList:[],
                    starLength:0,
                    startTemple:$('<li class="pingfenimg satrContent"><span style="display:none"><svg style="width: 20px;height: 20px;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[@font-face { font-family: ifont; src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); }  ]]></style></defs><g class="transform-group"><g transform="scale(0.125, 0.125)"><path d="M512.042467 85.638449 650.594033 366.339526 960.284351 411.382395 736.140385 629.831662 789.018709 938.361551 512.042467 792.660144 234.979244 938.361551 287.858592 629.831662 63.714625 411.382395 373.489878 366.339526Z" fill="#ff4400"></path></g></g></svg></span>'
                        +'<span><svg style="width: 20px;height: 20px;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[@font-face { font-family: ifont; src: url(http://at.alicdn.com/t/font_1442373896_4754455.eot?#iefix) format(embedded-opentype), url(http://at.alicdn.com/t/font_1442373896_4754455.woff) format(woff), url(http://at.alicdn.com/t/font_1442373896_4754455.ttf) format(truetype), url(http://at.alicdn.com/t/font_1442373896_4754455.svg#ifont) format(svg); }  ]]></style></defs><g class="transform-group"><g transform="scale(0.125, 0.125)"><path d="M512.042467 85.638449 650.594033 366.339526 960.284351 411.382395 736.140385 629.831662 789.018709 938.361551 512.042467 792.660144 234.979244 938.361551 287.858592 629.831662 63.714625 411.382395 373.489878 366.339526Z" fill="#cecece"></path></g></g></svg></span></li>'),
                    getConfig:function() {
                        var _this=this;
                        return {
                            id:this.id,
                            elemId:this.elemId,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            starLength:this.starLength,
                            componenttype:this.componenttype
                        }
                    },
                    setConfig:function(obj) {
                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.setTitle()
                        this.setWidth()
                        this.setDesc()
                        this.setRequired()
                        this.initStar(this.starLength)
                        this.addEdit;
                    },

                    initStar:function(num) {
                        this.starLength=num
                        this.mainElem.find(".starWrap").html("").attr("data-len",this.starLength)
                        for(var i=0;i<this.starLength;i++){
                            var star=this.startTemple.clone(true)
                            this.mainElem.find(".starWrap").append(star)
                        }
                    },
                    event:function(argument) {
                        var _this=this;
                        this.editElem.find(".starNum").on("change",function(argument) {
                            var num=$(this).val();
                            _this.editElem.find(".starNum>option:eq("+(num-3)+")").attr("selected",true);
                        
                            _this.initStar(num)
                        })
                    },
                    beforAdd:function(argument) {

                    }

                })
                a.event()
                a.initStar(3)
                return a;
            },
            /*商品*/
            goods:function(argument) {
                var a = $Elem("13")
                a.componenttype="shopping"
                a.title="商品"
                a.setTitle()
                config.allElem.push(a)
                function Item() {
                    var _this=this
                    this.mainPath = $('<li class="sp-item itemTopNum " >'
                        +'<div class="ap-img-box itemLink imgBox"></div>'
                        +'<div class="ap-img-descript">'
                        +' <a href="www.baidu.com" class="item-name itemName">1111</a>'
                        +'<p class="item-price itemPrice"></p>'
                        +'<p class="item-select">'
                        +'<span class="remove">-</span>'
                        +'<input class="itemnum" value="0">'
                        +'<span class="add">+</span>'
                        +'</p>'
                        +'</div>'
                        +'</li>');
                    this.editPath = $('<li class="editShopping_item clearfix">'
                        +'<div class="shoppingitem_preview_container clearfix">'
                        +'<div class="shoppingitem_preview" style="display: none;">'
                        +'<div class="previewimg">'
                        +'<img src="../images/formDefaultImage.png" alt=""></div>'
                        +'<div class="previewinfo" title="天通苑">天通苑</div>'
                        +'</div>'
                        +'<div class="shoppingitem_edit">'
                        +'<div class="editimgfield">'
                        +'<img class="defaultimg" src="../images/formDefaultImage.png"  alt="上传图片" style="width: 94%; display: inline;">'
                        +'<div class="upload_shopping_file">'
                        +'<a class="btn btn-primary btn_shopiingimg font-12 upLoadBtn">上传图片</a><input type="file" name="img" id="" style="display:none" />'
                        +'<div class="font-12">'
                        +'<lable>推荐宽高比4:3</lable>'
                        +'</div>'
                        +' </div>'
                        +'</div>'
                        +'<div class="editfield">'
                        +'<div class="shopping_name font-12">'
                        +'<p class="namefield">名称:</p>'
                        +'<input type="text" class="form-control itemName"></div>'
                        +'<div class="shopping_link font-12">'
                        +'<p class="namefield ">链接:</p>'
                        +' <input type="text" class="form-control itemLink"></div>'
                        +'<div class="shopping_price font-12">'
                        +'<p class="namefield ">单价:</p>'
                        +'<input type="text" class="form-control itemPrice"></div>'
                        +'<div class="shopping_num font-12">'
                        +'<p class="namefield ">最多购买份数:</p>'
                        +'<input type="text" class="form-control itemTopNum"></div>'
                        +'<div class="shopping_controller">'
                        +'<a class="btn btn-primary btn_additem font-12">保存</a>'
                        +'<a class="btn btn-primary btn_canceledit font-12">取消</a>'
                        +'</div>'
                        +'<div class="errorinfo" style="display:none;"></div>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</li>')
                    this.itemName=null;
                    this.itemLink=null;
                    this.itemPrice=null;
                    this.itemTopNum=null;
                    this.imgUrl=null;
                    this.setConfig=function (argument) {
                        for(var i in argument){
                            this[i]=argument[i]
                        }
                        this.init()
                    }
                    this.getConfig=function(argument) {
                        return{
                            id:this.id,
                            itemName:this.itemName,
                            itemLink:this.itemLink,
                            itemPrice:this.itemPrice,
                            itemTopNum:this.itemTopNum,
                            imgUrl:this.imgUrl,
                            componenttype:this.componenttype
                        }
                    }
                    this.init=function(argument) {
                        /*     if(this.imgUrl){*/
                        this.editPath.find(".defaultimg").attr({"src":_this.imgUrl})
                        this.mainPath.find(".imgBox").html("<img style='width:100%' src="+_this.imgUrl+" />")
                        /*}*/
                        this.editPath.find(".itemLink").val(_this.itemLink)
                        this.editPath.find(".itemPrice").val(_this.itemPrice)
                        this.editPath.find(".itemName").val(_this.itemName)
                        this.editPath.find(".itemTopNum").val(_this.itemTopNum)

                        this.mainPath.find(".itemName").html(_this.itemName)
                        this.mainPath.find(".itemLink").attr("url",_this.itemLink)
                        this.mainPath.find(".itemPrice").html(_this.itemPrice)
                        this.mainPath.attr("maxNum",_this.itemTopNum)

                    }

                    this.event=function(){
                        this.editPath.find(".itemName").anysc(function(argument) {
                            _this.itemName=argument;
                            _this.init()
                        })
                        this.editPath.find(".itemLink").anysc(function(argument){
                            _this.itemLink=argument
                            _this.init()
                        })
                        this.editPath.find(".itemPrice").anysc(function(argument){
                            _this.itemPrice=argument
                            _this.init()
                        })
                        this.editPath.find(".itemTopNum").anysc(function(argument){
                            _this.itemTopNum=argument
                            _this.init()
                        })
                        this.editPath.find(".upLoadBtn").click(function(argument){
                            a.getUrl($(this).next(),function(src) {
                                _this.imgUrl=src;
                                _this.init()
                                a.addEdit()
                            })
                        })

                    }
                    this.event()
                }
                a.extend({//这里是组件独有属性的扩展函数
                    itemList: [],
                    itemInit:function(argument) {
                        var product=this.addItem();
                        product.itemName=argument.itemName||"";
                        product.itemLink=argument.itemLink||"";
                        product.itemPrice=argument.itemPrice||"";
                        product.itemTopNum=argument.itemTopNum||"";
                        product.imgUrl=argument.imgUrl||"";

                    },
                    addItem:function(){
                        var product=new Item();
                        this.itemList.push(product)
                        this.editElem.find(".productWrap").append(product.editPath)
                        this.mainElem.find(".productWrap").append(product.mainPath)
                        this.addEdit()
                        return product

                    },
                    getConfig:function() {
                        var obj=[];
                        for(var i  in this.itemList){
                            obj.push(this.itemList[i])
                        }
                        var _this=this;
                        return {
                            id:this.indentify,
                            title:this.title,
                            desc:this.desc,
                            required:this.required,
                            width:this.width,
                            starLength:this.starLength,
                            itemList:obj,
                            componenttype:this.componenttype
                        }
                    },
                    setConfig:function(obj) {
                        for(var i in obj){
                            this[i]=obj[i]
                        }
                        this.setTitle()
                        this.setWidth()
                        this.setDesc()
                        this.setRequired()
                        for(var i  in this.itemList){
                            this.addItem().setConfig(this.itemList[i])
                        }
                        this.addEdit;
                    },
                    event:function(argument) {
                        var _this=this;
                        this.editElem.find(".addItem").on("click",function (argument) {
                            _this.addItem()
                        })
                    }

                })
                a.event()
                a.addItem()
                return a;
            },
            /*分割线*/
            rule:function(argument) {
                var a = $Elem("14")
                a.componenttype="section"
                a.title="分割线"

                a.setTitle()
                config.allElem.push(a)
                return a;
            },
            /*翻页*/
            pageTurning:function(argument) {
                var a = $Elem("15")
                a.mainElem.attr("type","pageTurning")
                a.componenttype="page"
                a.title="翻页"
                a.setTitle()
                config.allElem.push(a)
                a.extend({
                    pageNumber:null,
                    setPageNumber:function(argument) {
                        var index=1;
                        this.pageNumber=1;
                        for(var i in config.allElem){
                            if(config.allElem[i].pageNumber){
                                config.allElem[i].pageNumber=index;
                                config.allElem[i].mainElem.find(".pagePre").html(config.allElem[i].pageNumber)
                                config.allElem[i].mainElem.find(".pageNext").html(config.allElem[i].pageNumber+1)
                                index++;
                            }
                        }
                    },
                    remove: function () {
                        var _this = this;
                        this.mainElem.remove();
                        this.editElem.remove();
                        this.editWrap.html('<p class="form_componentEdit_tips" style="display: block;">请先选择组件</p>');
                        $.each(config.allElem, function (index, value, obj) {
                            if (value.indentify == _this.indentify) {
                                config.allElem[index] = null
                                config.allElem.splice(index,1)
                                return false
                            }
                        })
                        this.setPageNumber()
                    },
                })
                a.setPageNumber()
                return a;
            },

        }
        /********************************************数据添加 start ***********************************************/
        /* Elem.input().setConfig({
         title:"nmz",
         desc:"niubi"
         })
         Elem.imgRadio().setConfig({
         title:"nmz",
         desc:"niubi",
         itemList:[
         {name:"nmz",src:"http://127.0.0.1/creatform1/images/plus.png"},
         {name:"nmz",src:"http://127.0.0.1/creatform1/images/plus.png"},
         {name:"nmz",src:"http://127.0.0.1/creatform1/images/plus.png"},
         ]
         })*/
        /********************************************数据添加 end ***********************************************/

        /********************************************点击添加 start ***********************************************/
        $("#signInput").on('click', function () {

            Elem.input()
        
        })
        $("#selectMeun").on('click', function () {
            Elem.select()

        })
        $("#img").on('click', function () {
            Elem.img()

        })
        $(".tag").on("click", function () {
            var tagname = $(this).find(".sjmf-tit").html()
            var a=Elem.input()
            a.title=tagname;
            a.setType(tagname)
            a.setTitle()
        })
        $("#number").on("click", function (argument) {
            Elem.number()
        })
        $("#mulitInput").on("click", function (argument) {
            Elem.mulitInput()
        })
        $("#radio").on("click", function (argument) {
            Elem.radio()
        })
        $("#mulitRadio").on("click", function (argument) {
            Elem.mulitRadio()
        })
        $("#imgRadio").on("click", function () {
            Elem.imgRadio()
        })
        $("#imgMulit").on("click", function () {
            Elem.imgMulit()
        })
        $("#dateInput").on("click", function () {
            Elem.dateInput()
        })
        $("#date").on("click", function () {
            Elem.date()
        })
        $("#appendix").on("click", function () {
            Elem.appendix()

        })
        $("#grade").on("click", function () {
            Elem.grade()
        })
        $("#goods").on("click", function () {
            Elem.goods()
        })
        $("#rule").on("click", function () {
            Elem.rule()
        })
        $("#pageTurning").on("click", function () {
            Elem.pageTurning()

        
        })
/********************************************点击添加 end ************************************/

    }//start 结束

//问题：
//图片多选
//商品
//多选
    function setFormConfig(argument) {
        $.post("http://120.76.138.42:8099/form.php/index/getform/id/1",function (data) {
            /*表单表头处理---start*/
            $('#the-form-tit').text(data.title?data.title:"空白的表单");
            $('#form-title').val(data.title?data.title:"空白的表单");
            $('.main-form-desc').text(data.description);
            $('#form-desc').val(data.description);
           /* $('.formLogo').html()*/ //表单logo
            //表单表头背景图
            /*表单表头处理 ---end*/
            if(!data)return;
            if(!data.body)return;
            config.indexId=data.maxid+1||0;
             config.formSet.theme=data.theme
            var data=data.body;
            for(var i in data){
                if(!data[i].config)return;
                var formConfg=JSON.parse(decodeURI(data[i].config))
          
                if(formConfg.elemId=="1"){
                    var a=Elem.input(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="2"){
                    var a=Elem.select(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="3"){
                    var a=Elem.img(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="4"){
                    var a=Elem.number(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="5"){
                    var a=Elem.mulitInput(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="6"){
                    var a=Elem.radio(true)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="7"){
                    var a=Elem.mulitRadio(true)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="8"){
                    var a=Elem.imgRadio(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="9"){
                    var a=Elem.imgMulit(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="10"){
                    var a=Elem.date(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="11"){
                    var a=Elem.appendix(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="12"){
                    var a=Elem.grade(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="13"){
                    var a=Elem.goods(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="14"){
                    var a=Elem.rule(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                if(formConfg.elemId=="15"){
                    var a=Elem.pageTurning(formConfg.elemId)
                    a. setConfig(formConfg)
                }
                config.setColor()

            }
        })
    }

    /***************************************模板加载 start ***************************************/
    $(".load").load("plug.html", function () {
        start()
        setFormConfig()
    })

    /***************************************模板加载 end *****************************************/



    /***************************************数据整理提交 start *****************************************/
    $("#ajaxPostInfor").on("click",function(argument) {
        var postConfig=[];
        for(var i in config.allElem){
            var config_item=config.allElem[i].getConfig();

            var choice=[];
            if(config_item.itemList){
                for(var i=0;i<config_item.itemList.length;i++){
                    choice.push({
                        title:config_item.itemList[i].name,
                        id:config_item.componenttype+"-"+config_item.id+"-"+i,
                        name:config_item.componenttype+"-"+config_item.id
                    })
                }
            }

            var obj={
                "componenttype":config_item.componenttype,
                "id":config_item.id,
                "name":config_item.title,
                "desc":config_item.desc,
                "attribute ":"",
                "config":encodeURI(JSON.stringify(config_item)),
            }
            obj["choice"]=choice;
            postConfig.push(obj)
        }

    function getFormConfig(argument) {
            config.formSet.form_id="1"
            //是否为第一次提交
            config.formSet.is_first=config.is_first;
            //
            config.formSet.title=$("#form-title").val()
            config.formSet.description=$("#form-desc").val()
            //定时启用表单
            if($("#trim1").is(":checked")){
                config.formSet.startTime=$("#trimStart").val()
            }else{
                config.formSet.startTime=null
            }
            alert($("#trimStart").val())
            //  定时停用表单
            if($("#trim2").is(":checked")){
                config.formSet.endTime=$("#trimEnd").val()
            }else{
                config.formSet.endTime=null
            }
            //    搜集反馈的最大数目，停用表单
            if($("#stopAfterNum").is(":checked")){
                config.formSet.maxnum=$("#maxnum").val()
            }else{
                config.formSet.maxnum=null
            }
            //只能微信提交
            if ($("#isweixin").is(":checked")) {
                config.formSet.isweixin=1
            }else{
                config.formSet.isweixin=0
            }
            //每个人只要提交一次
            if ($("#isonevote").is(":checked")) {
                config.formSet.isonevote=1
            }else{
                config.formSet.isonevote=0
            }
            config.formSet.completeinfotype=$('input[name="after-submit-form"]:checked').val();
            config.formSet.completeinfo=$("#completeinfo").val()
            //提交后，是否 公开反馈统计图表
            if ($("#feedbackview").is(":checked")) {
                config.formSet.feedbackview=1
            }else{
                config.formSet.feedbackview=0
            }
            //提交后，公开全部反馈详情
            if ($("#feedbackdetail").is(":checked")) {
                config.formSet.feedbackdetail=1
            }else{
                config.formSet.feedbackdetail=0
            }


            config.formSet.html=encodeURI($("#postMain").html())
            config.formSet.theme=config.formSet.theme
            config.formSet.body=postConfig;}
        getFormConfig()
        console.log(config.formSet)
        $.post("http://120.76.138.42:8099/form.php/index/editform",{data:config.formSet},function (data) {
            alert(1211)
        })

    })

    /***************************************数据整理提交 end *****************************************/


})();
