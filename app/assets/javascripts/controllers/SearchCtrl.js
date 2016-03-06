evergreen.controller('SearchCtrl',
  ['$scope', '$rootScope', '$stateParams', 'resources', 'Restangular', 'resourceService',
  function($scope, $rootScope, $stateParams, resources, Restangular, resourceService) {

    $scope.init = function() {
      $scope.searchText = $stateParams["query"];
      resourceService.setResources(resources);
      $scope.resources = resourceService.getResources();
      $scope.setResultAgreement();
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

    $scope.init()

  }]);