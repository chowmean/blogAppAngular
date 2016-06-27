'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'usersCtrl'
        });
    }])

    .controller('usersCtrl', [function() {

    }]);