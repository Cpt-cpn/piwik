/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-segment-generator>
 */
(function () {
    angular.module('piwikApp').directive('piwikSegmentGenerator', piwikSegmentGenerator);

    piwikSegmentGenerator.$inject = ['$document', 'piwik', '$filter', '$timeout'];

    function piwikSegmentGenerator($document, piwik, $filter, $timeout){
        var defaults = {
            segmentFilter: '',
            addInitialCondition: false
        };

        return {
            restrict: 'A',
            scope: {
                segmentFilter: '=',
                addInitialCondition: '=',
            },
            require: "?ngModel",
            templateUrl: 'plugins/SegmentEditor/angularjs/segment-generator/segmentgenerator.directive.html?cb=' + piwik.cacheBuster,
            controller: 'SegmentGeneratorController',
            controllerAs: 'segmentGenerator',
            compile: function (element, attrs) {

                for (var index in defaults) {
                    if (attrs[index] === undefined) {
                        attrs[index] = defaults[index];
                    }
                }

                return function (scope, element, attrs, ngModel) {
                    if (ngModel) {
                        ngModel.$setViewValue(scope.segmentFilter);
                    }

                    if (ngModel) {
                        ngModel.$render = function() {
                            scope.segmentFilter = ngModel.$viewValue;
                        };
                    }

                    scope.$watch('segmentFilter', function (newValue) {
                        if (ngModel) {
                            ngModel.$setViewValue(segmentFilter);
                        }
                    });
                };
            }
        };
    }
})();