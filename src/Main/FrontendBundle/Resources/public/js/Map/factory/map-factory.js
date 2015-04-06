(function () {
    'use strict';

    angular
        .module('war.map')
        .factory('MapFactory', MapFactory);

    MapFactory.$inject = ['$http', 'BASE_END_POINT'];

    function MapFactory($http, BASE_END_POINT) {

        return {
            getUsers: getUsers
        };

        function getUsers () {
            return $http.get(BASE_END_POINT + '/map/users');
        }
    }

})();
