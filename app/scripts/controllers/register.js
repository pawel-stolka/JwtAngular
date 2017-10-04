'use strict';

angular.module('authFromScratchApp')
  .controller('RegisterCtrl', function($scope, $http) {
    $scope.submit = function() {

      var url = '/',
        user = {};
      $http.post(url, user)
        .then(function(res) {
          console.log("good");
        }, function(err) {
          console.log("error from RegisterCtrl");
        });
    }
  });
