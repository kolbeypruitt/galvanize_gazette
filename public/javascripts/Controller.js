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

      var words = [];
      for (var i = 0; i < $scope.story.opinions.length; i++) {
        var arr = $scope.story.opinions[i].split(' ');
        for (var j = 0; j < arr.length; j++) {
          words.push(arr[j]);
        }
      }
      var count = function(ary, classifier) {
        return ary.reduce(function(counter, item) {
          var p = (classifier || String)(item);
          counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
          return counter;
        }, {})
      }

      function cleaner(stats) {
        for (var prop in stats) {
          if (stats.hasOwnProperty(prop)) {
            if (prop.toUpperCase()=='the'.toUpperCase() ||
                prop.toUpperCase()=='a'.toUpperCase() ||
                prop.toUpperCase()=='I'.toUpperCase() ||
                prop.toUpperCase()=='it'.toUpperCase() ||
                prop.toUpperCase()=='of'.toUpperCase() ||
                prop.toUpperCase()=='not'.toUpperCase()
            ) {
              delete stats[prop];
            }
          }
        }
        return stats;
      }
      $scope.stats = cleaner(count(words));
    })

    $scope.postOpinion = function () {
      var opinion = { opinion: this.story.opinion };
      $scope.story.opinion = null;
      $http.post('/api/v1/stories/' + $routeParams.id, opinion );
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