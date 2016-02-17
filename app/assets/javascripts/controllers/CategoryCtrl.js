evergreen.controller('CategoryCtrl',
  ['$scope', 'Restangular', 'categories', 'categoryService',
  function($scope, Restangular, categories, categoryService) {

    $scope.init = function() {
      categoryService.setCategories(categories);
      $scope.setCategoryVars();
    };

    $scope.setCategoryVars = function() {
      $scope.categories = categoryService.getCategories();
      angular.forEach($scope.categories, function(category) {
        totalResources = categoryService.getTotalResources(category);
        category["totalResources"] = totalResources;
      });
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