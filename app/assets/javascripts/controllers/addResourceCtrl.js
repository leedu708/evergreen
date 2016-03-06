evergreen.controller('addResourceCtrl',
  ['$scope', '$location', 'Restangular', 'current_user', 'collections', 'errorService', 'flashService',
  function($scope, $location, Restangular, current_user, collections, errorService, flashService) {

    $scope.init = function() {
      $scope.current_user = current_user;
      $scope.collections = collections;
      $scope.addResource = {};
    };

    $scope.createResource = function(resource) {
      resource["owner_id"] = $scope.current_user.id;
      Restangular.all('resources').post(resource)
        .then( function(response) {
          $location.path( "/user/" + $scope.current_user.id + "/resources" );
          flashService.updateFlash('Resource', 'create', true);
        }, function(response) {
          flashService.updateFlash('Resource', 'create', false);
          $scope.invalid = errorService.getInvalids(response);
        });
    };

    // error functions

    $scope.errorClass = function(key) {
      if ($scope.invalid) {
        return $scope.invalid[key] ? 'has-error' : '';
      } else {
        return '';
      };
    };

    $scope.errorMessages = function(key) {
      if ($scope.invalid && $scope.invalid[key]) {
        return $scope.invalid[key]["messages"][0];
      };
    };

    $scope.init();

  }]);