(function () {
    'use strict';

    angular
        .module('war.admin-dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', '$firebase', '$timeout'];

    function DashboardCtrl($scope, $firebase, $timeout) {
        var ref = new Firebase("https://amber-heat-9116.firebaseio.com/");
        // create an AngularFire reference to the data
        var sync = $firebase(ref);
        // download the data into a local object
        $scope.data = sync.$asObject();
        $scope.style = {};

        $scope.getArray = function () {
            return $scope.data.data.users;
        };

        $scope.loading = false;
        $scope.showDownload = false;
        $scope.exportReport = function () {
            $scope.loading = true;
            $timeout(function () {
                $scope.showDownload = true;
                $scope.loading = false;
            }, 1000);

        };

        $scope.$watchCollection('data', function (newVal, oldVal) {
            if (newVal !== oldVal && typeof oldVal.data !== 'undefined') {
                for (var i = 1; i <= 3; i++) {
                    // add next for and loop through soldiers array to eliminate duplicates
                    if (oldVal.data.users[i]['Private'] !== newVal.data.users[i]['Private']) {
                        $scope.style = {};
                        $scope.style[i + 'Private'] = true;
                    }
                    if (oldVal.data.users[i]['Corporal'] !== newVal.data.users[i]['Corporal']) {
                        $scope.style = {};
                        $scope.style[i + 'Corporal'] = true;
                    }
                    if (oldVal.data.users[i]['Sergeant'] !== newVal.data.users[i]['Sergeant']) {
                        $scope.style = {};
                        $scope.style[i + 'Sergeant'] = true;
                    }
                    if (oldVal.data.users[i]['Warrant_Officer'] !== newVal.data.users[i]['Warrant_Officer']) {
                        $scope.style = {};
                        $scope.style[i + 'Warrant_Officer'] = true;
                    }
                }

            }

        });
    }

})();
