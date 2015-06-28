(function(){
    'use strict';

    angular.module('war.admin-dashboard', [
        'war',
        'ui.bootstrap',
        'ngSanitize',
        'ngCsv'
    ]);


    var app = angular.module('war', [
        'configuration',
        'ui.bootstrap',
        'ngSanitize',
        'ngCsv',

        'war.admin-dashboard'
    ]);

    app.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

})();
