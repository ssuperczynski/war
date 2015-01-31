(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .factory('SoldiersFactory', SoldiersFactory);

    SoldiersFactory.$inject = ['$http', 'BASE_END_POINT'];

    function SoldiersFactory($http, BASE_END_POINT) {

        var Private = {
            time: 6,
            amount: 1,
            soldiers: 1,
            timeSummary: 1
        };

        function getTimeSummary () {
            return Private.timeSummary;
        }

        function setTimeSummary (incr) {
            Private.timeSummary = Private.timeSummary + incr;
        }

        function getSoldiers () {
            return Private.soldiers;
        }

        function setSoldiers (incr) {
            Private.soldiers = Private.soldiers + incr;
        }

        function addToQueue(params) {
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        return {
            addToQueue: addToQueue,
            Private: Private,
            getTimeSummary: getTimeSummary,
            setTimeSummary: setTimeSummary
        };

    }

})();
