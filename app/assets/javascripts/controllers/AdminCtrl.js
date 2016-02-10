evergreen.controller('AdminCtrl',
  ['$scope', 'Restangular', 'users', 'userService',
  function($scope, Restangular, users, userService) {

    $scope.setUsers = function(allUsers) {
      userService.setUsers(allUsers);
      $scope.readers = userService.getReaders();
      $scope.curators = userService.getCurators();
      $scope.admins = userService.getAdmins();
    };

    $scope.promoteReader = function(reader) {
      obj = {};
      obj["user_type"] = "curator"
      Restangular.one('admin/users', reader.id).patch( obj )
        .then(function() {
          $scope.setUsers();
        });
    };

    $scope.demoteCurator = function(curator) {
      obj = {};
      obj["user_type"] = "reader"
      Restangular.one('admin/users', curator.id).patch( obj )
        .then(function() {
          $scope.setUsers();
        });
    };

    $scope.setUsers(users);

  }]);