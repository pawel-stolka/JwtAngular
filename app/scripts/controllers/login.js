'use strict';

angular.module('authFromScratchApp').controller('LoginCtrl', function($scope, $http, API_URL, alert, authToken, $state) {
  $scope.submit = function() {

    // var url = 'http://localhost:3000/register';
    var url = API_URL + 'login';
    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $http.post(url, user)
      .then(function(res) {
        var data = res.data;
        alert('success', 'Account Created', 'Thanks for coming back ' + data.user.email + '!');
        console.log(data);
        authToken.setToken(data.token);
        $state.go('main');
      }, function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
  }
});
