(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .service('SoldiersService', SoldiersService);

    SoldiersService.$inject = ['$interval', 'SoldiersFactory'];

    function SoldiersService($interval, SoldiersFactory) {

        var elapsed = {
            amount: SoldiersFactory.Private.soldiersTotal * SoldiersFactory.Private.time
        };

        function getElapsed () {
            return elapsed.amount;
        }

        function getTotal  () {
            return SoldiersFactory.Private.soldiersTotal * SoldiersFactory.Private.time;
        }

        function setElapsed () {
            elapsed.amount = elapsed.amount - 1;
        }

        function addSoldiers (amount) {
            SoldiersFactory.Private.soldiersTotal = SoldiersFactory.Private.soldiersTotal + amount;
        }

        return {
            getElapsed : getElapsed,
            setElapsed : setElapsed,
            addSoldiers:addSoldiers,
            getTotal   :getTotal
        };
    }

})();

