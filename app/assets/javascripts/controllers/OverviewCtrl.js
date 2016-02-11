evergreen.controller('OverviewCtrl',
  ['$scope', 'Restangular', 'users', 'sectors', 'collections', 'resources', 'resourceService',
  function($scope, Restangular, users, sectors, collections, resources, resourceService) {

    $scope.init = function() {
      resourceService.setResources(resources);
      $scope.setOverviewVars();      
    };

    $scope.setOverviewVars = function() {
      $scope.totalUsers = users.length;
      $scope.totalSectors = sectors.length;
      $scope.totalCollections = collections.length;
      $scope.totalResources = resources.length;
      $scope.topThree = resourceService.getTopResources(3);
    };

    $scope.init();

  }]);