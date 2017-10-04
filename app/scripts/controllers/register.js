'use strict';

angular.module('authFromScratchApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert) {
    $scope.submit = function() {

      var url = '/',
        user = {};
      $http.post(url, user)
        .then(function(res) {
          alert('success', 'OK!', 'You are now registered');
        }, function(err) {
          alert('warning', 'Ooops!', 'Could not register');
        });
    }
  });
