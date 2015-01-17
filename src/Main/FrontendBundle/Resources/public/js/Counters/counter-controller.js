(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .controller('CountersCtrl', CountersCtrl);

    CountersCtrl.$inject = ['$scope', '$interval'];

    function CountersCtrl($scope, $interval) {

        $scope.soldierCounter = function () {
            return soldierCounter.getCounter();
        };

        var soldierCounter = {
            amount : 1000,
            factory: {
                level: 4,
                map: {
                    1: 0.1,
                    2: 0.2,
                    3: 0.3,
                    4: 0.4
                }

            },
            getCounter: function() {
                return Math.round(this.amount);
            },
            setCounter: function(val) {
                this.amount = this.amount + 1 * soldierCounter.factory.map[soldierCounter.factory.level];
            }
        };

        function init() {
            $interval( function() {
                soldierCounter.setCounter();
            }, 1000);
        }

        init();
    }


})();
