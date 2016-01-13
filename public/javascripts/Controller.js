angular.module('myApp', ['ngRoute'])
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
  .controller('ShowController', function($scope, $http, $routeParams) {    
    $http.get('/api/v1/stories/' + $routeParams.id).then(function (response) {
      $scope.story = response.data;
    })

    $scope.postOpinion = function () {
      var opinion = { opinion: this.story.opinion};
      $scope.story.opinion = null;
      return $http.post('/api/v1/stories/' + $routeParams.id, opinion );
    }
  })
  .config(function ($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/stories/:id', {   
        controller: 'ShowController', 
        templateUrl:'/partials/show.html'
      })
      .when('/stories', {
        templateUrl: '/partials/stories.html',
        controller: 'StoryController'
      })
      .otherwise({
        redirectTo: '/stories'
      }
    )
    $locationProvider.html5Mode(true)
  }
)