angular.module('templates', ['src/template.html']);

angular.module("src/template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/template.html",
    "<button class=\"btn btn-default\" ng-model=\"open\" btn-checkbox type=\"button\"><i class=\"fa\" ng-class=\"buttonIcon\"></i> {{buttonText}}</button>\n" +
    "<div class=\"popover animate animate-fade\" ng-class=\"placement\" ng-show=\"open\" ng-style=\"popoverPosition\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-inner\">\n" +
    "        <ng-transclude></ng-transclude>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
