evergreen.controller('ResourceCtrl',
  ['$scope', 'Restangular', 'resources', 'resourceService',
  function($scope, Restangular, resources, resourceService) {

    $scope.init = function() {
      resourceService.setResources(resources);
      $scope.setResourceVars();
    };

    $scope.setResourceVars = function() {
      $scope.resources = resourceService.getResources();
    };

    $scope.init();

  }]);