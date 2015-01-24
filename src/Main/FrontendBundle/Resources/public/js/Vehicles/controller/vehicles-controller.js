(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .controller('VehiclesCtrl', VehiclesCtrl);

    VehiclesCtrl.$inject = ['$scope', '$aside'];

    function VehiclesCtrl($scope, $aside) {
        $scope.openAside = function(position) {
            $aside.open({
                templateUrl: 'partials/Vehicles/jeep.html',
                placement: position,
                size: 'lg',
                backdrop: false,
                controller: function($scope, $modalInstance) {
                    $scope.ok = function(e) {
                        $modalInstance.close();
                        e.stopPropagation();
                    };
                    $scope.cancel = function(e) {
                        $modalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            })
        }
    }

})();
