evergreen.factory('flashService',
  ['$rootScope', '$timeout',
  function($rootScope, $timeout) {

    var flashService = {};

    flashService.setFlash = function(bootstrapClass, message) {
      $rootScope.flash = [bootstrapClass, message];
      $timeout(function() {
        $rootScope.flash = [];
      }, 3500, true);
    };

    flashService.buildMessage = function(object, actionType, bool) {
      if (bool) {
        outcome = 'successfully ';
      } else {
        outcome = 'failed to be ';
      };

      switch (actionType) {
        case 'create':
          action = 'created';
          break;
        case 'destroy':
          action = 'deleted';
          break;
        case 'add':
          action = 'added';
          break;
        case 'remove':
          action = 'removed';
          break;
        case 'update':
          action = 'updated';
          break;
        case 'promote':
          action = 'promoted';
          break;
        case 'demote':
          action = 'demoted';
          break;
        case 'access':
          action = 'accessed';
          break;
        case 'upvote':
          action = 'upvoted';
          break;
        case '':
         action = '';
         break;
      };

      var message = object + ' ' + outcome + action + '!';

      return message;
    };

    flashService.updateFlash = function(object, actionType, bool) {
      var message = flashService.buildMessage(object, actionType, bool);

      if (bool) {
        bootstrapClass = 'success';
      } else {
        bootstrapClass = 'danger';
      };

      flashService.setFlash(bootstrapClass, message);
    };

    flashService.unauthorized = function() {
      var message = "Unauthorized Access!";

      flashService.setFlash('danger', message);
    };

    flashService.login = function(bool) {
      if (bool) {
        bootstrapClass = 'success';
        message = 'Login successful!';
      } else {
        bootstrapClass = 'danger';
        message = 'Login failed!';
      };

      flashService.setFlash(bootstrapClass, message);
    };

    flashService.logout = function(bool) {
      if (bool) {
        bootstrapClass = 'success';
        message = 'Logged Out!';
      } else {
        bootstrapClass = 'danger';
        message = 'Log out failed!';
      };

      flashService.setFlash(bootstrapClass, message);
    };

    return flashService;

  }]);