angular.module("ngPopoverButton", ["ui.bootstrap.position", "templates"])
    /**
    * @constructor popoverButton
    * @desc Directive that creates a button which opens a popover when clicked. The popover-button element should always contain a content element (and optionally a title element).
    * Implement using the tag <popover-button></popover-button>. Restricted for element use only.
    */
    .directive("popoverButton", ['$position', '$timeout', function ($position, $timeout) {
        "use strict";

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'src/template.html',
            scope: {
                buttonText: '@',
                buttonIcon: '@',
                placement: '@',
                onOpen: '&',
                onClose: '&'
            },
            link: {
                post: function($scope, elem) {
                    // watch for changes to popover state
                    $scope.$watch('open', function() {
                        if ($scope.open) {
                            $scope.onOpen();
                        }
                        else {
                            $scope.onClose();
                        }

                        // if popover has been opened, position it correctly. 
                        // Need to do this in a timeout, because if popover is hidden when it is positioned, the "positionElements" method doesn't work correctly.
                        if ($scope.open) {
                            $timeout(function() {
                                var pos = $position.positionElements(elem, elem.children().eq(1), $scope.placement, false);
                                $scope.popoverPosition = { top: pos.top + "px", left: pos.left + "px" };
                            }, 0);
                        }
                    });
                }
            }
        };
    }])
    /**
    * @constructor title
    * @desc The title for the popover.
    * Implement using the tag <title></title>. Restricted for element use only.
    */
    .directive('title', function() {
        return {
            require: '^popoverButton',
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div class="popover-title"><ng-transclude></ng-transclude></div>'
        };
    })
    /**
    * @constructor content
    * @desc The content of the popover.
    * Implement using the tag <content></content>. Restricted for element use only.
    */
    .directive('content', function() {
        return {
            require: '^popoverButton',
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div class="popover-content"><ng-transclude></ng-transclude></div>'
        };
    });