'use strict';

angular.module('myApp.writeBlog', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/writeBlog', {
            templateUrl: 'writeBlog/writeBlog.html',
            controller: 'writeBlogCtrl'
        });
    }])

    .controller('writeBlogCtrl', function($http,$scope,$window,toastr) {


        if(!$window.localStorage.getItem('tokenData'))
        {
            $window.location.href='#';
        }
        else {

        }

        if($window.localStorage.getItem('role')=='admin')
        {
            $window.location.href='#';
        }
        $scope.url='http://54.191.251.207:8085/';
        $scope.categories={};
        $scope.blogData={};

        $http({
            method: 'GET',
            url: baseUrl + '/blogs/categories',
            headers: {'token': $window.localStorage.getItem('tokenData')}}
        ).success( function( data )
        {
            $scope.categories=data;
        })
            .error( function( data)
            {
              $scope.categories={};
            });





        $scope.addBlog=function()
        {
            $scope.blogData.user_id=$window.localStorage.getItem('user_id');
            $http({
                method: 'POST',
                url: baseUrl + '/blogs',
                headers: {'token': $window.localStorage.getItem('tokenData')},
                data: $scope.blogData
            }
            ).success( function( data )
            {
                toastr.info('Creating Blog', 'Create Blog');
                var formData = new FormData();
                formData.append('blogImage', $('input[type=file]')[0].files[0]);
                $.ajax({
                    type: 'POST',
                    headers: {
                        'token': window.localStorage.getItem('tokenData'),
                    },
                    url: baseUrl + "/blogs/images?blog_id="+data.blog_id,
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    enctype:"multipart/form-data"
                })
                    .success(function(){
                        toastr.info('Successfully created blog', 'Blog Created');
                        $window.location.href='#!viewBlog';
                    })
                    .error(function(){
                        toastr.error('Error in uploading image', 'Error');
                    });
            })
                .error( function( data)
                {
                    toastr.error('Please fill all the details. If thats not the problem server may be down', 'Error');
                });
        };


    });
