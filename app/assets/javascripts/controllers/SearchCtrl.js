evergreen.controller('SearchCtrl',
  ['$scope', '$rootScope', '$stateParams', 'Restangular', 'resourceService',
  function($scope, $rootScope, $stateParams, Restangular, resourceService) {

    $scope.editorEnabled = false;

    $scope.enableEditor = function() {
      $scope.editorEnabled ^= true;
    };

    $scope.setResources = function() {
      $scope.searchText = "";
      $scope.enableEditor();
      $scope.resources = resourceService.getResources();
      $scope.setResultAgreement();
    };

    $scope.getSearch = function(query) {
      resourceService.getSearch(query)
        .then(function(response) {
          console.log($scope.query);
          resourceService.setResources(response); 
          $scope.setResources();
        });               
    };

    $scope.setResultAgreement = function() {
      if ($scope.resources.length === 1) {
        $scope.resulted = "result";
      } else {
        $scope.resulted = "results";
      };
    };

    $scope.toggleSort = function(column) {
      if (column === $scope.sort) {
        $scope.sortDescending ^= true;
      } else {
        $scope.sort = column;
        $scope.sortDescending = false;
      };
    };

    $scope.sortIcon = function(column) {
      if ($scope.sort === column) {
        return $scope.sortDescending
          ? 'fa fa-chevron-up fa-1x'
          : 'fa fa-chevron-down fa-1x';
      };
    };

  }]);