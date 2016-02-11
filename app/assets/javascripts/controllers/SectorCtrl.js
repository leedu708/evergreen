evergreen.controller('SectorCtrl',
  ['$scope', 'Restangular', 'sectors', 'sectorService',
  function($scope, Restangular, sectors, sectorService) {

    $scope.init = function() {
      sectorService.setSectors(sectors);
      $scope.setSectorVars();
    };

    $scope.setSectorVars = function() {
      $scope.addSectorForm = false;
      $scope.sector = {};
      $scope.sectors = sectorService.getSectors();
      angular.forEach($scope.sectors, function(sector) {
        totalResources = sectorService.getTotalResources(sector);
        sector["totalResources"] = totalResources;
      });
    };

    $scope.createSector = function(sector) {
      Restangular.all('sectors').post(sector)
        .then( function(response) {
          sectorService.addSector(response)
          $scope.setSectorVars();
        }, function() {
          $scope.setSectorVars();
        });
    };

    $scope.destroySector = function(sector) {
      sector.remove().then( function() {
        sectorService.remove(sector);
        $scope.setSectorVars();
      });
    };

    $scope.toggleAddForm = function() {
      $scope.addSectorForm = !$scope.addSectorForm;
    };

    $scope.init();

  }]);