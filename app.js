"use strict";
const appModule = angular.module('app', ['taskList']);

appModule.controller('SummaryController', function($scope) {
   $scope.uncompletedTasksCount = 51;
});
