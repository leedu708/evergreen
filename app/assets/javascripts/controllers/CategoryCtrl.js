evergreen.controller('CategoryCtrl',
  ['$scope', 'Restangular', 'categories', 'sectors', 'categoryService', 'flashService',
  function($scope, Restangular, categories, sectors, categoryService, flashService) {

    $scope.init = function() {
      categoryService.setCategories(categories);
      $scope.sectors = sectors;
      $scope.setCategoryVars();
    };

    $scope.setCategoryVars = function() {
      $scope.addCategoryForm = false;
      $scope.editCategoryForm = false;
      $scope.addCategory = {};
      $scope.editCategory = {};
      $scope.categories = categoryService.getCategories();
      $scope.setTotals();
    };

    $scope.createCategory = function(category) {
      Restangular.all('categories').post(category)
        .then( function(response) {
          categoryService.addCategory(response);
          $scope.setCategoryVars();
          flashService.updateFlash('Category', 'create', true);
        }, function() {
          $scope.setCategoryVars();
          flashService.updateFlash('Category', 'create', false);
        });
    };

    $scope.destroyCategory = function(category) {
      category.remove().then( function() {
        categoryService.remove(category);
        $scope.setCategoryVars();
        flashService.updateFlash('Category', 'destroy', true);
      }, flashService.updateFlash('Category', 'destroy', false));
    };

    $scope.updateCategory = function(category) {
      Restangular.one('categories', category.id).patch( category )
        .then(function(response) {
          categoryService.remove(category);
          categoryService.addCategory(category);
          categoryService.sortCategories();
          $scope.setCategoryVars();
          flashService.updateFlash('Category', 'update', true);
        }, function() {
          $scope.setCategoryVars();
          flashService.updateFlash('Category', 'update', false);
        });
    };

    $scope.setTotals = function() {
      angular.forEach($scope.categories, function(category) {
        totalResources = categoryService.getTotalResources(category);
        category["totalResources"] = totalResources;
      });
    };

    $scope.toggleAddForm = function() {
      $scope.addCategoryForm = !$scope.addCategoryForm;
    };

    $scope.toggleEditForm = function(category) {
      $scope.editCategoryForm = !$scope.editCategoryForm;
      $scope.editCategory = category;
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