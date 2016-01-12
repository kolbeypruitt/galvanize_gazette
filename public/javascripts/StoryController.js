angular.module('stories', ['ngRoute'])
  .controller('HomeController', function(){
    
  })
  .controller('StoryController', function($http,$scope){
    $scope.hideForm = false;

    $http.get('/api/v1/stories').then(function (response) {
      $scope.stories = response.data;
      })

    $scope.postStory = function () {
      var story = this.story;
      $scope.story = {};
      return $http.post('/api/v1/stories', story ); 
    }
    
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/stories', {
        templateUrl: '/partials/stories.html',
        controller: 'StoryController'
      })
      .otherwise({
        redirectTo: '/stories'
      }
    )
    $locationProvider.html5Mode(true)
  })