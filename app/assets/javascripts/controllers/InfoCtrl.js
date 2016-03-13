evergreen.controller('InfoCtrl',
  ['$scope', 'Restangular', 'siteInfo', 'infoService', 'flashService',
  function($scope, Restangular, siteInfo, infoService, flashService) {

    $scope.init = function() {
      $scope.setInfoVars(siteInfo);
      $scope.currentInfoType = "about";
    };

    $scope.setInfoVars = function(info) {
      infoService.setInfo(info);
      $scope.editInfoForm = false;
      $scope.editInfo = {};
      $scope.info = infoService.getInfo();
    };

    $scope.setInfoType = function(infoType) {
      $scope.currentInfoType = infoType;
    };

    $scope.showInfoType = function(infoType) {
      return !!($scope.currentInfoType === infoType);
    };

    $scope.updateInfo = function(info) {
      Restangular.one('admin/site_info', info.id).patch( info )
        .then(function(response) {
          $scope.setInfoVars(response);
          flashService.updateFlash('Site Information', 'update', true);
        }, flashService.updateFlash('Site Information', 'update', false));
    };

    $scope.toggleEditForm = function(info) {
      $scope.editInfoForm = !$scope.editInfoForm;
      $scope.editInfo = info;
    };

    $scope.init();

  }]);