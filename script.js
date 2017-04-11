"use strict";

angular.module('myListApp', [])
  .controller('MyListController', function() {

    this.elements = [
      {label: 'posprzątać pokój', done: true},
      {label: 'odnowić samochód', done: false}
    ];
    this.addNew = function() {
      if(this.newLabel && this.newLabel.length) {
        this.elements.push(
          { label: this.newLabel, done: this.newDone }
        );
      }
      this.newLabel = "";
    };
    this.remaining = function() {
      var count = 0;
      angular.forEach(this.elements, function(element) {
        if(!element.done) {
          count++;
        }
      });
      return count;
    }
    this.archive = function() {
      var oldElements = this.elements;
      this.elements = [];
      angular.forEach(oldElements, (element) => {
        if(!element.done) {
          this.elements.push(element);
        }
      });
    }
    this.newDone = false;
});
