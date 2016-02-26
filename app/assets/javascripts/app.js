var evergreen = angular.module('evergreen', ['ui.router', 'restangular', 'templates', 'ngAnimate', 'ngSanitize'])

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
        templateUrl: '/templates/nav/about.html',
        controller: 'InfoCtrl',
        resolve: {
          siteInfo: ['Restangular', function(Restangular) {
            return Restangular.one('admin/site_info').get()
          }]
        }
      })

      .state('contact', {
        url: '/contact-us',
        templateUrl: '/templates/nav/contact.html',
        controller: 'InfoCtrl',
        resolve: {
          siteInfo: ['Restangular', function(Restangular) {
            return Restangular.one('admin/site_info').get()
          }]
        }
      })

      .state('mission', {
        url: '/mission',
        templateUrl: '/templates/nav/mission.html',
        controller: 'InfoCtrl',
        resolve: {
          siteInfo: ['Restangular', function(Restangular) {
            return Restangular.one('admin/site_info').get()
          }]
        }
      })

      .state('sector', {
        url: '/sector/:sector_id',
        templateUrl: '/templates/nav/sector.html',
        controller: 'showSectorCtrl',
        resolve: {
          sector: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
            return Restangular.one('sectors', $stateParams["sector_id"]).get();
          }]
        }
      })

      .state('collection', {
        url: '/collection/:collection_id',
        templateUrl: '/templates/nav/collection.html',
        controller: 'showCollectionCtrl',
        resolve: {
          resources: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
            return Restangular.one("collections", $stateParams["collection_id"]).all("resources").getList();
          }]
        }
      })

      .state('addResource', {
        url: '/resource/create',
        templateUrl: '/templates/users/resources/create.html',
        controller: 'addResourceCtrl',
        resolve: {
          // grabs current_user and checks if user type is an admin or curator
          // locks user out if not admin/curator
          current_user: ['Restangular', '$q', 'flashService', function(Restangular, $q, flashService) {
            return Restangular.one('users').get()
              .then( function(response) {
                if (response.user_type === "reader") {
                  flashService.unauthorized();
                  return $q.reject("Not Authorized");
                };
                return response;
              });
          }],
          collections: ['Restangular', function(Restangular) {
            return Restangular.all('collections').getList();
          }]
        }
      })

      .state('userResources', {
        url: '/user/:user_id/resources',
        templateUrl: '/templates/users/resources/index.html',
        controller: 'ResourceCtrl',
        resolve: {
          resources: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
            return Restangular.one("users", $stateParams["user_id"]).all("resources").getList();
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
              // grabs current_user and checks if user type is an admin
              // if user isn't an admin, he/she is locked out of the dashboard
              current_user: ['Restangular', '$q', 'flashService', function(Restangular, $q, flashService) {
                return Restangular.one('users').get()
                  .then( function(response) {
                    if (response.user_type !== "admin") {
                      flashService.unauthorized();
                      return $q.reject("Not Authorized");
                    };
                  });
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
          resources: ['Restangular', function(Restangular) {
            return Restangular.all('resources').getList();
          }]
        }
      })

      .state('admin.dashboard.siteInfo', {
        url: '/siteInfo',
        templateUrl: '/templates/admin/dashboard/siteInfo.html',
        controller: 'InfoCtrl',
        resolve: {
          siteInfo: ['Restangular', function(Restangular) {
            return Restangular.one('admin/site_info').get()
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
          }],
          sectors: ['Restangular', function(Restangular) {
            return Restangular.all('sectors').getList();
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