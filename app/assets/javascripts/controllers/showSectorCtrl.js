evergreen.controller('showSectorCtrl',
  ['$scope', 'sector',
  function($scope, sector) {

    $scope.init = function() {
      $scope.sectorName = sector.title;
      $scope.categories = sector.categories;
    };

    $scope.init();

  }]);