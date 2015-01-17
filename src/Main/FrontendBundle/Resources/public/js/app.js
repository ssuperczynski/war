(function(){
    'use strict';

    angular.module('war.dashboard', []);

    var app = angular.module('war', [
        'configuration',
        'war.dashboard'
    ]);

    app.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

})();
