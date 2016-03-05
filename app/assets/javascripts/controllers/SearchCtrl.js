evergreen.controller('SearchCtrl',
  ['$scope', 'resources', 'resourceService',
  function($scope, resources, resourceService) {

    $scope.init = function() {
      resourceService.setResources(resources);
      $scope.resources = resourceService.getResources();
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

    $scope.init();

  }]);