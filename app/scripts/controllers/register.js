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
          var data = res.data;
          alert('success', 'Account Created', 'Welcome, ' + data.user.email + '!');
          console.log(data);
          authToken.setToken(data.token);
        }, function(err) {
          alert('warning', 'Ooops!', 'Could not register');
        });
    }
  });
