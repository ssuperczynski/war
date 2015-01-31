(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .service('SoldiersService', SoldiersService);

    SoldiersService.$inject = ['SoldiersFactory'];

    function SoldiersService(SoldiersFactory) {}

})();

