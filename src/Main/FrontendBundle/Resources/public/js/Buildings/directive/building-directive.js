(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.buildings')
        .directive('building', building);

    building.$inject = ['BuildingsFactory'];

    function building() {
        return {
            restrict: 'E',
            scope: {
                name: '='
            },
            controller: function ($scope, BuildingsFactory) {
                init();

                function init() {
                    BuildingsFactory.init();
                }
                $scope.timeSummary = BuildingsFactory[$scope.name]['timeSummary'];
                $scope.elapsed = 0;
                // operations when soldier added to queue
                $scope.add = function (name) {
                    $scope.$broadcast('timer-add-cd-seconds', BuildingsFactory[name]['time'] * $scope.soldier[name]['amount']);
                    BuildingsFactory.addToQueue({
                        amount: $scope.soldier[name]['amount'],
                        time: BuildingsFactory[name]['time'] * $scope.soldier[name]['amount'],
                        name: name
                    }).then(function () {
                        BuildingsFactory.setTimeSummary(name, BuildingsFactory[name]['time'] * $scope.soldier[name]['amount']);
                    })
                };
                // operations every second
                $scope.$on('timer-tick', function (event, data) {
                    // prevent increment counter
                    if ($scope.elapsed == 0) {
                        BuildingsFactory[$scope.name]['timeSummary'] = 1;
                    }
                    // set counter and progressbar
                    $scope.elapsed = data.millis / 1000;
                    $scope.timeSummary = BuildingsFactory[$scope.name]['timeSummary'];

                    // increment amount of soldiers who are trained
                    if ($scope.elapsed % BuildingsFactory[$scope.name]['time'] == 0 && $scope.elapsed != 0) {
                        BuildingsFactory[$scope.name]['soldiers'] = BuildingsFactory[$scope.name]['soldiers'] + 1;
                        // decrement amount of soldiers in queue
                        BuildingsFactory[$scope.name]['queue'][0]['amount'] = BuildingsFactory[$scope.name]['queue'][0]['amount'] - 1;
                        if (BuildingsFactory[$scope.name]['queue'][0]['amount'] == 0) {
                            BuildingsFactory[$scope.name]['queue'].shift();
                        }
                    }
                });

                $scope.soldier = BuildingsFactory;
            },
            transclude: true,
            template: '<div class="thumbnail" ng-init="image= soldier[name][\'imgPath\'] ">\n    <div style="height: 120px;">\n        <div class="row">\n            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">\n                <img ng-src="[[ image ]]"\n                     ng-click="openAside(\'bottom\')"\n                     style="cursor: pointer;max-width: 128px;">\n            </div>\n            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <div class="pull-right">\n                            <h4>\n                                <span class="label label-default"\n                                      ng-bind="soldier[name][\'soldiers\']">\n                                </span>\n                                <label>\n                                    <input  type="number"\n                                            style="width: 50px"\n                                            min="0"\n                                            max="999"\n                                            ng-model="soldier[name][\'amount\']"/>\n                                </label>\n                                <button class="btn btn-success btn-xs"\n                                        ng-click="add(name)"\n                                        ng-disabled="!soldier[name][\'amount\']">\n                                    <span class="glyphicon glyphicon-plus"></span>\n                                </button>\n                            </h4>\n                        </div>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <span ng-repeat="queue in soldier[name][\'queue\'] | limitTo: 2">\n                            <span ng-bind="queue.amount"></span>\n                            <img ng-src="[[ image ]]" style="height: 47px;" />\n                        </span>\n                        <span ng-show="soldier[name][\'queue\'].length > 2"\n                              class="label label-default ng-binding">\n                            +[[ soldier[name][\'queue\'].length - 2 ]]\n                        </span>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <h3 class="pull-right" style="height: 28px;">\n                            <timer interval="1000"\n                                   autostart="false"\n                                   countdown="timeSummary"\n                                   max-time-unit="\'hour\'">\n                                <span ng-show="hours">\n                                    <span ng-bind="hours"></span>h\n                                </span>\n                                <span ng-show="minutes">\n                                    <span ng-bind="minutes"></span>min\n                                </span>\n                                <span ng-show="seconds > 1">\n                                    <span ng-bind="seconds"></span>sec\n                                </span>\n                            </timer>\n                        </h3>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <progressbar ng-show="elapsed > 0"\n                                     class="progress-striped active"\n                                     max="100"\n                                     value="elapsed/timeSummary*100"\n                                     type="success">\n                        </progressbar>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="caption">\n        <h3><span ng-bind="soldier[name][\'name\']"></span></h3>\n        <p><span class="label label-warning" ng-bind="soldier[name][\'food\']"></span></p>\n    </div>\n</div>'
        };
    }
})();
