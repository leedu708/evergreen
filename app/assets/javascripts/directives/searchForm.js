evergreen.directive('searchForm', function() {

  return {
    restrict: "E",
    replace: true,
    templateUrl: '/templates/shared/searchForm.html',
    scope: true,
    controller: ['$scope', '$timeout', function($scope, $timeout) {

      $scope.searchText = "";
      $scope.editorEnabled = false;

      $scope.enableEditor = function() {
        $scope.editorEnabled ^= true;
      };

      $scope.empty = function() {
        return !$scope.searchText.length;
      };

      $scope.closeSearch = function() {
        $scope.enableEditor();
        $timeout(function() {
          $scope.searchText = "";
        }, 10, true);
      };
    }]
  }
})