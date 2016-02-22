evergreen.factory('infoService',
  [function() {

    var infoService = {};

    infoService.siteInfo = [];

    infoService.setInfo = function(info) {
      this.siteInfo = info;
    };

    infoService.getInfo = function() {
      return this.siteInfo;
    };

    return infoService;

  }]);