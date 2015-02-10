(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @description
     *
     */
    angular
        .module('war.soldiers')
        .directive('soldierGlobal', soldierGlobal);

    soldierGlobal.$inject = ['SoldiersFactory'];

    function soldierGlobal() {
        return {
            restrict: 'E',
            controller: function ($scope, SoldiersFactory) {
                $scope.time = 0;
                angular.forEach(SoldiersFactory.soldiers, function (value) {
                    $scope.time = $scope.time + value.timeSummary;
                });
            },
            template: '<h1></h1>'
        };
    }
})();
