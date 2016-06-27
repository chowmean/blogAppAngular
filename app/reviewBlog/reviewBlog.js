'use strict';

angular.module('myApp.reviewBlog', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/reviewBlog/:blogID/:title', {
            templateUrl: 'reviewBlog/reviewBlog.html',
            controller: 'reviewBlogCtrl'
        });
    }])

    .controller('reviewBlogCtrl',function($http,$scope,$window,$routeParams) {

        $scope.url='http://54.191.251.207:8085/';
        console.log($routeParams.blogID);
        console.log($routeParams.title);

        $http({
            method: 'GET',
            url: baseUrl + '/blogs/'+$routeParams.blogID,
            headers: {'token': $window.localStorage.getItem('tokenData')}}
        ).success( function( data )
        {
            $scope.blogData=data;
        }).error( function( data)
        {
            console.log('error');
        });
        
        
        

    });