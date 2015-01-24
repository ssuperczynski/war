(function(){
    'use strict';

    angular.module('war.dashboard', [
        'war',
        'ui.bootstrap'
    ]);

    angular.module('war.soldiers', [
        'war',
        'ui.bootstrap'
    ]);

    var app = angular.module('war', [
        'configuration',
        'ui.bootstrap',
        'ngAside',

        'war.dashboard',
        'war.soldiers'
    ]);

    app.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

})();
