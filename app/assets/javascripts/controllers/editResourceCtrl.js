evergreen.controller('editResourceCtrl',
  ['$scope', '$location', 'Restangular', 'resource', 'collections', 'errorService', 'flashService',
  function($scope, $location, Restangular, resource, collections, errorService, flashService) {

    $scope.init = function() {
      $scope.resource = resource;
      $scope.collections = collections;
      $scope.setEditResourceVars($scope.resource);
    };

    $scope.setEditResourceVars = function(resource) {
      $scope.editResource = {};
      $scope.editResource["id"] = resource.id;
      $scope.editResource["collection_id"] = resource.collection_id;
      $scope.editResource["title"] = resource.title;
      $scope.editResource["description"] = resource.description;
      $scope.editResource["url"] = resource.url;
    };

    $scope.updateResource = function(resource) {
      Restangular.one('resources', resource.id).patch( resource )
        .then(function(response) {
          $location.path( "/user/" + $scope.resource.owner_id + "/resources" );
          flashService.updateFlash('Resource', 'update', true);
        }, function(response) {
          flashService.updateFlash('Resource', 'update', false);
          $scope.invalid = errorService.getInvalids(response);
        });
    };

    $scope.destroyResource = function(resource) {
      Restangular.one('users', $scope.resource.owner_id)
                 .one('resources', resource.id)
                 .remove().then( function() {
        $location.path( "/user/" + $scope.resource.owner_id + "/resources" );
        flashService.updateFlash('Resource', 'destroy', true);
      }, flashService.updateFlash('Resource', 'destroy', false));
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