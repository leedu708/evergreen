evergreen.directive('sectorNav', function() {

  return {
    restrict: "E",
    templateUrl: '/templates/shared/sectorNav.html',
    scope: true,
    controller: 'NavigationCtrl'
  };

});