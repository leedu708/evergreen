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
    $urlRouterProvider.otherwise('/home');

    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: '/templates/nav/home.html',
        controller: function($scope) {
          $scope.test = "hello, world!";
        }
      })

      .state('about', {
        url: '/about',
        templateUrl: '/templates/nav/about.html'
      })

      .state('contact', {
        url: '/contact-us',
        templateUrl: '/templates/nav/contact.html'
      })

      .state('mission', {
        url: '/mission',
        templateUrl: '/templates/nav/mission.html'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: '/templates/admin/dashboard.html',
        controller: 'AdminCtrl',
        resolve: {
          users: ['Restangular', function(Restangular) {
            return Restangular.all('admin/users').getList();
          }]
        }
      })

  }])

evergreen.run(['$rootScope',
  function($rootScope) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
  }]);