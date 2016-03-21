evergreen.filter('showCollectionResourceFilter', function() {
  return function( collection, searchText ) {

    searchText = searchText.toLowerCase();

    var filteredCollection = []

    angular.forEach( collection, function( resource ) {
      var title = resource.title.toLowerCase();
      var description = resource.description.toLowerCase();
      var owner = resource.owner.username.toLowerCase();

      if (title.indexOf(searchText) > -1 || description.indexOf(searchText) > -1  || owner.indexOf(searchText) > -1) {
        filteredCollection.push(resource);
      };
    });

    return filteredCollection;

  };
});