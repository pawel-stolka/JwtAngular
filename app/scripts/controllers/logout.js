'use strict';

angular.module('authFromScratchApp')
  .controller('LogoutCtrl', function (authToken, $state) {
    authToken.removeToken();
    $state.go('main');
  });
