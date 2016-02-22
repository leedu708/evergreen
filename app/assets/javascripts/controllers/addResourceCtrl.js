evergreen.controller('addResourceCtrl',
  ['$scope', '$location', 'Restangular', 'current_user', 'collections',
  function($scope, $location, Restangular, current_user, collections) {

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
        });
    };

    $scope.init();

  }]);