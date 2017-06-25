
(function (angular) {
    // "use strict";
    // start your ride
   var app = angular.module("main", [
       "header",
       "myItem",//为了防止页面路由规则匹配到页面所选标签的规则可将其提前。
       "hot",
       "myDire"
       ]);
})(angular);