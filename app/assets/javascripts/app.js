var evergreen = angular.module('evergreen', ['ui.router', 'restangular'])

.config( ['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {

    // REST Config
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({
      'content-type': 'application/json'
    });

    // Routing
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('evergreen', {
        url: '',
        templateUrl: '/templates/index.html',
        controller: function($scope) {
          $scope.test = "hello, world!";
        }
      })

  }])

evergreen.run(['$rootScope',
  function($rootScope) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
  }]);