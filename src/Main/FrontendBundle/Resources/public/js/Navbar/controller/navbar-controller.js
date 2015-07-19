(function () {
    'use strict';

    angular
        .module('war.navbar')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', 'USER', '$modal', 'CounterService'];

    function NavbarCtrl($scope, USER, $modal, CounterService) {

        $scope.messages = CounterService.messages;
        var socketRedis = new SocketRedis('http://127.0.0.1:8090');
        socketRedis.onopen = function () {
            socketRedis.subscribe('user_scan_' + USER, null, 'bar', function (event, data) {
                if (event === 'scan') {
                    $scope.messages.push(data);
                }
            });
        };

        $scope.open = function (id) {

            var modalInstance = $modal.open({
                templateUrl: 'navbarModal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    message: function () {
                        return $scope.messages[id];
                    }
                }
            });

        };

    }

    angular.module('war.navbar')
        .controller('ModalInstanceCtrl', function ($scope, $modalInstance, message) {

            $scope.message = message;


            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        });

}());
