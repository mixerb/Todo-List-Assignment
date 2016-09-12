/**********************************************************
* Author: Kevin Barcoe
* Assignment: WE4.1 Mobile Web Applications 2, Digital Skills Academy
* Student ID: D15128527
* Date : 12/09/2016
* Ref: https://github.com/gsklee/ngStorage#read-and-write--demo for storage 
* Ref:http://www.w3schools.com/angular/tryit.asp?filename=try_ng_todo_app for Delete
* Ref: http://stackoverflow.com/questions/20411771/checkbox-in-header-for-angular-ui-bootstrap-accordion-directive
* Ref: https://angular-ui.github.io/bootstrap/
***********************************************************/

var myApp = angular.module("Todo" , ['ngRoute','ngStorage','ui.bootstrap']);

myApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
                //route for the home page
                templateUrl : 'pages/home.html',
                controller : 'todoController'
            })
        .when('/todo', {
                //route for the todo
                templateUrl : 'pages/todo.html',
                controller : 'todoController'
            })
        .otherwise({
        	redirectTo:'/'
        });
    
});

myApp.controller("todoController", function ($scope, $localStorage,$timeout){
// place all you todo code inside here
    $scope.$storage = $localStorage.$default({
    "tasks": [{
      "title": "Your First Todo",
      "description": " Make A New one."
    }]
  });

    $scope.MakeNewTask = function () {
    //Ref:https://github.com/gsklee/ngStorage#read-and-write--demo 
    //for storage 
        $scope.$storage.tasks.push(
            {
                title: $scope.newTask.title,
                description: $scope.newTask.description,done:false
            });
        $scope.newTask.title='';
        $scope.newTask.description='';
    };
//Ref:http://www.w3schools.com/angular/tryit.asp?filename=try_ng_todo_app
//for Delete
    $scope.deleteTask = function(){

    	var oldlist = $scope.$storage.tasks;
    	$scope.tasks = [];
    	angular.forEach(oldlist, function(currentTask){
    		if (!currentTask.done) $scope.tasks.push(currentTask);
    		
    	});

    	$localStorage.tasks = $scope.tasks;
    };
//fuction for number of todos left to do on home screen
    $scope.getTotalTodos = function(){

        var count = 0;
        angular.forEach($localStorage.tasks, function(tasks){
            count+= tasks.done ? 0 : 1;
        });
        return count;
    };
//function for checkbox in accrodion header
//http://stackoverflow.com/questions/20411771/checkbox-in-header-for-angular-ui-bootstrap-accordion-directive
    $scope.checkboxClick = function(group, $event){
      $event.stopPropagation();
    };


// end of controller
});