evergreen.controller('InfoCtrl',
  ['$scope', 'Restangular', 'siteInfo', 'infoService',
  function($scope, Restangular, siteInfo, infoService) {

    $scope.init = function() {
      $scope.setInfoVars(siteInfo);
    };

    $scope.setInfoVars = function(info) {
      infoService.setInfo(info);
      $scope.editInfoForm = false;
      $scope.editInfo = {};
      $scope.info = infoService.getInfo();
    };

    $scope.updateInfo = function(info) {
      Restangular.one('admin/site_info', info.id).patch( info )
        .then(function(response) {
          $scope.setInfoVars(response);
        });
    };

    $scope.toggleEditForm = function(info) {
      $scope.editInfoForm = !$scope.editInfoForm;
      $scope.editInfo = info;
    };

    $scope.init();

  }]);