evergreen.factory('errorService',
  [function() {

    var errorService = {};

    errorService.getInvalidsLogin = function(response) {
      var invalid = {};
      angular.forEach(response.data.errors, function(error, key) {
        invalid[key] = {};
        invalid[key]["messages"] = error;
      });
      return invalid;
    };

    errorService.getInvalids = function(response) {
      var invalid = {};
      angular.forEach(response.data, function(error, key) {
        invalid[key] = {};
        invalid[key]["messages"] = error;
      });
      return invalid;
    };

    return errorService;

  }]);