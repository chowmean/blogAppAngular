'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'usersCtrl'
        });
    }])

    .controller('usersCtrl', function($scope,$http,$window) {


        $scope.getUsers=function() {
            $http({
                    method: 'GET',
                    url: baseUrl + '/accounts/users',
                    headers: {'token': $window.localStorage.getItem('tokenData')}
                }
            ).success(function (data) {
                $scope.userData = data;
                console.log($scope.userData)
            })
                .error(function (data) {
                    console.log('error');
                });

        }

        $scope.getUsers();

        $scope.activate=function(userId)
        {
            $http({
                method: 'POST',
                url: baseUrl + '/accounts/activate/'+userId,
                headers: {'token': $window.localStorage.getItem('tokenData')},
                data: $scope.blogData
            }).success(function(data){
                console.log(data);
                $scope.getUsers();

            }).error(function(data){

            })
        }

        $scope.deactivate=function(userId)
        {
            $http({
                method: 'DELETE',
                url: baseUrl + '/accounts/deactivate/'+userId,
                headers: {'token': $window.localStorage.getItem('tokenData')},
                data: $scope.blogData
            }).success(function(data){
                console.log(data);
                $scope.getUsers();

            }).error(function(data){

            })

        }
    });