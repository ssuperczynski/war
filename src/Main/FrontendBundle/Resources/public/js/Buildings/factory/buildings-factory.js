(function () {
    'use strict';

    angular
        .module('war.buildings')
        .factory('BuildingsFactory', BuildingsFactory);

    BuildingsFactory.$inject = ['$http', 'BASE_END_POINT'];

    function BuildingsFactory($http, BASE_END_POINT) {

        var name = {
            Academy: {
                name: 'Academy',
                time: 6,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/academy.jpg'
            },
            Hangar: {
                name: 'Hangar',
                time: 8,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.4/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/hangar.jpg'
            },
            Polygon: {
                name: 'Polygon',
                time: 10,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/polygon.jpg'
            },
            Field_Hospital: {
                name: 'Field Hospital',
                time: 12,
                amount: 0,
                soldiers: 0,
                timeSummary: 1,
                food: '0.3/h',
                queue: [],
                imgPath: 'bundles/mainfrontend/images/field_hospital.jpg'
            }
        };


        function setTimeSummary(range, incr) {
            name[range]['timeSummary'] = name[range]['timeSummary'] + incr;
        }

        function addToQueue(params) {
            return $http.post(BASE_END_POINT + '/soldiers/queue', params);
        }

        function init() {
            return $http.get(BASE_END_POINT + '/soldiers/data', {cache: true})
                .then(function (response) {
                    angular.forEach(response.data, function (v, k) {
                        name[k].amount = v.amount;
                    });
                });
        }

        return {
            init: init,
            name: name,
            addToQueue: addToQueue,
            Academy: name.Academy,
            Hangar: name.Hangar,
            Polygon: name.Polygon,
            Field_Hospital: name.Field_Hospital,
            setTimeSummary: setTimeSummary
        };

    }

})();
