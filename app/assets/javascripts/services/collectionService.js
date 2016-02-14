evergreen.factory('collectionService',
  [function() {

    var collectionService = {};

    collectionService.collections = [];

    collectionService.setCollections = function(collections) {
      collectionService.collections = collections;
      collectionService.collections.sort(function(a, b) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        };
      });
    };

    collectionService.getSynthesis = function(collection) {
      return collection.resources.filter(function(resource) {
        return resource.synthesis === true;
      });
    };

    collectionService.getSynthesisIDs = function(collection) {
      var output = [];
      angular.forEach(collection.resources, function(resource) {
        if (resource.synthesis) {
          output.push(resource.id);
        };
      });
      return output;
    };

    collectionService.addCollection = function(collection) {
      collectionService.collections.push(collection);
    };

    collectionService.remove = function(removed) {
      this.collections = this.collections.filter( function(collection) {
        return collection.title !== removed.title;
      });
    };

    collectionService.getCollections = function() {
      return this.collections;
    };

    return collectionService;

  }]);