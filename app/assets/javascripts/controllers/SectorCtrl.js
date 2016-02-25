evergreen.controller('SectorCtrl',
  ['$scope', 'Restangular', 'sectors', 'sectorService', 'flashService',
  function($scope, Restangular, sectors, sectorService, flashService) {

    $scope.init = function() {
      sectorService.setSectors(sectors);
      $scope.setSectorVars();
    };

    $scope.setSectorVars = function() {
      $scope.addSectorForm = false;
      $scope.editSectorForm = {};
      $scope.addSector = {};
      $scope.editSector = {};
      $scope.sectors = sectorService.getSectors();
      $scope.setTotals();
    };

    $scope.createSector = function(sector) {
      Restangular.all('sectors').post(sector)
        .then( function(response) {
          sectorService.addSector(response);
          $scope.setSectorVars();
          flashService.updateFlash('Sector', 'create', true);
        }, function() {
          $scope.setSectorVars();
          flashService.updateFlash('Sector', 'create', false);
        });
    };

    $scope.destroySector = function(sector) {
      sector.remove().then( function() {
        sectorService.remove(sector);
        $scope.setSectorVars();
        flashService.updateFlash('Sector', 'destroy', true);
      }, flashService.updateFlash('Sector', 'destroy', false));
    };

    $scope.updateSector = function(sector) {
      Restangular.one('sectors', sector.id).patch( sector )
        .then(function(response) {
          sectorService.remove(sector);
          sectorService.addSector(response);
          sectorService.sortSectors();
          $scope.setSectorVars();
          flashService.updateFlash('Sector', 'update', true);
        }, function() {
          $scope.setSectorVars();
          flashService.updateFlash('Sector', 'update', false);
        });
    };

    $scope.setTotals = function() {
      angular.forEach($scope.sectors, function(sector) {
        totalVars = sectorService.getTotalVars(sector);
        sector["totalCollections"] = totalVars[0];
        sector["totalResources"] = totalVars[1];
      });
    };

    $scope.toggleAddForm = function() {
      $scope.addSectorForm = !$scope.addSectorForm;
    };

    $scope.toggleEditForm = function(sector) {
      $scope.editSectorForm[sector.id] = true;
      $scope.editSector = sector;
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