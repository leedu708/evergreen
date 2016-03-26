evergreen.factory('infoService',
  ['Restangular',
  function(Restangular) {

    var infoService = {};

    infoService.siteInfo = [];

    infoService.getInfoAPI = function() {
      return Restangular.one('admin/site_info').get();
    };

    infoService.setInfo = function(info) {
      this.siteInfo = info;
    };

    infoService.getInfo = function() {
      return this.siteInfo;
    };

    return infoService;

  }]);