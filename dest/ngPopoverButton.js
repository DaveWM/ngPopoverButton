angular.module("ngPopoverButton", [ "ui.bootstrap.position", "templates" ]).directive("popoverControl", function() {
    return {
        restrict: "A",
        controller: function($scope, $element) {
            this.popover = null, this.element = $element;
            var self = this;
            $element.bind("click", function() {
                $scope.$apply(function() {
                    self.popover && (self.popover.open = !self.popover.open);
                });
            });
        }
    };
}).directive("popover", [ "$position", "$timeout", "$document", function($position, $timeout, $document) {
    "use strict";
    return {
        restrict: "E",
        require: "^popoverControl",
        templateUrl: "src/template.html",
        transclude: !0,
        replace: !0,
        scope: {
            placement: "@",
            onOpen: "&",
            onClose: "&",
            open: "="
        },
        link: {
            post: function($scope, elem, attrs, popoverControl) {
                $document.find("body").eq(0).append(elem), popoverControl.popover = $scope, $scope.placement = $scope.placement || "left", 
                $scope.$watch(function() {
                    return {
                        open: $scope.open,
                        placement: $scope.placement
                    };
                }, function() {
                    $scope.open ? $scope.onOpen() : $scope.onClose(), $scope.open && $timeout(function() {
                        var pos = $position.positionElements(popoverControl.element, elem, $scope.placement, !1);
                        $scope.popoverPosition = {
                            top: pos.top + "px",
                            left: pos.left + "px"
                        };
                    }, 0);
                }, !0);
            }
        }
    };
} ]).directive("title", function() {
    return {
        require: "^popover",
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<div class="popover-title"><ng-transclude></ng-transclude></div>'
    };
}).directive("content", function() {
    return {
        require: "^popover",
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<div class="popover-content"><ng-transclude></ng-transclude></div>'
    };
}), angular.module("templates", [ "src/template.html" ]), angular.module("src/template.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("src/template.html", '<div class="popover ngPopover animate animate-fade" ng-class="placement" ng-show="open" ng-style="popoverPosition">\n    <div class="arrow"></div>\n    <div class="popover-inner">\n        <ng-transclude></ng-transclude>\n    </div>\n</div>\n');
} ]);