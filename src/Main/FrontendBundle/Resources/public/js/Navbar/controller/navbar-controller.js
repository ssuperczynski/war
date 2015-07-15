(function () {
    'use strict';

    angular
        .module('war.navbar')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', 'USER'];

    function NavbarCtrl($scope, USER) {

        $scope.messages = 0;
        var socketRedis = new SocketRedis('http://127.0.0.1:8090');
        socketRedis.onopen = function () {
            socketRedis.subscribe('user_scan_' + USER, null, 'bar', function (event, data) {
                if (event === 'scan') {
                    $scope.messages = $scope.messages + 1;
                }
            });
        };

    }

}());
