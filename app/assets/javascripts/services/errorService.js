evergreen.factory('errorService',
  [function() {

    var errorService = {};

    errorService.getInvalids = function(response) {
      var invalid = {};
      angular.forEach(response.data.errors, function(error, key) {
        invalid[key] = {};
        invalid[key]["messages"] = error;
      });
      return invalid;
    };

    return errorService;

  }]);