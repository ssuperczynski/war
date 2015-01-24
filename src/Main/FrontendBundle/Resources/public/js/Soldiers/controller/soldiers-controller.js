(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .controller('SoldiersCtrl', SoldiersCtrl);

    SoldiersCtrl.$inject = ['$scope', '$aside'];

    function SoldiersCtrl($scope, $aside) {
        $scope.openAside = function(position) {
            $aside.open({
                templateUrl: 'partials/soldiers-serial.html',
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
