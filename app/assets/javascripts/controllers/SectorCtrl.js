evergreen.controller('SectorCtrl',
  ['$scope', 'Restangular', 'sectors', 'sectorService',
  function($scope, Restangular, sectors, sectorService) {

    $scope.init = function() {
      sectorService.setSectors(sectors);
      $scope.setSectorVars();
    };

    $scope.setSectorVars = function() {
      $scope.addSectorForm = false;
      $scope.editSectorForm = {};
      $scope.sector = {};
      $scope.editSector = {};
      $scope.sectors = sectorService.getSectors();
      angular.forEach($scope.sectors, function(sector) {
        totalResources = sectorService.getTotalResources(sector);
        sector["totalResources"] = totalResources;
      });
    };

    $scope.createSector = function(sector) {
      Restangular.all('sectors').post(sector)
        .then( function(response) {
          sectorService.addSector(response);
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

    $scope.updateSector = function(sector) {
      Restangular.one('sectors', sector.id).patch( sector )
        .then(function(response) {
          sectorService.remove(sector);
          sectorService.addSector(response);
          sectorService.sortSectors();
          $scope.setSectorVars();
        }, function() {
          $scope.setSectorVars();
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