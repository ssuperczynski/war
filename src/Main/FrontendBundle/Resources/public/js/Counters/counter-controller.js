(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .controller('CountersCtrl', CountersCtrl);

    CountersCtrl.$inject = ['$scope', '$interval', 'EndPointFactory', 'SoldierFactory'];

    function CountersCtrl($scope, $interval, EndPointFactory, SoldierFactory) {

        $scope.soldierCounter = function () {
            return soldierCounter.getCounter();
        };

        var soldierCounter = {
            amount: 0,
            factory: {
                level: 6
            },
            getCounter: function () {
                return Math.round(this.amount);
            },
            setCounter: function (data) {
                this.amount = this.amount + 1 * SoldierFactory.levels[soldierCounter.factory.level];
            }
        };

        function init() {
            EndPointFactory.get()
                .then(function (res) {
                    setInitialCounters(res);
                    $interval(function () {
                        soldierCounter.setCounter();
                    }, 1000);
                });
        }

        function setInitialCounters(res) {
            // soldierCounter.amount =
            // amount from db + ((NOW() - last modification timestamp) *  soldierCounter.factory.map[soldierCounter.factory.level])
            var now = moment(),
                last = moment(res.data.date),
                diff = now.diff(last, 's');
            soldierCounter.amount = res.data.soldier + diff * SoldierFactory.levels[soldierCounter.factory.level];
        }

        init();
    }

})();

