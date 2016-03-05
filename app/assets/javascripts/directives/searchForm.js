evergreen.directive('searchForm', function() {

  return {
    restrict: "E",
    replace: true,
    templateUrl: '/templates/shared/searchForm.html',
    scope: true,
    controller: 'SearchCtrl'
  }
})