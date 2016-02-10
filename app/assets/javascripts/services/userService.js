evergreen.factory('userService',
  ['Restangular',
  function(Restangular) {

    var userService = {};

    userService.users = [];

    userService.setUsers = function(users) {
      userService.users = users;
      // ensures promotion and demotion are visually changed in the view without refresh
      userService.users.sort(function(a, b) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0
        };
      });
    };

    userService.promoteReader = function(id) {
      userService.users[id].user_type = "curator";
    };

    userService.demoteCurator = function(id) {
      userService.users[id].user_type = "reader";
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