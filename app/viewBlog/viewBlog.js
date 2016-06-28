'use strict';

angular.module('myApp.viewBlog', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewBlog', {
            templateUrl: 'viewBlog/viewBlog.html',
            controller: 'viewBlogCtrl'
        })
            .when('/categories/:categoryId/:categoryName', {
                templateUrl: "viewBlog/viewBlog.html",
                controller: 'categoryCtrl',
            });
    }])

    .controller('viewBlogCtrl', function($http,$scope,$window,toastr) {

        $scope.url='http://54.191.251.207:8085/';
        $scope.blogData={};

        $http({
            method: 'GET',
            url: baseUrl + '/blogs',
            headers: {'token': $window.localStorage.getItem('tokenData')}}
        ).success( function( data )
        {
            $scope.blogData=data;
            console.log($scope.blogData);

        })
            .error( function( data)
            {
                toastr.error('Error getting blog data', 'Error');
            });


    })
    .controller('categoryCtrl', function($http,$scope,$window,$routeParams) {

        $scope.url='http://54.191.251.207:8085/';
        $scope.blogData={};

        $http({
            method: 'GET',
            url: baseUrl + '/blogs?category_id='+$routeParams.categoryId,
            headers: {'token': $window.localStorage.getItem('tokenData')}}
        ).success( function( data )
        {
            $scope.blogData=data;
            console.log($scope.blogData)
        })
            .error( function( data)
            {
                console.log('error');
                toastr.error('Error getting category data', 'Error');
            });


    });