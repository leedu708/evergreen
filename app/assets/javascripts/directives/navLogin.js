evergreen.directive('navLogin', function() {

  return {
    restrict: "E",
    replace: true,
    templateUrl: '/templates/shared/navLogin.html',
    scope:true,
    controller: 'LoginCtrl'
  }
})