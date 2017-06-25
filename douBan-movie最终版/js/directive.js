/**
 * 通过自定义规则来控制按钮样式切换
 */
(function(angular){
    var app =  angular.module("myDire",[]);
    app.directive("autoActive",["$location",function($location){//这里自定义是名称以驼峰命名法，但在页面中使用时则要以-分开来进行使用。
        return {//自定义指令中药return一个对象
            link: function(scope,element,attribus){//link属性可以拿到当前元素，元素中的所有属性
                element.on("click",function(){//给有自定义指令的元素添加点击事件
                    element.parent().children().removeClass("active");//先移除在添加，因为angular中没有siblings方法，所以采用这种方式。
                    element.addClass("active");
                });
                //监视页面中的锚点值，来改变标签的状态。
                scope.loca = $location;
                scope.$watch(["loca.url()",function(now,old){
                    var str = element.find("a").attr("href").substr(1);//拿到里边a标签的href值里边#后边的值。
                    //startsWidth()用来判断一个字符串中是否包含另一个字符串
                    if(now.startsWidth(str)){//如果获取到的值中包含，a的href中的值,则添加样式
                        element.parent().children().removeClass("active");//移除所有其它元素的样式。
                        element.addClass("active");//给当前元素添加样式
                    };
                }]);
            }
        }
    }]);
})(angular);