evergreen.factory('collectionService',
  [function() {

    var collectionService = {};

    collectionService.collections = [];

    collectionService.setCollections = function(collections) {
      collectionService.collections = collections;
      this.sortCollections();
    };

    collectionService.addCollection = function(collection) {
      collectionService.collections.push(collection);
    };

    collectionService.remove = function(removed) {
      this.collections = this.collections.filter( function(collection) {
        return collection.id !== removed.id;
      });
    };

    collectionService.sortCollections = function() {
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

    collectionService.getCollections = function() {
      return this.collections;
    };

    return collectionService;

  }]);