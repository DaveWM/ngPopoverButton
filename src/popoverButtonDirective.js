angular.module("ngPopoverButton", ["ui.bootstrap.position", "templates"])
    .directive('popoverControl', function (){
        return {
            restrict: 'A',
            controller: function ($scope, $element){
                this.popover = null;
                this.element = $element;
                var self = this;
                $element.bind("click", function (){
                    $scope.$apply(function (){
                        if(self.popover){
                            self.popover.open = !self.popover.open;
                        }
                    });
                });
            }
        };
    })
    .directive("popover", ['$position', '$timeout', '$document', function ($position, $timeout, $document) {
        "use strict";

        return {
            restrict: 'E',
            require: '^popoverControl',
            templateUrl: 'src/template.html',
            transclude: true,
            replace: true,
            scope: {
                placement: '@',
                onOpen: '&',
                onClose: '&',
                open: '='
            },
            link: {
                post: function($scope, elem, attrs, popoverControl) {
                    $document.find('body').eq(0).append(elem);

                    popoverControl.popover = $scope;

                    $scope.placement = $scope.placement || 'left';

                    // watch for changes to popover state
                    $scope.$watch(function (){
                        return {
                            open: $scope.open,
                            placement: $scope.placement
                        };
                    }, function() {
                        if ($scope.open) {
                            $scope.onOpen();
                        }
                        else {
                            $scope.onClose();
                        }

                        // if popover has been opened, position it correctly. 
                        // Need to do this in a timeout, because if popover is hidden when it is positioned, the "positionElements" method doesn't work correctly.
                        if ($scope.open) {
                            $timeout(function () {
                                var pos = $position.positionElements(popoverControl.element, elem, $scope.placement, false);
                                $scope.popoverPosition = {top: pos.top + "px", left: pos.left + "px"};
                            }, 0);
                        }
                    }, true);
                }
            }
        };
    }])
    .directive('title', function() {
        return {
            require: '^popover',
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div class="popover-title"><ng-transclude></ng-transclude></div>'
        };
    })
    .directive('content', function() {
        return {
            require: '^popover',
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div class="popover-content"><ng-transclude></ng-transclude></div>'
        };
    });