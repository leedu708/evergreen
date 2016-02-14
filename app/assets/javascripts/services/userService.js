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
          return 0;
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

    userService.getTopContributors = function(num) {
      var output = [];
      resourceLength = userService.users.sort(function(a, b) {
        if (a.resources.length < b.resources.length) {
          return 1;
        } else if (a.resources.length > b.resources.length) {
          return -1;
        } else {
          return 0;
        };
      });

      for (var i = 0; i < num; i++) {
        output.push(resourceLength[i]);
      };
      return output;
    };

    userService.getUpvotes = function(user) {
      var upvotes = 0;
      angular.forEach(user.resources, function(resource) {
        upvotes += resource.upvotes;
      });

      return upvotes;
    }

    userService.getMostProlific = function(num) {
      userUpvotes = angular.forEach(userService.users, function(user) {
        upvotes = userService.getUpvotes(user);
        user["totalUpvotes"] = upvotes;
      });

      userUpvotes.sort(function(a, b) {
        if (a.totalUpvotes < b.totalUpvotes) {
          return 1;
        } else if (a.totalUpvotes > b.totalUpvotes) {
          return -1;
        } else {
          return 0;
        };
      });

      var output = [];
      for (var i = 0; i < num; i++) {
        output.push(userUpvotes[i]);
      };

      return output;
    };

    return userService;

  }]);