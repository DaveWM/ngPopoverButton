angular.module("ngPopoverButton", [ "ui.bootstrap.position", "templates" ]).directive("popoverButton", [ "$position", "$timeout", function($position, $timeout) {
    "use strict";
    return {
        restrict: "E",
        transclude: true,
        templateUrl: "src/template.html",
        scope: {
            buttonText: "@",
            buttonIcon: "@",
            placement: "@",
            onOpen: "&",
            onClose: "&"
        },
        link: {
            post: function($scope, elem) {
                $scope.$watch("open", function() {
                    if ($scope.open) {
                        $scope.onOpen();
                    } else {
                        $scope.onClose();
                    }
                    if ($scope.open) {
                        $timeout(function() {
                            var pos = $position.positionElements(elem, elem.children().eq(1), $scope.placement, false);
                            $scope.popoverPosition = {
                                top: pos.top + "px",
                                left: pos.left + "px"
                            };
                        }, 0);
                    }
                });
            }
        }
    };
} ]).directive("title", function() {
    return {
        require: "^popoverButton",
        restrict: "E",
        transclude: true,
        replace: true,
        template: '<div class="popover-title"><ng-transclude></ng-transclude></div>'
    };
}).directive("content", function() {
    return {
        require: "^popoverButton",
        restrict: "E",
        transclude: true,
        replace: true,
        template: '<div class="popover-content"><ng-transclude></ng-transclude></div>'
    };
});

angular.module("templates", [ "src/template.html" ]);

angular.module("src/template.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("src/template.html", '<button class="btn btn-default" ng-model="open" btn-checkbox type="button"><i class="fa" ng-class="buttonIcon"></i> {{buttonText}}</button>\n' + '<div class="popover animate animate-fade" ng-class="placement" ng-show="open" ng-style="popoverPosition">\n' + '    <div class="arrow"></div>\n' + '    <div class="popover-inner">\n' + "        <ng-transclude></ng-transclude>\n" + "    </div>\n" + "</div>\n" + "");
} ]);