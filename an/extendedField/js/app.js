function getParams(key){
      var url = location.search.replace(/^\?/,'').split('&');
      var paramsObj = {};
      for(var i = 0, iLen = url.length; i < iLen; i++){
          var param = url[i].split('=');
          paramsObj[param[0]] = param[1];
      }
      if(key){
          return paramsObj[key] || '';
      }
      return paramsObj;
  };
angular.module('FORM', ["ngRoute",'ngAnimate','ui.sortable','ngDialog'])
/*====================控制页面高度指令=======================*/
.directive('stylecenter',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
            var WH=$(window).height();
            $(element).height(WH-88-75).css("over-flow","hidden");
            var totalHeight = $(window).height();
            var leftHeight = totalHeight - $('.f-header').outerHeight() - $('.f-title-container').outerHeight();
            var rightHeight = leftHeight - $('.f-right-title').outerHeight() - $('.f-right-buttons').outerHeight();
            element.height(rightHeight)
        }
    };
})
.directive('stylecollapse',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
           element.find(".f-center-title").bind("click",function() {
              element.find(".f-center-content").toggleClass("ng-hide")
              /*angular.element(this).next(".f-center-content").show()*/
           })
        }
    };
})
.directive('styleleft',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
            var WH=$(window).height();
            $(element).height(WH-88-75).css("over-flow","hidden");
            var totalHeight = $(window).height();
            var leftHeight = totalHeight - $('.f-header').outerHeight() - $('.f-title-container').outerHeight();
            element.height(leftHeight)
        }
    };
})
.directive('dataplug',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind("focus",function(argument) {
            var _this=this;
            WdatePicker({
              dateFmt:'yyyy-MM-dd',
              onpicked:function(argument) {
                var val=angular.element(_this).val()
                scope.d.chosed=val
                scope.$digest()
                
              }
            })
          })
        }
    };
})
.directive('forange',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind("mousedown",function(argument) {
            element.siblings().removeClass("f-orange")
            element.addClass("f-orange")
          })
         
        }
    };
})
.directive('myhref',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind("click",function(argument) {
            var href=attr.myhref
            window.location.hash="#"+href
          })
         
        }
    };
})
.directive('resetwidth',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
          var width=element.width();
          for(;;){
            if((width-1)%3==0){
                element.width(width)
                break;
            }else{
              width--;
            }
          }
         
        }
    };
})
.directive('stylemodel',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind("click",function(argument) {
            $('#myModal').modal('show');
          })
        }
    };
})
.directive('onlynumber',function() {
    return {
        restrict: 'A',
        link:function(scope,element,attr){
          element.bind("keyup",function(argument) {
            if(this.value.length==1){
              this.value=this.value.replace(/[^1-9]/g,'')
            }else{
              this.value=this.value.replace(/\D/g,'')
            }
          })  
          element.bind("afterpaste",function(argument) {
            if(this.value.length==1){
              this.value=this.value.replace(/[^1-9]/g,'')
            }else{
              this.value=this.value.replace(/\D/g,'')
            }
          })
        }
    };
})

/*=====================路由=======================*/
.config(function($routeProvider,$httpProvider) {
  $routeProvider
    .when("/creatForm", {
      templateUrl: 'index_build_form.html',/*创建页面*/
      controller: 'buildCtrl'
    })    
    .when("/newForm", {
      templateUrl: 'index_new_form.html',/*编辑页面*/
      controller: 'addCtrl'
    })    
    .when("/view", {
      templateUrl: 'index_form_preview.html',/*编辑页面*/
      controller: 'viewCtrl'
    });
    $httpProvider.interceptors.push('loadingAnima');
})
//http拦截器
.factory('loadingAnima',function ($q,$rootScope) {
    return{
        request: function (config) {
           $rootScope.loading_show = true;
           return config;
        },
        response: function (response) {
           $rootScope.loading_show = false;
           return response;
        },
        responseError : function(rejection) {
          alert("请求失败")
          return $q.reject(rejection);
        }
     }
})
.factory('pub',function($location,$http,ngDialog){
  var baseId=0;
  var $data={
      baseUrl:"http://127.0.0.1/Template/Knowledge/extendedField",
      form_name:"",
      //表单主体内容
      max_plug_id:4,
      items:[],
      //用户自定义字段
      max_baseid:4,
      extend_list:[]
  }
  return {
        setData:function(key,value){
            $data[key]=angular.copy(value);
        },
        getData:function(key) {
            return angular.copy($data[key])
        },
        path:function(key) {
           $location.path(key);
        },
        post:function(url,fn) {
          $http({
              url:$data.baseUrl+url,
              method:'POST'
            }).success(function(data,header,config,status){
              fn&&fn(data)
            }).error(function(data,header,config,status){
              $data.errInfo=data;
              console.log(data);
            });
        },
        guid:function() {
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        },
        dialog:function(info) {
           ngDialog.openConfirm({
                template: 'dialog.html',
                className: 'ngdialog-theme-default',
                showClose: false,
                closeByDocument: false,
                closeByEscape: false,
                controller: ['$scope', function($scope) {
                     $scope.info=info;
                     $scope.myclose=function(B) {
                      $scope.closeThisDialog()
                      info.onclose&&info.onclose(B)
                     }  

                }]
            });
        }
    }
})
/*=======================主控制器=======================*/
.controller('mainCtrl', function($scope,$location,pub) {
    var type=getParams("type");
      if(type==1){
        pub.path("/newForm")
      /*  pub.post("/adasdsadasd.json",function(data) {
           pub.path("/newForm")
        })*/
      }
      if(type==2){
        //获取用户自定义字段配置信息
        pub.post("/userconf.json",function(data) {
           pub.setData("extendInfo",data.extendInfo);
           pub.setData("item",data.item);
           pub.path("/newForm")
        })
      }
})
/*======================创建页面控制器======================*/
.controller('addCtrl', function($scope,pub) {
  $scope.form_name="新建表单"
  $scope.row_style="1"
  $scope.goCreatForm=function(argument) {
        if(!$scope.form_name){
          pub.dialog({
            header:"提示",
            content:"请填写表单名称"
          })
          return
        }
        pub.setData("form_name",$scope.form_name)
        pub.setData("row_style",$scope.row_style)
        pub.setData("max_plug_id",4)
        pub.setData("max_baseid",4)
        pub.setData("extend_list",[])
        pub.setData("items",[])
    //$location.path("/creatForm");
    pub.path("/creatForm");
  }
})
/*====================编辑页面控制器===========================*/
.controller('buildCtrl', function($scope,pub) {
var row_style=pub.getData("row_style");//初始化列
$scope.form_name=pub.getData("form_name");//表单名称
$scope.items=pub.getData("items");//表单主体内容数据
$scope.extend_list=pub.getData("extend_list");//自定义字段

//储存页面样式状态的容器
$scope.style={
       isEdit:false,
    };

//系统默认字段的数据
$scope.systemDefult=[
              {
                title: "标题",
                required: 1,
                imgSrc: "img/danhanwenben.png",
                type: "1",
                strLen:50,
                maxChildId:3,
              }, 
              {
                title: "所属分类",
                required: 0,
                imgSrc: "img/xialacaidan.png",
                type: "6",
                maxChildId:3,
                chosed:1,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "版本号",
                required: 0,
                imgSrc: "img/danhanwenben.png",
                type: "5",
                maxChildId:3,
                chosed:"1",
                strLen:50,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "相关产品",
                required: 0,
                imgSrc: "img/danhanwenben.png",
                type: "1",
                strLen:50,
              }, 
              {
                title: "关键字",
                required: 0,
                imgSrc: "img/danhanwenben.png",
                type: "1",
                strLen:50,
              }, 
              {
                title: "相关分类",
                required: 0,
                imgSrc: "img/danhanwenben.png",
                type: "1",
                strLen:50,
              }, 
              {
                title: "类型",
                required: 0,
                imgSrc: "img/xialacaidan.png",
                type: "6",
                 maxChildId:3,
                chosed:1,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "来源",
                required: 0,
                imgSrc: "img/xialacaidan.png",
                type: "1",
                 maxChildId:3,
                chosed:1,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "保密级别",
                required: 0,
                imgSrc: "img/xialacaidan.png",
                type: "6",
                 maxChildId:3,
                chosed:1,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "相关行业",
                required: 0,
                imgSrc: "img/xialacaidan.png",
                type: "6",
                 maxChildId:3,
                chosed:1,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "相关技术",
                required: 0,
                imgSrc: "img/xialacaidan.png",
                type: "6",
                maxChildId:3,
                chosed:1,
                children:[
                          {
                            id:1,
                            title:"选项1",
                            addBtnShow:false
                          }, 
                          {
                            id:2,
                            title:"选项2",
                            addBtnShow:false
                          }, 
                          {
                            id:3,
                            title:"选项3",
                            addBtnShow:true
                          }
                        ]
              }, 
              {
                title: "摘要",
                required: 0,
                imgSrc: "img/duohangwenben.png",
                type: "2",
                strLen:50,
              }       
    ]
//字段拓展数据
$scope.extend={
      target:null,
      addOrigin:function(d) {
          this.target=JSON.parse(JSON.stringify(d))
          this.target.id=pub.guid();
          /*规范数据格式  */
      },
      saveOrigin:function() {
        if(!this.target){
          alert("请选择组件！")
          return;
        }
        this.list.push(this.target)
        this.target=null;
      },
      delPlug:function(d) {
          var newitem=[];
          this.list=this.list.filter(function(argument) {
            return argument.id!=d.id
          });

      },
     list:[
        { 
          title: "单选",
          required: 1,
          imgSrc: "img/danxuan.png",
          type: 6,
          id:1,
          maxChildId:3,
          children:[
                {
                  id:1,
                  title:"选项1",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:2,
                  title:"选项2",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:3,
                  title:"选项3",
                  isChecked:"1",
                  addBtnShow:true
                },
              ]
        },
        { 
          title: "日期",
          required: 1,
          imgSrc: "img/riqi.png",
          type: 7,
          id:2,
        },
        { 
          title: "多选",
          required: 1,
          imgSrc: "img/duoxuan.png",
          type: 4,
          id:3,
          maxChildId:3,
          children:[
                {
                  id:1,
                  title:"选项1",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:2,
                  title:"选项2",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:3,
                  title:"选项3",
                  isChecked:"1",
                  addBtnShow:true
                },
              ]
        },   
      ],
      origin:[
          { 
            title: "单选",
            required: 1,
            imgSrc: "img/danxuan.png",
            type: 5,
            maxChildId:3,
            children:[
                {
                  id:1,
                  title:"选项1",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:2,
                  title:"选项2",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:3,
                  title:"选项3",
                  isChecked:"1",
                  addBtnShow:true
                },
              ]
          },  
          { 
            title: "单行文本",
            required: 1,
            imgSrc: "img/danhanwenben.png",
            type: 1,
            strLen:50,
          },  
          { 
            title: "多选",
            required: 1,
            imgSrc: "img/duoxuan.png",
            type: 4,
            maxChildId:3,
            children:[
                {
                  id:1,
                  title:"选项1",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:2,
                  title:"选项2",
                  isChecked:1,
                  addBtnShow:false
                }, 
                {
                  id:3,
                  title:"选项3",
                  isChecked:"1",
                  addBtnShow:true
                },
              ]
          },  
          { 
            title: "多行文本",
            required: 1,
            imgSrc: "img/duohangwenben.png",
            type: 2,
            strLen:50,
          },  
          { 
            title: "日期",
            required: 1,
            imgSrc: "img/riqi.png",
            type: 7,
          },  
          { 
            title: "数字",
            required: 1,
            imgSrc: "img/shuzi.png",
            type: 3,
            strLen:50,
          },  
          { 
            title: "下拉菜单",
            required: 1,
            imgSrc: "img/xialacaidan.png",
            type: 6,
            maxChildId:3,
            chosed:1,
            children:[
                {
                  id:1,
                  title:"选项1",
                  addBtnShow:false
                }, 
                {
                  id:2,
                  title:"选项2",
                  addBtnShow:false
                }, 
                {
                  id:3,
                  title:"选项3",
                  addBtnShow:true
                },
              ]
          }
      ]
    }
/*//储存运行中的临时数据
    $scope.temp={};*/
//操作对象
    $scope.target=null;
//点击以生成组件时进行的操作
    $scope.changeTarget=function(target){
        $scope.style.isEdit=true;
        $scope.target=target;
    }
//点击添加组件
    $scope.addPlug=function(item) {
      var item=JSON.parse(JSON.stringify(item))
      item.id=pub.guid();
      item.size=4*row_style;
      if(item.type==2){
        item.size=12
      }
      $scope.items.push(item)
    }
//删除组件
    $scope.delPlug=function(d) {
      $scope.items=$scope.items.filter(function(argument) {
        return argument.id!=d.id
      });
      $scope.target=null;
    }
//添加单选
    $scope.addChildren1=function(d) {
      $scope.target.maxChildId++;
      $scope.target.children.push({
            id:pub.guid(),
            title:"选项"+$scope.target.maxChildId
      })
    }
//删除单选
    $scope.delChildren1=function(d) {
      $scope.target.children=$scope.target.children.filter(function(argument) {
        return argument.id!=d.id
      });
    }
//添加多选
    $scope.addChildren=function(d) {
      $scope.target.maxChildId++;
      $scope.target.children.push({
            id:pub.guid(),
            title:"选项"+$scope.target.maxChildId,
            isChecked:0,
      })
    }
//删除多选
    $scope.delChildren=function(d) {
      $scope.target.children=$scope.target.children.filter(function(argument) {
        return argument.id!=d.id
      });
    }
//返回
    $scope.goPrev=function() {
          pub.dialog({
              header:"提示",
              content:"是否要放弃本次编辑!",
              footer:["确定","取消"],
              onclose:function(argument) {
                  if(argument)pub.path("/newForm");
              }
          })
    } 
//关闭
    $scope.closeForm=function() {
          pub.dialog({
              header:"提示",
              content:"是否要放弃本次编辑!",
              footer:["确定","取消"],
              onclose:function(argument) {
                  if(argument)pub.path("/newForm");
              }
          })
    }
//预览
   $scope.goView=function() {
        if($scope.items.length==0){
          pub.dialog({
              header:"提示",
              content:"没有组件可供预览!",
          })
          return
        }
        pub.setData("items",$scope.items);//表单主体内容数据
        pub.setData("extend_list",$scope.extend_list);//自定义字段
        pub.path("/view")
    }
})
/*==========================创建预览控制器============================*/
.controller('viewCtrl', function($scope,$location,pub) {
      $scope.form_name=pub.getData("form_name");//表单名称
      $scope.items=pub.getData("items");//表单主体内容数据
})


















































/*.directive('single', function() {
    return {
        restrict: 'E',
        template:function() {
           console.log(arguments);
           return '<div></div>'
        },
        replace: true,
        link:function(scope, element,attr){
           console.log(element.html())
           console.log(element.attr("nmz"))
        }
    };
})*/
/*.filter('trust',['$sce', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    }
}])*/
/*.filter("reverse",function($sce,$compile){
    return function(elem){
       if(elem.type=="singleInput"){
            $compile(element.contents())(scope)
            return   $sce.trustAsHtml("<div>{{d}}<h2>这里是singleInput</h2><textarea  id='' cols='30' rows='10'></textarea><single></single></div>") 
       }  
       if(elem.type=="muiltInput"){
            $compile(element.contents())(scope)
            return    $sce.trustAsHtml("<div><h2>这里是muiltInput</h2><input type='text' /><single></single></div>") 
       }  
       if(elem.type=="radio"){
            $compile(element.contents())(scope)
            return     $sce.trustAsHtml("<div><h2>这里是radio</h2><input type='text' /></div>") 
       }  
       if(elem.type=="select"){ 
        $compile(element.contents())(scope)  
            return    $sce.trustAsHtml("<div><h2>这里是select</h2><input type='text' /></div>") 
       }
    }
})*/