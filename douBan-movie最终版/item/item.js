/**
 * 详情页，即详细信息页面。
 */
(function(angular){
    var app = angular.module("myItem",["ngRoute","myJsonpService"]);
    app.config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/details/:id",{//设置路由规则
            templateUrl: "item/item.html",
            controller: "myDetails"
        });
    }]);
    app.controller("myDetails",["$scope","$routeParams","myService",function($scope,$routeParams,myService){
        myService.jsonp("http://api.douban.com/v2/movie/subject/"+$routeParams.id,{},function(response){
            $scope.data = response;
            $scope.$apply();
        });
    }]);
})(angular);