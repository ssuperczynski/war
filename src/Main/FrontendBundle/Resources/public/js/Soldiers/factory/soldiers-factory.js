(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .factory('SoldiersFactory', SoldiersFactory);

    SoldiersFactory.$inject = ['$http', 'BASE_END_POINT'];

    function SoldiersFactory($http, BASE_END_POINT) {

        var Private = {
            time: 6,
            food: 0.3,
            amount: 1,
            soldiersTotal: 1
        };

        function addToQueue(params) {
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        return {
            addToQueue  : addToQueue,
            Private     : Private
        };

    }

})();
