evergreen.controller('editResourceCtrl',
  ['$scope', '$location', 'Restangular', 'resource', 'collections', 'flashService',
  function($scope, $location, Restangular, resource, collections, flashService) {

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
        }, flashService.updateFlash('Resource', 'update', false));
    };

    $scope.destroyResource = function(resource) {
      Restangular.one('users', $scope.resource.owner_id)
                 .one('resources', resource.id)
                 .remove().then( function() {
        $location.path( "/user/" + $scope.resource.owner_id + "/resources" );
        flashService.updateFlash('Resource', 'destroy', true);
      }, flashService.updateFlash('Resource', 'destroy', false));
    };

    $scope.init();

  }]);