evergreen.controller('ResourceCtrl',
  ['$scope', 'Restangular', 'current_user', 'resources', 'resourceService', 'flashService',
  function($scope, Restangular, current_user, resources, resourceService, flashService) {

    $scope.init = function() {
      resourceService.setResources(resources);
      $scope.current_user = current_user;
      $scope.setResourceVars();
    };

    $scope.setResourceVars = function() {
      $scope.resources = resourceService.getResources();
      $scope.owner = $scope.resources[0].owner_username;
      $scope.owner_id = $scope.resources[0].owner_id;
    };

    $scope.destroyResource = function(resource, userID) {
      Restangular.one('users', userID)
                 .one('resources', resource.id)
                 .remove().then( function() {
        resourceService.remove(resource);
        $scope.setResourceVars();
        flashService.updateFlash('Resource', 'destroy', true);
      });
    };

    $scope.toggleApproval = function(resource) {
      obj = {};
      obj["approved"] = !resource.approved;
      Restangular.one('resources', resource.id).patch( obj )
        .then(function(response) {
          resourceService.toggleApproval(resource);
          $scope.setResourceVars();
          flashService.updateFlash('Resource', 'update', true);
        }, function() {
          $scope.setResourceVars();
          flashService.updateFlash('Resource', 'update', false);
        });
    };

    $scope.userAdmin = function() {
      return ($scope.current_user.user_type === "admin");
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