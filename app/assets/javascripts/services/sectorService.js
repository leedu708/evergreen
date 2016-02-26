evergreen.factory('sectorService',
  [function() {

    var sectorService = {};

    sectorService.sectors = [];

    sectorService.setSectors = function(sectors) {
      sectorService.sectors = sectors;
      this.sortSectors();
    };

    sectorService.addSector = function(sector) {
      sectorService.sectors.push(sector);
    };

    sectorService.remove = function(removed) {
      this.sectors = this.sectors.filter( function(sector) {
        return sector.id !== removed.id;
      });
    };

    sectorService.sortSectors = function() {
      sectorService.sectors.sort(function(a, b) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        };
      });
    };

    sectorService.getSectors = function() {
      return this.sectors;
    };

    return sectorService;

  }]);