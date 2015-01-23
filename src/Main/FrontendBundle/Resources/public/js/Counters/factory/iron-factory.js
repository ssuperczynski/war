(function () {
    'use strict';

    angular
        .module('war.dashboard')
        .factory('IronFactory', IronFactory);

    IronFactory.$inject = ['$http', 'BASE_END_POINT'];

    function IronFactory($http, BASE_END_POINT) {

        var levels = {
            1: 0.1,
            2: 0.2,
            3: 0.3,
            4: 0.4,
            5: 1,
            6: 2,
            7: 3,
            8: 5,
            9: 11
        };

        return {
            levels: levels
        };

    }

})();
