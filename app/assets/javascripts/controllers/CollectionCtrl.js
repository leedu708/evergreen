evergreen.controller('CollectionCtrl',
  ['$scope', 'Restangular', 'collections', 'sectors', 'collectionService', '$stateParams',
  function($scope, Restangular, collections, sectors, collectionService, $stateParams) {

  	// Instantiate thisCollection to be used below
  	$scope.thisCollection = '';

    $scope.init = function() {
      collectionService.setCollections(collections);
      $scope.sectors = sectors;
      $scope.setCollectionVars();
      $scope.thisCollection();
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

    $scope.thisCollection = function() {
    	if ($stateParams.collection_id) {
    		angular.forEach($scope.collections, function(collection) {
    			if (collection.id == $stateParams.collection_id) {
    				$scope.thisCollection = collection;
    			}
    		});
    	}
    }

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