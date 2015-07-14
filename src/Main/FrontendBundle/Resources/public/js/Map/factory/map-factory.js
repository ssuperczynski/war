(function () {
    'use strict';

    angular
        .module('war.map')
        .factory('MapFactory', MapFactory);

    MapFactory.$inject = ['$http', 'BASE_END_POINT'];

    function MapFactory($http, BASE_END_POINT) {

        var self = this;

        self.getUsers = function () {
            return $http.get(BASE_END_POINT + '/map/users');
        };

        self.getData = function (id) {
            return $http.get(BASE_END_POINT + '/map/user/' + id, {cache: true});
        };

        self.sendSpy = function (id) {
            return $http.post(BASE_END_POINT + '/map/spy', {id: id, distance: 20});
        };

        return self;
    }

}());
