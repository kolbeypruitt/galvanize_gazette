angular.module('stories', ['ngRoute'])
  .controller('HomeController', function(){
    
  })
  .controller('GuitarController', function($http,$scope){
    $http.get('/api/v1/stories').then(function (response) {
      $scope.stories = response.data
    })
    
  })
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/home.html',
      controller: 'HomeController'
    })
    .when('/stories', {
      templateUrl: '/partials/stories.html',
      controller: 'GuitarController'
    })
    .otherwise('/stories')
    $locationProvider.html5Mode(true)
  })