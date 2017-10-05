'use strict';

angular.module('authFromScratchApp')
  .controller('HeaderCtrl', function($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
