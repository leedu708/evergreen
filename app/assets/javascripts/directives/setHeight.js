evergreen.directive('setHeight', function() {
  function link(scope, element, attrs) {
    scope.$watch(function() {
      scope.style = {
        height: element[0].offsetHeight + 'px',
      };
    });
  }

  return {
    restrict: 'A',
    link: link
  };
});