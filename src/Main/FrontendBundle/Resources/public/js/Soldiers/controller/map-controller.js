(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .controller('SoldiersCtrl', SoldiersCtrl);

    SoldiersCtrl.$inject = ['$scope', '$aside', 'SoldiersFactory', 'SoldiersService'];

    function SoldiersCtrl($scope, $aside, SoldiersFactory, SoldiersService) {


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
