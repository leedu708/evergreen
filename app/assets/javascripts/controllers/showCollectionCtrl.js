evergreen.controller('showCollectionCtrl',
  ['$scope', 'Restangular', 'resources', 'flashService', 'resourceService', 'userService',
  function($scope, Restangular, resources, flashService, resourceService, userService) {

    $scope.init = function() {
      $scope.collectionName = resources[0].collection.title;
      $scope.collectionDesc = resources[0].collection.description;
      $scope.synthesis = $scope.getSynthesis();
      $scope.getUser();

      $scope.setResourceVars();
    };

    $scope.setResourceVars = function() {
      // using the service keeps sorting on page load consistent
      resourceService.setResources(resources);
      $scope.resources = resourceService.getResources();
    };

    $scope.getSynthesis = function() {
      var id = resources[0].collection.synthesis_id;
      return resources.filter( function(resource) {
        return resource.id == id;
      })[0];
    };

    $scope.getUser = function() {
      userService.currentUser()
        .then(function(response) {
          $scope.user = response;
        }, function() {
          $scope.user = false;
        });
    };

    $scope.upvoteResource = function(resource) {
      Restangular.one("resources", resource.id).post("upvote")
        .then(function(response) {
          resourceService.addUpvote(resource, $scope.user.id);
          $scope.resources = resourceService.getResources();
          flashService.updateFlash('Resource', 'upvote', true);
        }, flashService.updateFlash('Resource', 'upvote', false));
    };

    $scope.notUpvoted = function(upvoteIds) {
      return ($scope.user && !upvoteIds.includes($scope.user.id));
    };

    $scope.upvoted = function(upvoteIds) {
      return ($scope.user && upvoteIds.includes($scope.user.id));
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