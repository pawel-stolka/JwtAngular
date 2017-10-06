'use strict';

angular.module('authFromScratchApp')
  .controller('JobsCtrl', function($scope, $http, API_URL, alert) {

    $http.get(API_URL + 'jobs')
      .then(function(jobs) {
        $scope.jobs = jobs.data;
      }, function(err) {
        alert('warning', 'Unable to get jobs', err.message);
      });
  });
