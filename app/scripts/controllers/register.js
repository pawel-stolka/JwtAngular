'use strict';

angular.module('authFromScratchApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert) {
    $scope.submit = function() {

      var url = 'http://localhost:3000/register',
        user = {
          email: $scope.email,
          password: $scope.password
        };

      $http.post(url, user)
        .then(function(res) {
          alert('success', 'OK!', 'You are now registered');
        }, function(err) {
          alert('warning', 'Ooops!', 'Could not register');
        });
    }
  });
