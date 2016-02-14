evergreen.controller('CollectionCtrl',
  ['$scope', 'Restangular', 'collections', 'sectors', 'collectionService',
  function($scope, Restangular, collections, sectors, collectionService) {

    $scope.init = function() {
      collectionService.setCollections(collections);
      $scope.sectors = sectors;
      $scope.setCollectionVars();
    };

    // admin vars
    $scope.setCollectionVars = function() {
      $scope.addCollectionForm = false;
      $scope.editCollectionForm = false;
      $scope.collection = {};
      $scope.editCollection = {};
      $scope.collections = collectionService.getCollections();
      angular.forEach($scope.collections, function(collection) {
        synIDs = collectionService.getSynthesisIDs(collection);
        collection["synthesis"] = synIDs.join(", ");
      });
    };

    $scope.createCollection = function(collection) {
      Restangular.all('collections').post(collection)
        .then( function(response) {
          console.log(response);
          collectionService.addCollection(response)
          $scope.setCollectionVars();
        }, function() {
          $scope.setCollectionVars();
        });
    };

    $scope.destroyCollection = function(collection) {
      collection.remove().then( function() {
        collectionService.remove(collection);
        $scope.setCollectionVars();
      });
    };

    $scope.updateCollection = function(collection) {
      Restangular.one('collections', collection.id).patch( collection )
        .then(function(response) {
          collectionService.remove(collection);
          collectionService.addCollection(response);
          collectionService.sortCollections();
          $scope.setCollectionVars();
        }, function() {
          $scope.setCollectionVars();
        });
    }

    $scope.toggleAddForm = function() {
      $scope.addCollectionForm = !$scope.addCollectionForm;
    };

    $scope.toggleEditForm = function(collection) {
      $scope.editCollectionForm = !$scope.editCollectionForm;
      $scope.editCollection = collection;
    };

    $scope.init();

  }]);