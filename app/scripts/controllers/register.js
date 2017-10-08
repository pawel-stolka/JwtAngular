'use strict';

angular.module('authFromScratchApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert, authToken, API_URL, $state) {
    $scope.submit = function() {

      // var url = 'http://localhost:3000/register',
      var url = API_URL + 'register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
        .then(function(res) {
          var data = res.data;
          authSuccessful(data);

        }, function(err) {
          alert('warning', 'Ooops! Could not register :( ', err.message);
        });
    }

    function authSuccessful(data) {
      alert('success', 'Account Created', 'Welcome, ' + data.user.email + '!');

      authToken.setToken(data.token);
      $state.go('main');
    }
  });
