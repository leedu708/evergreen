evergreen.factory('sectorService',
  [function() {

    var sectorService = {};

    sectorService.sectors = [];

    sectorService.setSectors = function(sectors) {
      sectorService.sectors = sectors;
      sectorService.sectors.sort(function(a, b) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0
        };
      });
    };

    sectorService.getTotalResources = function(sector) {
      var sum = 0;
      angular.forEach(sector.collections, function(collection) {
        sum += collection.resources.length;
      });
      return sum;
    }

    sectorService.getSectors = function() {
      return this.sectors;
    };

    return sectorService;

  }])