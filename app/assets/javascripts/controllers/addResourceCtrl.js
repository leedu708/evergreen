evergreen.controller('addResourceCtrl',
  ['$scope', '$location', 'Restangular', 'current_user', 'collections', 'flashService',
  function($scope, $location, Restangular, current_user, collections, flashService) {

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
        }, flashService.updateFlash('Resource', 'create', false));
    };

    $scope.init();

  }]);