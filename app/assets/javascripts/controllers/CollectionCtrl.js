evergreen.controller('CollectionCtrl',
  ['$scope', 'Restangular', 'collections', 'collectionService',
  function($scope, Restangular, collections, collectionService) {

    $scope.init = function() {
      collectionService.setCollections(collections);
      $scope.setCollectionVars();
    };

    // admin vars
    $scope.setCollectionVars = function() {
      $scope.collections = collectionService.getCollections();
      angular.forEach($scope.collections, function(collection) {
        synIDs = collectionService.getSynthesisIDs(collection);
        collection["synthesis"] = synIDs.toString();
      });
    };

    $scope.init();

  }]);