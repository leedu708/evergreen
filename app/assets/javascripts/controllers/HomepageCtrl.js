evergreen.controller('HomepageCtrl',
  
  ['$scope', 'collections',
  function($scope, collections) {

    $scope.init = function() {
      $scope.collections = collections;
      console.log(collections);
    };

    $scope.test = "Hello";

    $scope.init();

  }]);