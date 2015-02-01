(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .factory('SoldiersFactory', SoldiersFactory);

    SoldiersFactory.$inject = ['$http', 'BASE_END_POINT'];

    function SoldiersFactory($http, BASE_END_POINT) {

        var soldiers = {
                Private: {
                    name: 'Private',
                    time: 6,
                    amount: 1,
                    soldiers: 1,
                    timeSummary: 1,
                    food: '0.3/h',
                    imgPath: 'bundles/mainfrontend/images/private.png'
                }
            };


        function setTimeSummary (range, incr) {
            soldiers[range]['timeSummary'] = soldiers[range]['timeSummary'] + incr;
        }

        //function getSoldiers () {
        //    return Private.soldiers;
        //}
        //
        //function setSoldiers (incr) {
        //    Private.soldiers = Private.soldiers + incr;
        //}

        function addToQueue(params) {
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        return {
            addToQueue: addToQueue,
            Private: soldiers.Private,
            setTimeSummary: setTimeSummary
        };

    }

})();
