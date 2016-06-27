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
        $scope.blogId=$routeParams.blogID;

        $scope.getBlog=function(){
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
        });}

        $scope.getBlog();


        $scope.isAdmin = function()
        {
            if($window.localStorage.getItem('role')=='admin'){
                return true;}
            else{
                return false;}
        }

        $scope.publish=function()
        {
        console.log($scope.blogId);
            $http({
                method: 'POST',
                url: baseUrl + '/blogs/publish/'+$scope.blogId,
                headers: {'token': $window.localStorage.getItem('tokenData')},
                data: $scope.blogData
            }).success(function(data){
                $scope.getBlog();

            }).error(function(data){

            })
        }

        $scope.rejectBlog=function()
        {
        console.log($scope.blogId);
            $http({
                method: 'POST',
                url: baseUrl + '/blogs/depublish/'+$scope.blogId,
                headers: {'token': $window.localStorage.getItem('tokenData')},
                data: $scope.blogData
            }).success(function(data){
                $scope.getBlog();
            }).error(function(data){

            })
        }

    });