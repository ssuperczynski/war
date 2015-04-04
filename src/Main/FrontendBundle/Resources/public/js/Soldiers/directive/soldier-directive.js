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

    soldier.$inject = ['SoldiersFactory', '$firebase'];

    function soldier() {
        return {
            restrict: 'E',
            scope: {
                range: '='
            },
            controller: function ($scope, SoldiersFactory, $firebase) {
                //var ref = new Firebase("https://amber-heat-9116.firebaseio.com/");
                // create an AngularFire reference to the data
                //var sync = $firebase(ref);
                // download the data into a local object
                //$scope.data = sync.$asObject();
                init();

                function init() {
                    SoldiersFactory.init();
                }
                $scope.timeSummary = SoldiersFactory[$scope.range]['timeSummary'];
                $scope.elapsed = 0;
                // operations when soldier added to queue
                $scope.add = function (range) {
                    $scope.$broadcast('timer-add-cd-seconds', SoldiersFactory[range]['time'] * $scope.soldier[range]['amount']);
                    SoldiersFactory.addToQueue({
                        amount: $scope.soldier[range]['amount'],
                        time: SoldiersFactory[range]['time'] * $scope.soldier[range]['amount'],
                        range: range
                    }).then(function () {
                        SoldiersFactory.setTimeSummary(range, SoldiersFactory[range]['time'] * $scope.soldier[range]['amount']);
                    })
                };
                //SoldiersFactory[$scope.range]['soldiers'] = 100000;
                // operations every second
                $scope.$on('timer-tick', function (event, data) {
                    // prevent increment counter
                    if ($scope.elapsed == 0) {
                        SoldiersFactory[$scope.range]['timeSummary'] = 1;
                    }
                    // set counter and progressbar
                    $scope.elapsed = data.millis / 1000;
                    $scope.timeSummary = SoldiersFactory[$scope.range]['timeSummary'];

                    // increment amount of soldiers who are trained
                    if ($scope.elapsed % SoldiersFactory[$scope.range]['time'] == 0 && $scope.elapsed != 0) {
                        SoldiersFactory[$scope.range]['soldiers'] = SoldiersFactory[$scope.range]['soldiers'] + 1;
                        // decrement amount of soldiers in queue
                        console.log('SoldiersFactory[$scope.range][queue]', SoldiersFactory[$scope.range]);
                        SoldiersFactory[$scope.range]['queue'][0]['amount'] = SoldiersFactory[$scope.range]['queue'][0]['amount'] - 1;
                        if (SoldiersFactory[$scope.range]['queue'][0]['amount'] == 0) {
                            SoldiersFactory[$scope.range]['queue'].shift();
                        }
                    }
                });

                $scope.soldier = SoldiersFactory;
            },
            transclude: true,
            template: '<div class="thumbnail" ng-init="image= soldier[range][\'imgPath\'] ">\n    <div style="height: 120px;">\n        <div class="row">\n            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">\n                <img ng-src="[[ image ]]"\n                     ng-click="openAside(\'bottom\')"\n                     style="cursor: pointer">\n            </div>\n            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <div class="pull-right">\n                            <h4>\n                                <span class="label label-default"\n                                      ng-bind="soldier[range][\'soldiers\']">\n                                </span>\n                                <label>\n                                    <input  type="number"\n                                            style="width: 50px"\n                                            min="0"\n                                            max="999"\n                                            ng-model="soldier[range][\'amount\']"/>\n                                </label>\n                                <button class="btn btn-success btn-xs"\n                                        ng-click="add(range)"\n                                        ng-disabled="!soldier[range][\'amount\']">\n                                    <span class="glyphicon glyphicon-plus"></span>\n                                </button>\n                            </h4>\n                        </div>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <span ng-repeat="queue in soldier[range][\'queue\'] | limitTo: 2">\n                            <span ng-bind="queue.amount"></span>\n                            <img ng-src="[[ image ]]" style="height: 47px;" />\n                        </span>\n                        <span ng-show="soldier[range][\'queue\'].length > 2"\n                              class="label label-default ng-binding">\n                            +[[ soldier[range][\'queue\'].length - 2 ]]\n                        </span>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <h3 class="pull-right" style="height: 28px;">\n                            <timer interval="1000"\n                                   autostart="false"\n                                   countdown="timeSummary"\n                                   max-time-unit="\'hour\'">\n                                <span ng-show="hours">\n                                    <span ng-bind="hours"></span>h\n                                </span>\n                                <span ng-show="minutes">\n                                    <span ng-bind="minutes"></span>min\n                                </span>\n                                <span ng-show="seconds > 1">\n                                    <span ng-bind="seconds"></span>sec\n                                </span>\n                            </timer>\n                        </h3>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <progressbar ng-show="elapsed > 0"\n                                     class="progress-striped active"\n                                     max="100"\n                                     value="elapsed/timeSummary*100"\n                                     type="success">\n                        </progressbar>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="caption">\n        <h3><span ng-bind="soldier[range][\'name\']"></span></h3>\n        <p><span class="label label-warning" ng-bind="soldier[range][\'food\']"></span></p>\n    </div>\n</div>'
        };
    }
})();
