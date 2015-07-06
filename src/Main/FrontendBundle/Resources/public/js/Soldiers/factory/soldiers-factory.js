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
                interval: 0,
                food: '0.3/h',
                queue: 0,
                imgPath: 'bundles/mainfrontend/images/private.png'
            },
            Corporal: {
                name: 'Corporal',
                time: 8,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                interval: 0,
                food: '0.4/h',
                queue: 0,
                imgPath: 'bundles/mainfrontend/images/corporal.png'
            },
            Sergeant: {
                name: 'Sergeant',
                time: 10,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                interval: 0,
                food: '0.3/h',
                queue: 0,
                imgPath: 'bundles/mainfrontend/images/sergeant.png'
            },
            Warrant_Officer: {
                name: 'Warrant Officer',
                time: 12,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                interval: 0,
                food: '0.3/h',
                queue: 0,
                imgPath: 'bundles/mainfrontend/images/warrant-officer.png'
            }
        };

        function setTimeSummary(range, incr) {
            soldiers[range]['timeSummary'] = soldiers[range]['timeSummary'] + incr;
        }

        function addToQueue(params) {
            soldiers[params.range].queue += params.amount;
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        function init() {
            return $http.get(BASE_END_POINT + '/soldiers/data', {cache: true})
                .then(function (response) {
                    angular.forEach(response.data.amount, function (v, k) {
                        soldiers[k].soldiers = v;
                    });
                    angular.forEach(response.data.interval, function (v, k) {
                        soldiers[k].interval = v;
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
