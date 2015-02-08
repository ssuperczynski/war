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
                time: 6 * 3,
                amount: 1,
                soldiers: 1,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/private.png'
            },
            Corporal: {
                name: 'Corporal',
                time: 6,
                amount: 1,
                soldiers: 1,
                timeSummary: 1,
                food: '0.4/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/corporal.png'
            },
            Sergeant: {
                name: 'Sergeant',
                time: 6,
                amount: 1,
                soldiers: 1,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/sergeant.png'
            },
            Warrant_Officer: {
                name: 'Warrant Officer',
                time: 6,
                amount: 1,
                soldiers: 1,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/warrant-officer.png'
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
            soldiers[params.range]['queue'].push({
                amount: params.amount,
                queued: true
            });
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        return {
            addToQueue: addToQueue,
            Private: soldiers.Private,
            Corporal: soldiers.Corporal,
            Sergeant: soldiers.Sergeant,
            Warrant_Officer: soldiers.Warrant_Officer,
            setTimeSummary: setTimeSummary
        };

    }

})();
