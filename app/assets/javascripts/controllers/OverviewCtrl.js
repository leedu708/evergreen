evergreen.controller('OverviewCtrl',
  ['$scope', 'Restangular', 'users', 'sectors', 'resources', 'resourceService', 'sectorService', 'userService',
  function($scope, Restangular, users, sectors, resources, resourceService, sectorService, userService) {

    $scope.init = function() {
      userService.setUsers(users);
      resourceService.setResources(resources);
      $scope.sectors = sectors;
      $scope.setOverviewVars();      
    };

    $scope.setOverviewVars = function() {
      $scope.totalUsers = users.length;
      $scope.totalSectors = sectors.length;
      $scope.totalCategories = $scope.getTotalCategories();
      $scope.totalCollections = $scope.getTotalCollections();
      $scope.totalResources = resources.length;
      $scope.topThree = resourceService.getTopResources(3);
      $scope.topContributors = userService.getTopContributors(3);
      $scope.top3Prolific = userService.getMostProlific(3);
    };

    $scope.getTotalCategories = function() {
      var sum = 0;
      angular.forEach($scope.sectors, function(sector) {
        sum += sector.categories.length;
      })
      return sum;
    };

    $scope.getTotalCollections = function() {
      var sum = 0;
      angular.forEach($scope.sectors, function(sector) {
        sum += sectorService.getTotalVars(sector)[0];
      });
      return sum;
    };

    $scope.init();

  }]);