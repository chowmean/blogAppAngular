'use strict';

angular.module('myApp.writeBlog', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/writeBlog', {
            templateUrl: 'writeBlog/writeBlog.html',
            controller: 'writeBlogCtrl'
        });
    }])

    .controller('writeBlogCtrl', function($http,$scope,$window,toastr) {

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
                console.log('Error loading categories');
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
                console.log(data.blog_id);
                console.log('blog created');
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
                    toastr.error('Error in creating blog.', 'Error');
                });
        }

        
    });