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
            // amount is modified when something change, then save new amount and timestamp
            // amount from db + ((NOW() - last modification timestamp) *  soldierCounter.factory.map[soldierCounter.factory.level])
            amount : 1000,
            factory: {
                level: 7,
                map: {
                    1: 0.1,
                    2: 0.2,
                    3: 0.3,
                    4: 0.4,
                    5: 1,
                    6: 2,
                    7: 3,
                    8: 5,
                    9: 11
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
            var interval = (soldierCounter.factory.level > 5) ? 500 : 1000;
            $interval( function() {
                soldierCounter.setCounter();
            }, interval);
        }

        init();
    }


})();
