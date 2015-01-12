describe("directives", function () {
    beforeEach(module("ngPopoverButton"));

    describe("popover button", function () {
        var controllerScope, directiveScope, compiledElement;

        beforeEach(inject(function ($templateCache, $rootScope, $compile) {
            controllerScope = $rootScope.$new();
            controllerScope.onOpen = jasmine.createSpy('open');
            controllerScope.onClose = jasmine.createSpy('close');
            var originalElement = angular.element(
                '<popover-button placement="left" button-text="test" button-icon="icon" on-close="onClose()" on-open="onOpen()">' +
                '<title>title</title>' +
                '<content>content</content>' +
                '</popover-button>');
            compiledElement = $compile(originalElement)(controllerScope);
            controllerScope.$digest();
            directiveScope = controllerScope.$$childHead;
        }));

        it("should compile to a button and a hidden popover", function () {
            expect(compiledElement.find('button').length).toBe(1);
            expect(compiledElement.find('div').eq(0).hasClass('popover')).toBe(true);

            var popover = compiledElement.find('div').eq(0);
            var arrow = popover.children().eq(0);
            var inner = popover.children().eq(1);
            var content = inner.find('div').eq(1);
            var title = inner.find('div').eq(0);

            expect(arrow.hasClass('arrow')).toBe(true);
            expect(inner.hasClass('popover-inner')).toBe(true);
            expect(content.hasClass('popover-content')).toBe(true);
            expect(title.hasClass('popover-title')).toBe(true);

            expect(popover.hasClass('ng-hide')).toBe(true);
            expect(content.text()).toBe('content');
            expect(title.text()).toBe('title');
        });

        it("should display the popover when 'open' is true", function () {
            // the directive tracks whether the popover is open in a variable called "open"
            directiveScope.open = true;
            directiveScope.$digest();
            var popover = compiledElement.find('div').eq(0);
            expect(popover.hasClass('ng-hide')).toBe(false);
        });

        it("should call the onOpen and onClose callbacks", function () {
            // open popover, onOpen() should be called
            directiveScope.open = true;
            directiveScope.$apply();
            expect(controllerScope.onOpen).toHaveBeenCalled();

            // close popover, onClose() should be called
            directiveScope.open = false;
            directiveScope.$apply();
            expect(controllerScope.onClose).toHaveBeenCalled();
        });
    });
})