(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .controller('SoldiersCtrl', SoldiersCtrl);

    SoldiersCtrl.$inject = ['$scope', '$aside', 'SoldiersFactory', 'SoldiersService', '$interval'];

    function SoldiersCtrl($scope, $aside, SoldiersFactory, SoldiersService, $interval) {

        $scope.add = function () {
            $scope.$broadcast('timer-add-cd-seconds', SoldiersFactory.Private.time * $scope.soldier.Private.amount);
            //SoldiersService.addSoldiers($scope.soldier.Private.amount);
            //$scope.timeSummary = SoldiersService.getTotal();
            SoldiersFactory.addToQueue({
                amount: $scope.soldier.Private.amount,
                type: 'private'
            });
        };

        $scope.elapsed = 1;
        $scope.timeSummary = SoldiersService.getTotal();
        $scope.soldier = SoldiersFactory;

        $scope.openAside = function (position) {
            $aside.open({
                templateUrl: 'partials/Soldiers/serial.html',
                placement: position,
                size: 'sm',
                backdrop: false,
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function (e) {
                        $modalInstance.close();
                        e.stopPropagation();
                    };
                    $scope.cancel = function (e) {
                        $modalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            })
        };

        function elapsedTime() {
            $interval(function () {
                SoldiersService.setElapsed();
                if (SoldiersService.getElapsed() > 0) {

                } else {
                    // refresh page
                }
            }, 1000);
        }

        elapsedTime();

    }

})();
