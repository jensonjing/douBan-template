/**这里是创建主页的路由模块*/
(function(angular){
    var app = angular.module("header",["ngRoute"]);//这里需要借助路由模块，所以要引入路由的js
    app.config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/home_page",{
            templateUrl: "./home/home.html", //注意这里的路径是从主页面的所在的文件夹算起的
        }).otherwise({
            redirectTo: "/home_page" //这里是为了当页面刚加载时指向首页的路由地址。
        });
    }]);
})(angular);