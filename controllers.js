  "use strict"
    angular.module("MainCtrlModule", ['MockApiModule'])
    
    .controller("MainCtrl", function($scope,$http){
        
         angular.element($window).on('resize', function(){ $scope.$apply(drawGraph()) });
        
        $scope.name = "Cyril";
         // Your code for $http connection
        
        //create function to set the default data set to load
         $scope.getData = function(){
             $http.get('http://5637ccdf1a271a1100252149.mockapi.io/products').success(function(data) { 
                 console.log("success!");
                 $scope.charts = data;
                console.log($scope.charts);
    }); 
    }
//});
         //invoke data function
        $scope.getData();
        });