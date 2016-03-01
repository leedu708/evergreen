evergreen.factory('resourceService',
  [function() {

    var resourceService = {};

    resourceService.resources = [];

    resourceService.setResources = function(resources) {
      resourceService.resources = resources;
      // sorts resources by upvotes
      resourceService.sortResources();
    };

    resourceService.getTopResources = function(num) {
      var output = [];
      for (var i = 0; i < num; i++) {
        output.push(resourceService.resources[i]);
      };
      return output;
    };

    resourceService.remove = function(removed) {
      this.resources = this.resources.filter( function(resource) {
        return resource.id !== removed.id;
      });
    };

    resourceService.toggleApproval = function(response) {
      index = this.resources.indexOf(response);

      this.resources[index].approved = !this.resources[index].approved;
    };

    resourceService.sortResources = function() {
      resourceService.resources.sort(function(a, b) {
        if (a.upvotes < b.upvotes) {
          return 1;
        } else if (a.upvotes > b.upvotes) {
          return -1;
        } else {
          return 0;
        };
      });
    };

    resourceService.getResources = function() {
      return this.resources;
    };

    return resourceService;

  }]);