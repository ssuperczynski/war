(function(){
    'use strict';

    angular.module('war.admin-dashboard', [
        'war',
        'ui.bootstrap',
        'firebase',
        'ngSanitize',
        'ngCsv',
    ]);


    var app = angular.module('war', [
        'configuration',
        'ui.bootstrap',
        'firebase',
        'ngSanitize',
        'ngCsv',

        'war.admin-dashboard'
    ]);

    app.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

})();
