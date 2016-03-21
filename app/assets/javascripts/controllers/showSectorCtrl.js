evergreen.controller('showSectorCtrl',
  ['$scope', 'sector',
  function($scope, sector) {

    $scope.init = function() {
      $scope.sectorName = sector.title;
      $scope.categories = sector.categories;
    };

    $scope.checkLastCollection = function(category, collection) {
      index = category.collections.length - 1;
      return !!(category.collections[index] === collection)
    };

    $scope.init();

  }]);