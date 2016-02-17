evergreen.factory('categoryService',
  [function() {

    var categoryService = {};

    categoryService.categories = [];

    categoryService.setCategories = function(categories) {
      categoryService.categories = categories;
      this.sortCategories();
    };

    categoryService.getTotalResources = function(category) {
      var sum = 0;
      angular.forEach(category.collections, function(collection) {
        sum += collection.resources.length;
      });
      return sum;
    };

    categoryService.sortCategories = function() {
      categoryService.categories.sort(function(a, b) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        };
      });
    };

    categoryService.getCategories = function() {
      return this.categories;
    };

    return categoryService;

  }]);