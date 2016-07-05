'use strict';
var baseUrl = "http://54.191.251.207:8085/api";
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.viewBlog',
    'myApp.reviewBlog',
    'myApp.dashboard',
    'myApp.writeBlog',
    'myApp.users',
    'ngAnimate',
    'toastr'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');


    $httpProvider.interceptors.push(function($q) {
        return {
            'request': function(config) {
                $('#processing').show();
                return config;
            },

            'response': function(response) {
                $('#processing').hide();
                return response;
            }
        };
    });

    $routeProvider
        .otherwise({
            redirectTo: '/viewBlog'
        });
}]).factory('myService', function($window) {
    return {
        isAdmin: function() {
            if ($window.localStorage.getItem('role') == 'admin' && $window.localStorage.getItem('tokenData') !== null) {
                return true;
            } else {
                return false;
            }
        }
    };
}).
controller('loginController', function($scope, $window, $location, $http, toastr /*,ngToast*/ ) {

    $scope.user = {
        username: '',
        password: ''
    };

    $scope.newUser = {
        email: '',
        username: '',
        password: ''
    };

    $scope.checkLogin = function() {
        var a = $window.localStorage.getItem('tokenData');
        if (a) {
            return true;
        } else {
            return false;
        }
    };

    $scope.checkAdmin = function() {
        var a = $window.localStorage.getItem('role');
        if (a == 'admin') {
            return true;
        } else {
            return false;
        }
    };


    $scope.loadCat = function() {


        $http({
                method: 'GET',
                url: baseUrl + '/blogs/categories',
                headers: {
                    'token': $window.localStorage.getItem('tokenData')
                }
            }).success(function(data) {
                $scope.categories = data;


            })
            .error(function(data) {
                toastr.error('Error loading categories', 'Category');
            });

    };

    if ($scope.checkLogin() === true) {
        $scope.loadCat();
    }

    $scope.login = function() {
        $http.post(baseUrl + '/accounts/login', $scope.user)
            .then(function(data) {
                $window.localStorage.setItem('tokenData', data.data.token);
                $window.localStorage.setItem('role', data.data.data[0].role);
                $window.localStorage.setItem('user_id', data.data.data[0].user_id);
                angular.element('#loginModal').modal('hide');
                $window.location.href = '#';
                $scope.loadCat();
                toastr.info('You are Logged In Succesfully.', 'Logged In');
                //ngToast.create('Login Successfull');
            }, function() {

                toastr.error('Wrong username password.', 'Error');
            });
    };




    $scope.register = function() {
        $http.post(baseUrl + '/accounts/register', $scope.newUser)
            .then(function(data) {
                angular.element('#myModal').modal('hide');
                toastr.info('Registered Succesfully.', 'Registration');

            }, function() {
                toastr.error('Error in registration. Please try again.', 'Error');
            });
    };



    $scope.logout = function() {
        $http({
                method: 'POST',
                url: baseUrl + '/accounts/logout',
                headers: {
                    'token': $window.localStorage.getItem('tokenData')
                }
            }).success(function(data) {
                $window.localStorage.removeItem('tokenData');
                $window.localStorage.removeItem('role');
                $window.localStorage.removeItem('user_id');
                toastr.info('Logged Out Succesfully.', 'Logout');

            })
            .error(function(data) {
                toastr.error('Error in Logging out', 'Error');
            });
    };

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});
