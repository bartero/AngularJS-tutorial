(function () {
   "use strict";

   function randomInt(from, to) {
      return Math.floor(Math.random() * (1 + to - from)) + from;
   }

   let exampleTaskLabels = [
      'do post office',
      'sell car',
      'call mum',
      'tidy the desk',
      'buy headphones',
      'do the finances'
   ];

   function drawTasks() {
      let taskCount = randomInt(1, exampleTaskLabels.length);
      let tasks = [];

      let labelsTaken = new Set();
      for (let t = 0; t < taskCount; t += 1) {

         let labelNo = randomInt(0, exampleTaskLabels.length - 1);
         while (labelsTaken.has(labelNo)) {
            labelNo = (labelNo + 1) % exampleTaskLabels.length;
         }
         labelsTaken.add(labelNo);

         tasks.push({
            label: exampleTaskLabels[labelNo],
            done: randomInt(1, 10) > 6
         });
      }

      return tasks;
   }

   angular.module('taskList', [])
      .directive('taskList', function () {
         return {
            restrict: 'E',
            transclude: false,
            templateUrl: 'task-list/task-list.html',
            replace: true,
            scope: {},

            controller: function ($scope, $element) {
               $scope.tasks = drawTasks();
               $scope.addNew = function () {
                  if ($scope.newLabel && $scope.newLabel.length) {
                     $scope.tasks.push({
                        label: $scope.newLabel,
                        done: $scope.newDone
                     });
                  }
                  $scope.newLabel = "";
               };
               $scope.remaining = function () {
                  let count = 0;
                  angular.forEach($scope.tasks, function (task) {
                     if (!task.done) {
                        count += 1;
                     }
                  });
                  return count;
               };
               $scope.archive = function () {
                  let oldTasks = $scope.tasks;
                  $scope.tasks = [];
                  angular.forEach(oldTasks, function (task) {
                     if (!task.done) {
                        $scope.tasks.push(task);
                     }
                  });
               };
               $scope.newDone = false;
            }
         };
      });
}());
