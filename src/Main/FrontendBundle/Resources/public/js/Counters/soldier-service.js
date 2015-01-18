(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .service('SoldierService', SoldierService);

    SoldierService.$inject = ['SoldierFactory', 'EndPointFactory', '$interval'];

    function SoldierService(SoldierFactory, EndPointFactory, $interval) {

        var soldierCounter = {
            amount: 0,
            factory: {
                level: 6
            }
        };

        function setCounter(data) {
            soldierCounter.amount = soldierCounter.amount + 1 * SoldierFactory.levels[soldierCounter.factory.level];
        }

        function getCounter() {
            return Math.round(soldierCounter.amount);
        }

        function setInitialCounters(res) {
            var now = moment(),
                last = moment(res.data.date),
                diff = now.diff(last, 's');
            soldierCounter.amount = res.data.soldier + diff * SoldierFactory.levels[soldierCounter.factory.level];
        }

        function init() {
            EndPointFactory.get()
                .then(function (res) {
                    setInitialCounters(res);
                    $interval(function () {
                        setCounter();
                    }, 1000);
                });
        }

        init();

        return {
            getCounter: getCounter
        };

    }

})();
