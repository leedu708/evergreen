evergreen.controller('CollectionCtrl',
  ['$scope', 'Restangular', 'collections', 'categories', 'collectionService', '$stateParams', 'flashService',
  function($scope, Restangular, collections, categories, collectionService, $stateParams, flashService) {

    $scope.init = function() {
      collectionService.setCollections(collections);
      $scope.categories = categories;
      $scope.setCollectionVars();
    };

    // admin vars
    $scope.setCollectionVars = function() {
      $scope.addCollectionForm = false;
      $scope.editCollectionForm = false;
      $scope.addCollection = {};
      $scope.editCollection = {};
      $scope.collections = collectionService.getCollections();
    };

    $scope.createCollection = function(collection) {
      Restangular.all('collections').post(collection)
        .then( function(response) {
          console.log(response);
          collectionService.addCollection(response)
          $scope.setCollectionVars();
          flashService.updateFlash('Collection', 'create', true);
        }, function() {
          $scope.setCollectionVars();
          flashService.updateFlash('Collection', 'create', false);
        });
    };

    $scope.destroyCollection = function(collection) {
      collection.remove().then( function() {
        collectionService.remove(collection);
        $scope.setCollectionVars();
        flashService.updateFlash('Collection', 'destroy', true);
      }, flashService.updateFlash('Collection', 'destroy', false));
    };

    $scope.updateCollection = function(collection) {
      Restangular.one('collections', collection.id).patch( collection )
        .then(function(response) {
          collectionService.remove(collection);
          collectionService.addCollection(response);
          collectionService.sortCollections();
          $scope.setCollectionVars();
          flashService.updateFlash('Collection', 'update', true);
        }, function() {
          $scope.setCollectionVars();
          flashService.updateFlash('Collection', 'update', false);
        });
    };

    $scope.toggleAddForm = function() {
      $scope.addCollectionForm = !$scope.addCollectionForm;
    };

    $scope.toggleEditForm = function(collection) {
      $scope.editCollectionForm = !$scope.editCollectionForm;
      $scope.editCollection = collection;
    };

    $scope.toggleSort = function(column) {
      if (column === $scope.sort) {
        $scope.sortDescending ^= true;
      } else {
        $scope.sort = column;
        $scope.sortDescending = false;
      };
    };

    $scope.sortIcon = function(column) {
      if ($scope.sort === column) {
        return $scope.sortDescending
          ? 'fa fa-chevron-up fa-1x'
          : 'fa fa-chevron-down fa-1x';
      };
    };

    $scope.init();

  }]);