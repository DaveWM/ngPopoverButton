angular.module('demo', ['ngPopoverButton'])
.controller('demoController', function ($scope){
    $scope.popoverOpen = false;
        $scope.placement="left";
});