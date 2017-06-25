/**
 * 自己封装的jsonp方法，模拟跨域
 */
//封装jsonp方法
(function(angular){
    var app = angular.module("myJsonpService",[]);
    //将自己封装的jsonp用service抽取出来
    app.service("myService",["$window",function($window){
        this.jsonp = function(url,obj,fn){
            var scrp = $window.document.createElement("script");
            //将用户传进来的对象格式的参数进行字符串的拼接
            var str = "";
            for(var k in obj){
                str += k + "=" + obj[k] + "&";
            };
            //为了避免每次返回的函数名称一样，将之前的函数覆盖掉，这里需要设置一个随机的函数名
            var funcName = "",
                a ="",
                stt = $window.Math.random();
            if(a = ($window.Math.random()!== stt)){
                funcName = "angular" + a.toString().substr(2);//通过substr方法将返回的随机数字符串的前两个字符去掉，（即0和点）
            };
            //将拼接好的地址给url
            url += "?"+ str + "callback="+ funcName;
            //设置回调函数
            $window[funcName] = function(data){
                fn(data);
            };
            //将最终的url加到script标签中的src属性中
            scrp.src= url;
            //将script标签追加到页面当中。
            $window.document.body.appendChild(scrp);
        };
    }]);
})(angular);