'use strict';

/**
 * Navigation controller.
 */
angular.module('docs').controller('Navigation', function($scope, $state, $stateParams, $rootScope, User) {
  User.userInfo().then(function(data) {
    $rootScope.userInfo = data;
    if (data.anonymous) {
      // 'passwordreset' is a public route that does not require authentication
      var publicStates = ['login', 'passwordreset'];
      if (publicStates.indexOf($state.current.name) === -1) {
        $state.go('login', {
          redirectState: $state.current.name,
          redirectParams: JSON.stringify($stateParams),
        }, {
          location: 'replace'
        });
      }
    }
  });

  /**
   * User logout.
   */
  $scope.logout = function($event) {
    User.logout().then(function() {
      User.userInfo(true).then(function(data) {
        $rootScope.userInfo = data;
      });
      $state.go('main');
    });
    $event.preventDefault();
  };
});