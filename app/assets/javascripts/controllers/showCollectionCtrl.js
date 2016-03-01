evergreen.controller('showCollectionCtrl',
  ['$scope', 'resources', 'resourceService',
  function($scope, resources, resourceService) {

    $scope.init = function() {
      $scope.collectionName = resources[0].collection.title;
      $scope.collectionDesc = resources[0].collection.description;
      $scope.synthesis = $scope.getSynthesis();

      // using the service keeps sorting on page load consistent
      resourceService.setResources(resources);
      $scope.resources = resourceService.getResources();
    };

    $scope.getSynthesis = function() {
      var id = resources[0].collection.synthesis_id;
      return resources.filter( function(resource) {
        return resource.id == id;
      })[0];
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