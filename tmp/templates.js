angular.module('templates', ['src/template.html']);

angular.module("src/template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/template.html",
    "<div class=\"popover ngPopover animate animate-fade\" ng-class=\"placement\" ng-show=\"open\" ng-style=\"popoverPosition\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-inner\">\n" +
    "        <ng-transclude></ng-transclude>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
