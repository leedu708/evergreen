evergreen.factory('userService',
  ['Restangular',
  function(Restangular) {

    var userService = {};

    userService.users = [];
    // userService.current_user = {};

    userService.setUsers = function(users) {
      userService.users = users;
      // userService.current_user = users[0];
    };

    userService.getReaders = function() {
      return this.users.filter( function(user) {
        return user.user_type === "reader";
      });
    };

    userService.getCurators = function() {
      return this.users.filter( function(user) {
        return user.user_type === "curator";
      });
    };

    userService.getAdmins = function() {
      return this.users.filter( function(user) {
        return user.user_type === "admin";
      });
    };

    return userService;

  }]);