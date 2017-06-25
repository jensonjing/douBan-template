/**
 * 正在热映模块
 */
(function(angular){
    var app = angular.module("hot",["ngRoute","myJsonpService"]);
    app.config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/:titleType/:page?",{ //这里问号代表地址栏中不写页数也可以匹配到。
            templateUrl: "./movieList/movie_list.html",
            controller: "hotPage"
        });
    }]);
    /*app.controller("hotPage",["$http","$scope",function($http,$scope){
        //方式一：将数据放到本地模拟下
        /!*$http.get("./movieList/data.json").then(function(response){//注意路径
            console.log(response.data); //查看数据格式。
            $scope.data = response.data;
        });*!/
        //方式二：通过跨域请求得到数据(由于豆瓣ipi不支持此种调用形式，所以只能自己封装一个跨域请求文件)
        /!*$http.jsonp("http://api.douban.com/v2/movie/in_theaters?callback=JSON_CALLBACK").then(function(response){
            $scope.data = response.data;
        });*!/
    }]);*/
    //方式三:利用自己封装的jsonp进行跨域请求
    app.controller("hotPage",["$scope","$routeParams","$window","$route","myService",function($scope,$routeParams,$window,$route,myService){
        //实现分页功能(通过路由参数)
        //1.通过改变路由参数来实现翻页
        $scope.pageSize = 10;//设置每页的条数
        //规律：0-9，第一页，10-19第二页
        $scope.page = ($routeParams.page || "1") - 0;//这里减0目的是为了将字符串转换成数字方便下边计算。同时为了方式用户不传显示第一页默认给个"1".这里是设置第几页。
        $scope.start = $scope.pageSize * $scope.page - 10; //这里求出从第几条开始。
        $scope.loading = true;//让loading动画显示
        myService.jsonp("http://api.douban.com/v2/movie/"+ $routeParams.titleType,{start:$scope.start,count:$scope.pageSize,q:$routeParams.q},function(response){
            $scope.data = response;
            //2.1根据总数据计算初总共的页数。
            $scope.totalPage = $window.Math.ceil($scope.data.total/$scope.pageSize);
            $scope.loading = false;//让loading动画隐藏
            $scope.$apply();//由于自己写的异步数据angular不会知道，所以需要通知angular才能展示数据。
        });
        //2.通过点击按钮来实现翻页功能。
        $scope.getPage = function(newPage){
            //小于等于第一页或大于最后一页时直接返回。不允许获取值
            if(newPage <=0 || newPage > $scope.totalPage){
                return;
            };
            $route.updateParams({page:newPage});//通过$route中的updateParams方法可以获得路由参数中锚点后边的值。
        };
    }]);
})(angular);