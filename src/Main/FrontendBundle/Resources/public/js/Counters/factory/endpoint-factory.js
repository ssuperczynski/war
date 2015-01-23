(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .factory('EndPointFactory', EndPointFactory);

    EndPointFactory.$inject = ['$http', 'BASE_END_POINT'];

    function EndPointFactory($http, BASE_END_POINT) {


        function get() {
            return $http.get(BASE_END_POINT + '/points');
        }

        return {
            get: get
        };

    }

})();
