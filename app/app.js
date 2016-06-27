'use strict';



var baseUrl="http://54.191.251.207:8085/api";
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewBlog',
  'myApp.reviewBlog',
  'myApp.version',
  'myApp.dashboard',
  'myApp.writeBlog',
  //'ngToast'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
      .otherwise({redirectTo: '/viewBlog'});
}]).factory('myService', function($window) {
  return {
    isAdmin: function() {
      if($window.localStorage.getItem('role')==admin && $window.localStorage.getItem('tokenData')!=null){
        return true;
      }
      else{
        return false;
      }
    }
  };
}).
controller('loginController', function($scope,$window,$location,$http/*,ngToast*/) {

  $scope.user=
  {
    username:'',
    password:''
  }

  $scope.newUser=
  {
    email:'',
    username:'',
    password:''
  }

  $scope.checkLogin=function()
  {
    var a=$window.localStorage.getItem('tokenData');
    if(a){
      return true;
    }
    else {
      return false;
    }
  }

  $scope.checkAdmin=function()
  {
    var a=$window.localStorage.getItem('role');
    if(a=='admin'){
      return true;
    }
    else {
      return false;
    }
  }


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


  $scope.login=function()
  {
    $http.post(baseUrl+'/accounts/login', $scope.user)
        .then( function(data)
        {
          $window.localStorage.setItem('tokenData',data.data.token);
          $window.localStorage.setItem('role',data.data.data[0].role);
          $window.localStorage.setItem('user_id',data.data.data[0].user_id);
          angular.element('#loginModal').modal('hide');
          //ngToast.create('Login Successfull');
        }, function(){
          console.log('error');
        });
  }




  $scope.register=function()
  {
    $http.post(baseUrl+'/accounts/register', $scope.newUser)
        .then( function(data)
        {
          angular.element('#myModal').modal('hide');

        }, function(){
          console.log('error');
        });
  }



  $scope.logout=function()
  {
    $http({
      method: 'POST',
      url: baseUrl + '/accounts/logout',
      headers: {'token': $window.localStorage.getItem('tokenData')}}
    ).success( function( data )
        {
          $window.localStorage.removeItem('tokenData');
          $window.localStorage.removeItem('role');
          $window.localStorage.removeItem('user_id');
        })
     .error( function( data)
        {
          console.log('error');
        });
  }

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});
