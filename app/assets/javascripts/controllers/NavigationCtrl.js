evergreen.controller('NavigationCtrl',
  ['$scope', 'sectorService',
  function($scope, sectorService) {

    $scope.init = function() {
      sectorService.getSectorAPI().then(function(response) {
          $scope.sectors = response;
          console.log($scope.sectors);
        });
    };

    $scope.init();

  }])