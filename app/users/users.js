'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'usersCtrl'
        });
    }])

    .controller('usersCtrl', function($scope,$http,$window,toastr) {


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
                    toastr.error('Error getting user data', 'Users');
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
                toastr.info('User Activated Successfully.', 'Activation');
                $scope.getUsers();


            }).error(function(data){
                toastr.error('Activation Failed', 'Activation');
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
                toastr.info('User Restricted Successfully.', 'Restriction');
                $scope.getUsers();

            }).error(function(data){
                toastr.error('Restriction Operation Failed', 'Restriction');
            })

        }
    });