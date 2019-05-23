var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']); 


weatherApp.config(function($routeProvider){

    $routeProvider

    .when('/',{

        templateUrl : 'pages/home.html',
        controller : 'homeController'

    })

    .when('/forecast',{

        templateUrl : 'pages/forecast.html',
        controller : 'forecastController'

    })


});

weatherApp.service('cityService',function(){

    this.city = 'Pune, Maharashtra';

})


weatherApp.controller('homeController',['$scope','$routeParams','cityService',function($scope,$routeParams,cityService){

    $scope.city = cityService.city; 
    $scope.$watch('city',function(){

        cityService.city = $scope.city;

    })

}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){

    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("api.openweathermap.org/data/2.5/weather",{
        callback : "JSON_CALLBACK"},{get:{method :"JSONP"} 
    });
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city});

    console.log($scope.weatherResult); 

}]);