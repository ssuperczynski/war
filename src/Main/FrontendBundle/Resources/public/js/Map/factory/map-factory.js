(function () {
    'use strict';

    angular
        .module('war.map')
        .factory('MapFactory', MapFactory);

    MapFactory.$inject = ['$http', 'BASE_END_POINT'];

    function MapFactory($http, BASE_END_POINT) {

        function getUsers() {
            return $http.get(BASE_END_POINT + '/map/users');
        }

        function getData(id) {
            return $http.get(BASE_END_POINT + '/map/user/' + id, {cache: true});
        }

        return {
            getUsers: getUsers,
            getData: getData
        };
    }

})();
