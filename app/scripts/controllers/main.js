'use strict';

angular.module('authFromScratchApp')
  .controller('MainCtrl', function($scope) {
    return $scope.jobs = [
      'Michael Jordan',
      'Jennifer Aniston',
      'George Lucas',
      'Sean Connery'
    ];
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
  });
