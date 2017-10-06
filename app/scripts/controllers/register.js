'use strict';

angular.module('authFromScratchApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert, authToken) {
    $scope.submit = function() {

      var url = 'http://localhost:3000/register',
        user = {
          email: $scope.email,
          password: $scope.password
        };

      $http.post(url, user)
        .then(function(res) {
          alert('success', 'Account Created', 'Welcome, ' + res.data.user.email + '!');
          console.log(res.data);
          authToken.setToken(res.token);
        }, function(err) {
          alert('warning', 'Ooops!', 'Could not register');
        });
    }
  });
