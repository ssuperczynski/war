(function(){
    'use strict';

    angular.module('war.dashboard', [
        'war',
        'ui.bootstrap'
    ]);

    angular.module('war.soldiers', [
        'war',
        'ui.bootstrap',
        'timer'
    ]);

    angular.module('war.buildings', [
        'war',
        'ui.bootstrap',
        'timer'
    ]);

    angular.module('war.map', [
        'war',
        'ui.bootstrap'
    ]);

    angular.module('war.navbar', [
        'war',
        'ui.bootstrap'
    ]);

    var app = angular.module('war', [
        'configuration',
        'ui.bootstrap',
        'ngAside',

        'war.dashboard',
        'war.soldiers',
        'war.buildings',
        'war.map',
        'war.navbar'
    ]);

    app.config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

}());
