evergreen.controller('SectorCtrl',
  ['$scope', 'sectors', 'sectorService',
  function($scope, sectors, sectorService) {

    $scope.init = function() {
      sectorService.setSectors(sectors);
      $scope.setSectorVars();
    };

    $scope.setSectorVars = function() {
      $scope.sectors = sectorService.getSectors();
      angular.forEach($scope.sectors, function(sector) {
        totalResources = sectorService.getTotalResources(sector);
        sector["totalResources"] = totalResources;
      });
    };

    $scope.init();

  }]);