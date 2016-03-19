evergreen.controller('HomepageCtrl',
  
  ['$scope', 'collections', 'top_collections',
  function($scope, collections, top_collections) {

    $scope.init = function() {
      $scope.collections = collections;
      $scope.top_collections = top_collections;
      console.log($scope.top_collections);
    };

    $scope.test = "Hello";

    $scope.init();

  }]);