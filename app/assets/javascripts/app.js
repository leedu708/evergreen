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

      // Reader Flow
      .state('home', {
        url: '/home',
        templateUrl: '/templates/nav/home.html',
       	controller: 'SectorCtrl',
       	resolve: {
          sectors: ['Restangular', function(Restangular) {
            return Restangular.all('sectors').getList();
          }]
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

      .state('collection', {
        url: '/collection/:collection_id',
        templateUrl: '/templates/nav/collection.html',
        controller: 'CollectionCtrl',
        resolve: {
          collections: ['Restangular', function(Restangular) {
            return Restangular.all('collections').getList();
          }],
          sectors: ['Restangular', function(Restangular) {
            return Restangular.all('sectors').getList();
          }]
        }
      })

      // ADMIN DASHBOARD
      .state('admin', {
        url: '/admin',
        views: {
          '': {
            templateUrl: '/templates/admin/main.html'
            }
          }
      })

      .state('admin.dashboard', {
        url: '/dashboard',
        views: {
          'sidebar': {
            templateUrl: '/templates/admin/sidebar.html'
          },

          'dashboard': {
            templateUrl: '/templates/admin/dashboard.html',
            resolve: {
              // there may be a better way to do this, but forcing the client to attempt to grab the user index means that rails only allows admins to enter the administrative dashboard
              users: ['Restangular', function(Restangular) {
                return Restangular.all('admin/users').getList();
              }]
            }
          }
        }
      })

      .state('admin.dashboard.overview', {
        url: '/overview',
        templateUrl: '/templates/admin/dashboard/overview.html',
        controller: 'OverviewCtrl',
        resolve: {
          users: ['Restangular', function(Restangular) {
            return Restangular.all('admin/users').getList();
          }],
          sectors: ['Restangular', function(Restangular) {
            return Restangular.all('sectors').getList();
          }],
          categories: ['Restangular', function(Restangular) {
            return Restangular.all('categories').getList();
          }],
          collections: ['Restangular', function(Restangular) {
            return Restangular.all('collections').getList();
          }],
          resources: ['Restangular', function(Restangular) {
            return Restangular.all('resources').getList();
          }]
        }
      })

      .state('admin.dashboard.users', {
        url: '/users',
        templateUrl: '/templates/admin/dashboard/users.html',
        controller: 'UserCtrl',
        resolve: {
          users: ['Restangular', function(Restangular) {
            return Restangular.all('admin/users').getList();
          }]
        }
      })

      .state('admin.dashboard.sectors', {
        url: '/sectors',
        templateUrl: '/templates/admin/dashboard/sectors.html',
        controller: 'SectorCtrl',
        resolve: {
          sectors: ['Restangular', function(Restangular) {
            return Restangular.all('sectors').getList();
          }]
        }
      })

      .state('admin.dashboard.categories', {
        url: '/categories',
        templateUrl: '/templates/admin/dashboard/categories.html',
        controller: 'CategoryCtrl',
        resolve: {
          categories: ['Restangular', function(Restangular) {
            return Restangular.all('categories').getList();
          }]
        }
      })

      .state('admin.dashboard.collections', {
        url: '/collections',
        templateUrl: '/templates/admin/dashboard/collections.html',
        controller: 'CollectionCtrl',
        resolve: {
          collections: ['Restangular', function(Restangular) {
            return Restangular.all('collections').getList();
          }],
          categories: ['Restangular', function(Restangular) {
            return Restangular.all('categories').getList();
          }]
        }
      })

      .state('admin.dashboard.resources', {
        url: '/resources',
        templateUrl: '/templates/admin/dashboard/resources.html',
        controller: 'ResourceCtrl',
        resolve: {
          resources: ['Restangular', function(Restangular) {
            return Restangular.all('resources').getList();
          }]
        }
      })

  }])

evergreen.run(['$rootScope',
	function($rootScope) {
		$rootScope.$on('$stateChangeError', console.log.bind(console));
	}]);