evergreen.factory('resourceService',
  ['Restangular',
  function(Restangular) {

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

    resourceService.addUpvote = function(resource, userId) {
      index = this.resources.indexOf(resource);

      this.resources[index].upvote_count += 1;
      this.resources[index].upvote_ids.push(userId);
    };

    resourceService.toggleApproval = function(response) {
      index = this.resources.indexOf(response);

      this.resources[index].approved = !this.resources[index].approved;
    };

    resourceService.sortResources = function() {
      resourceService.resources.sort(function(a, b) {
        if (a.upvote_count < b.upvote_count) {
          return 1;
        } else if (a.upvote_count > b.upvote_count) {
          return -1;
        } else {
          return 0;
        };
      });
    };

    resourceService.getSearch = function(query) {
      return Restangular.all('resources').customGETLIST('search', { search: query });
    };

    resourceService.getResources = function() {
      return this.resources;
    };

    return resourceService;

  }]);