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
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/private.png'
            },
            Corporal: {
                name: 'Corporal',
                time: 8,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.4/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/corporal.png'
            },
            Sergeant: {
                name: 'Sergeant',
                time: 10,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/sergeant.png'
            },
            Warrant_Officer: {
                name: 'Warrant Officer',
                time: 12,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/warrant-officer.png'
            }
        };


        function setTimeSummary(range, incr) {
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
            console.log(soldiers);
            soldiers[params.range]['queue'].push({
                amount: params.amount,
                queued: true,
                range: params.range
            });
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        function init() {
            return $http.get(BASE_END_POINT + '/soldiers/data')
                .then(function (response) {
                    angular.forEach(response.data, function (v, k) {
                        soldiers[k].soldiers = v.soldiers;
                    });
                });
        }

        return {
            init: init,
            soldiers: soldiers,
            addToQueue: addToQueue,
            Private: soldiers.Private,
            Corporal: soldiers.Corporal,
            Sergeant: soldiers.Sergeant,
            Warrant_Officer: soldiers.Warrant_Officer,
            setTimeSummary: setTimeSummary
        };

    }

})();
