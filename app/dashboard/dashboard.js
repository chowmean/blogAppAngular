'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', function($http,$scope,$window) {
        $http({
                method: 'GET',
                url: baseUrl + '/accounts/users',
                headers: {'token': $window.localStorage.getItem('tokenData')}
            }
        ).success(function (data) {
            $scope.userData = data;
            var as=$($scope.userData).filter(function (i,n){return n.active===1});
            $scope.total_users=$scope.userData.length;
            $scope.total_active_users=as.length;
            $scope.total_inactive_users=$scope.userData.length - as.length;

        })
            .error(function (data) {
                console.log('error');
            });



        $http({
            method: 'GET',
            url: baseUrl + '/blogs',
            headers: {'token': $window.localStorage.getItem('tokenData')}}
        ).success( function( data )
        {
            $scope.blogData = data;
            var as=$($scope.blogData).filter(function (i,n){return n.published===1});
            $scope.total_blogs=$scope.blogData.length;
            $scope.total_published_blogs=as.length;
            $scope.total_unpublished_blogs=$scope.blogData.length - as.length;
        })
            .error( function( data)
            {
                console.log('error');
            });
    });