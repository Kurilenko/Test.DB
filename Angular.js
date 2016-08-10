
var app = angular.module('myApp', []);

app.service('getTrainees', function($http) {
	return {"getData": function(data1) {
		return $http({
			method: "POST",
			url: "main.php",
			data: "data=" + JSON.stringify(data1)
		}).success(function(data){
			this.data = JSON.parse(data);
		});
	}} 
});

app.controller('myController', function($scope,$http,getTrainees, $timeout){
	var self = this;
	this.data = {
		name: 'Yura',
		state: 0
	};

	this.Template = "js/templatesJS/trainees.html";
	this.changeTmpl = function() {
		this.Template = 'trainees2.html';
	};

	this.array = [
		{study: 'Learn HTML', done: true},
		{study: 'Learn CSS', done: true},
		{study: 'Learn JS', done: true}
	];

	this.AddList = function(){
		self.array.push( {study: self.bla, done: false} );
		self.bla = '';
	};

	this.Del = function() {
		self.array = self.array.filter(function(item) {
			return !item.done;
		});
	};

	this.getTrainees = function () {
		var data1 = 'getTrainees';
		$http({
			method: "POST",
			url: "main.php",
			data: "data=" + JSON.stringify(data1),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data){
			self.data = data;
			//console.log(data);
			console.log(this.data);
		}).error(function(data, status, headers, config){
			console.log(data);
			console.log(this.data);
		});
		 	//this.data=getTrainees.getData('getTrainees');
		 	console.log(this.data);
	};

	this.getTrainees();
});


