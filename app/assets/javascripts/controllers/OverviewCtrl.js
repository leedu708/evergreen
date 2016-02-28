evergreen.controller('OverviewCtrl',
  ['$scope', 'Restangular', 'users', 'sectors', 'sectorService', 'userService',
  function($scope, Restangular, users, sectors, sectorService, userService) {

    $scope.init = function() {
      userService.setUsers(users);
      $scope.sectors = sectors;
      $scope.setOverviewVars();      
    };

    $scope.setOverviewVars = function() {
      $scope.topContributors  = userService.getTopContributors(3);
      $scope.top3Prolific     = userService.getMostProlific(3);
      $scope.totalCategories  = $scope.getTotalCategories();
      $scope.totalCollections = $scope.getTotalCollections();
      $scope.totalResources   = $scope.getTotalResources();
      $scope.totalSectors     = sectors.length;
      $scope.totalUsers       = users.length;
    };

    $scope.getTotalCategories = function() {
      var sum = 0;
      angular.forEach($scope.sectors, function(sector) {
        sum += sector.category_total;
      })
      return sum;
    };

    $scope.getTotalCollections = function() {
      var sum = 0;
      angular.forEach($scope.sectors, function(sector) {
        sum += sector.collection_total;
      });
      return sum;
    };

    $scope.getTotalResources = function() {
      var sum = 0;
      angular.forEach($scope.sectors, function(sector) {
        sum += sector.resource_total;
      });
      return sum;
    };

    $scope.init();

  }]);