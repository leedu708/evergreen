evergreen.controller('UserCtrl',
  ['$scope', 'Restangular', 'users', 'userService',
  function($scope, Restangular, users, userService) {

    $scope.init = function() {
      $scope.current_user = users[0];
      userService.setUsers(users);
      $scope.setUsers();
    };

    $scope.setUsers = function() {
      $scope.readers = userService.getReaders();
      $scope.curators = userService.getCurators();
      $scope.admins = userService.getAdmins();
    };

    $scope.promoteReader = function(reader) {
      obj = {};
      obj["user_type"] = "curator"
      Restangular.one('admin/users', reader.id).patch( obj )
        .then(function(response) {
          userService.promoteReader(response.id - 1);
          $scope.setUsers();
        });
    };

    $scope.demoteCurator = function(curator) {
      obj = {};
      obj["user_type"] = "reader"
      Restangular.one('admin/users', curator.id).patch( obj )
        .then(function(response) {
          userService.demoteCurator(response.id - 1);
          $scope.setUsers();
        });
    };

    $scope.init();

  }]);