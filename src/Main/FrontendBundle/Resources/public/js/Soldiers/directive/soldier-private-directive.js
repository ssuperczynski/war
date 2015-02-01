(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.soldiers')
        .directive('soldier', soldier);

    soldier.$inject = ['SoldiersFactory'];

    function soldier() {
        return {
            restrict: 'E',
            scope: {
                range: '='
            },
            controller: function ($scope, SoldiersFactory) {
                $scope.timeSummary = 1;
                $scope.elapsed = 0;

                $scope.add = function (range) {
                    // add time to counter
                    $scope.$broadcast('timer-add-cd-seconds', SoldiersFactory[range]['time'] * $scope.soldier[range]['amount']);
                    SoldiersFactory.addToQueue({
                        amount: $scope.soldier[range]['amount'],
                        type: range
                    }).then(function () {
                        SoldiersFactory.setTimeSummary(range, SoldiersFactory[range]['time'] * $scope.soldier[range]['amount']);
                    })
                };
                $scope.$on('timer-tick', function (event, data) {
                    if ($scope.elapsed == 0) {
                        SoldiersFactory[$scope.range]['timeSummary'] = 1;
                    }
                    $scope.elapsed = data.millis / 1000;
                    $scope.timeSummary =SoldiersFactory[$scope.range]['timeSummary'];
                });

                $scope.soldier = SoldiersFactory;
            },
            transclude: true,
            template: '<div class="thumbnail">\n    <div style="height: 120px;">\n        <div class="row">\n            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\n                <img ng-init="image= soldier[range][\'imgPath\'] "\n                     ng-src="[[ image ]]"\n                     ng-click="openAside(\'bottom\')"\n                     style="cursor: pointer">\n            </div>\n\n            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <div class="pull-right">\n                            <h4>\n                                <span class="label label-default"\n                                        ng-bind="soldier[range][\'soldiers\']"></span>\n                                <label>\n                                    <input\n                                            type="number"\n                                            style="width: 50px"\n                                            min="0"\n                                            max="999"\n                                            ng-model="soldier[range][\'amount\']"/>\n                                </label>\n                                <button class="btn btn-success btn-xs"\n                                        ng-click="add(range)"\n                                        ng-disabled="!soldier[range][\'amount\']">\n                                    <span class="glyphicon glyphicon-plus"></span>\n                                </button>\n                            </h4>\n                        </div>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <h3 class="pull-right" style="height: 28px;">\n                            <timer interval="1000"\n                                   countdown="timeSummary"\n                                   max-time-unit="\'hour\'">\n                                <span ng-show="hours">\n                                    <span ng-bind="hours"></span>h\n                                </span>\n                                <span ng-show="minutes">\n                                    <span ng-bind="minutes"></span>min\n                                </span>\n                                <span ng-show="seconds > 1">\n                                    <span ng-bind="seconds"></span>sec\n                                </span>\n                            </timer>\n                        </h3>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <progressbar ng-show="elapsed > 1"\n                                     class="progress-striped active"\n                                     max="100"\n                                     value="elapsed/timeSummary*100"\n                                     type="success">\n                        </progressbar>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="caption">\n        <h3><span ng-bind="soldier[range][\'name\']"></span></h3>\n        <p><span class="label label-warning" ng-bind="soldier[range][\'food\']"></span></p>\n    </div>\n</div>'
        };
    }
})();
