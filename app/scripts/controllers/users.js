'use strict';

angular.module('authFromScratchApp').controller('UsersCtrl', function($scope, $http, API_URL, alert) {
  var loggons = [];
  $http.get(API_URL + 'loggedIn')
    .then(function(users) {

      var loggedInUsers = users.data.loggedIn; //.users;

      $.each(loggedInUsers, function(i, v) {
        var date = v.LoggedAt.substr(0, 10),
          time = v.LoggedAt.substr(11, 8);

        var logUser = {
          email: v.email,
          loggedDay: date,
          loggedTime: time
        };
        loggons.push(logUser);

      });
      console.log(loggons);
    }, function(err) {
      alert('warning', 'Unable to get loggedIns', err.message);
    });

  function getLoggons(email) {
    var correct = [];
    $.each(loggons, function(i, v) {
      if (v.email == email)
        correct.push({ day: v.loggedDay, time: v.loggedTime });
    })
    return correct;
  }

  $http.get(API_URL + 'users')
    .then(function(users) {
      var users = users.data.users;
      // var combo = {
      //   users: users,
      //   counters: counters
      // };
      var usersConv = [];
      // var counters = [];

      $.each(users, function(i, v) {
        var date = v.createdAt.substr(0, 10),
          time = v.createdAt.substr(11, 8);
        // var utcTime = moment.utc(time);
        var logCounter = getLoggons(v.email);
        var user = {
          email: v.email,
          createTime: time,
          createDate: date,
          logCounter: logCounter
        };
        
        // console.log(user.email + ' ' + logCounter.length);
        //counter = logCounter.length;
        // counters.push(logCounter.length);
        usersConv.push(user);
      })

      $scope.users = usersConv;

      // console.log($scope.combo);
      console.log($scope.users);
      // 

      /* 2017-10-07T16:29:10.524Z
      var date = $scope.users.substr(0, 10),
        time = $scope.users.substr(11, 12);
      console.log(date + "    " + time);
      */
    }, function(err) {
      alert('warning', 'Unable to get users', err.message);
    });
});
