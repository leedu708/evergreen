evergreen.controller('UserCtrl',
  ['$scope', 'Restangular', 'users', 'userService', 'flashService',
  function($scope, Restangular, users, userService, flashService) {

    $scope.init = function() {
      userService.setUsers(users);
      $scope.currentTable = "admin";
      $scope.setUsers();
    };

    $scope.setUsers = function() {
      $scope.readers = userService.getReaders();
      $scope.curators = userService.getCurators();
      $scope.admins = userService.getAdmins();
    };

    $scope.setTable = function(userType) {
      $scope.currentTable = userType;
    };

    $scope.showTable = function(userType) {
      return !!($scope.currentTable === userType);
    };

    $scope.promoteReader = function(reader) {
      obj = {};
      obj["user_type"] = "curator"
      Restangular.one('admin/users', reader.id).patch( obj )
        .then(function(response) {
          userService.promoteReader(response.id - 1);
          $scope.setUsers();
          flashService.updateFlash('Reader', 'promote', true);
        }, flashService.updateFlash('Reader', 'promote', false));
    };

    $scope.demoteCurator = function(curator) {
      obj = {};
      obj["user_type"] = "reader"
      Restangular.one('admin/users', curator.id).patch( obj )
        .then(function(response) {
          userService.demoteCurator(response.id - 1);
          $scope.setUsers();
          flashService.updateFlash('Curator', 'demote', true);
        }, flashService.updateFlash('Curator', 'demote', false));
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