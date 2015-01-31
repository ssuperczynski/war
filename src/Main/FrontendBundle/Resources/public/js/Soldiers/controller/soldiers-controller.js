(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .controller('SoldiersCtrl', SoldiersCtrl);

    SoldiersCtrl.$inject = ['$scope', '$aside', 'SoldiersFactory', 'SoldiersService'];

    function SoldiersCtrl($scope, $aside, SoldiersFactory, SoldiersService) {

        $scope.timeSummary = 1;
        $scope.elapsed = 0;

        $scope.add = function () {
            // add time to counter
            $scope.$broadcast('timer-add-cd-seconds', SoldiersFactory.Private.time * $scope.soldier.Private.amount);
            SoldiersFactory.addToQueue({
                amount: $scope.soldier.Private.amount,
                type: 'private'
            }).then(function(){
                SoldiersFactory.setTimeSummary(SoldiersFactory.Private.time * $scope.soldier.Private.amount);
            })
        };
        $scope.$on('timer-tick', function(event, data) {
            if($scope.elapsed == 0){
                SoldiersFactory.Private.timeSummary = 1;
            }
            $scope.elapsed = data.millis / 1000;
            $scope.timeSummary = SoldiersFactory.getTimeSummary();
        });

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

    }

})();
