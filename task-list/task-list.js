angular.module('taskList', [])
   .directive('tasks', function() {
      return {
         restrict: 'E',
         transclude: false,
         // template: 'safxxxdsf',
         templateUrl: 'task-list/task-list.html',
         scope: {},

         controller: function($scope, $element) {

            $scope.elements = [
               {label: 'posprzątać pokój', done: true},
               {label: 'odnowić samochód', done: false}
            ];
            $scope.addNew = function() {
               if(this.newLabel && this.newLabel.length) {
                  this.elements.push(
                     { label: this.newLabel, done: this.newDone }
                  );
               }
               this.newLabel = "";
            };
            $scope.remaining = function() {
               var count = 0;
               angular.forEach(this.elements, function(element) {
                  if(!element.done) {
                     count++;
                  }
               });
               return count;
            }
            $scope.archive = function() {
               var oldElements = $scope.elements;
               $scope.elements = [];
               angular.forEach(oldElements, function(element) {
                  if(!element.done) {
                     $scope.elements.push(element);
                  }
               });
            }
            $scope.newDone = false;
         }
      };
   });
