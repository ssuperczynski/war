(function () {
    'use strict';

    angular
        .module('war.soldiers')
        .service('SoldiersService', SoldiersService);

    SoldiersService.$inject = ['USER', 'SoldiersFactory'];

    function SoldiersService(USER, SoldiersFactory) {

        var self = this;

        //var socketRedis = new SocketRedis('http://127.0.0.1:8090');
        //socketRedis.onopen = function () {
        //    console.log('open');
        //    socketRedis.subscribe('user_' + USER, null, 'bar', function (event, data) {
        //        if (event === 'range') {
        //            SoldiersFactory[data.range].soldiers = data.amount;
        //        }
        //    });
        //};

        return self;
    }

}());

