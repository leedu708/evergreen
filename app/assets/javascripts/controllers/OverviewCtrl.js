evergreen.controller('OverviewCtrl',
  ['$scope', 'Restangular', 'users', 'sectors', 'categories', 'collections', 'resources', 'resourceService', 'userService',
  function($scope, Restangular, users, sectors, categories, collections, resources, resourceService, userService) {

    $scope.init = function() {
      userService.setUsers(users);
      resourceService.setResources(resources);
      $scope.setOverviewVars();      
    };

    $scope.setOverviewVars = function() {
      $scope.totalUsers = users.length;
      $scope.totalSectors = sectors.length;
      $scope.totalCategories = categories.length;
      $scope.totalCollections = collections.length;
      $scope.totalResources = resources.length;
      $scope.topThree = resourceService.getTopResources(3);
      $scope.topContributors = userService.getTopContributors(3);
      $scope.top3Prolific = userService.getMostProlific(3);
    };

    $scope.init();

  }]);