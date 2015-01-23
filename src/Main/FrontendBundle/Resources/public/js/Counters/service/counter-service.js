(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .service('CounterService', CounterService);

    CounterService.$inject = ['SoldierFactory', 'ConcreteFactory', 'EndPointFactory', '$interval'];

    function CounterService(SoldierFactory, ConcreteFactory, EndPointFactory, $interval) {

        /**
         * Soldier
         * @type {{amount: number, factory: {level: number}}}
         */
        var soldierCounter = {
            amount: 0,
            factory: {
                level: 6
            }
        };

        function setSoldierCounter() {
            soldierCounter.amount = soldierCounter.amount + 1 * SoldierFactory.levels[soldierCounter.factory.level];
        }

        function getSoldierCounter() {
            return Math.round(soldierCounter.amount);
        }

        /**
         * Concrete
         * @type {{amount: number, factory: {level: number}}}
         */
        var concreteCounter = {
            amount: 0,
            factory: {
                level: 6
            }
        };

        function setConcreteCounter() {
            concreteCounter.amount = concreteCounter.amount + 1 * ConcreteFactory.levels[concreteCounter.factory.level];
        }

        function getConcreteCounter() {
            return Math.round(concreteCounter.amount);
        }

        function setInitialCounters(res) {
            var now = moment(),
                last = moment(res.data.date),
                diff = now.diff(last, 's');
            soldierCounter.amount = res.data.soldier + diff * SoldierFactory.levels[soldierCounter.factory.level];
            concreteCounter.amount = res.data.concrete + diff * ConcreteFactory.levels[concreteCounter.factory.level];
        }

        function init() {
            EndPointFactory.get()
                .then(function (res) {
                    setInitialCounters(res);
                    $interval(function () {
                        setSoldierCounter();
                        setConcreteCounter();
                    }, 1000);
                });
        }

        init();

        return {
            getSoldierCounter: getSoldierCounter,
            getConcreteCounter: getConcreteCounter
        };

    }

})();
