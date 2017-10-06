'use strict';

angular.module('authFromScratchApp')
  .controller('JobsCtrl', function ($scope) {
    $scope.jobs = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
