var viSys = angular.module('viSys', ['ui.bootstrap']);

viSys.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }        
        return [];
    }
});

viSys.controller('jobController', function($scope, $http){
	
	$scope.repositories = [];

	var url = 'https://api.github.com/users/pa-vishal/repos';

	$scope.getRepo = function(){
		
	$http.get(url) 	
      .success(function(data){      	
        	$scope.repositories = data;      

        	//Pagination example from -	//http://jsfiddle.net/eqCWL/2/
           	$scope.currentPage = 1; //current page
		    $scope.maxSize = 5; //pagination max size
    		$scope.entryLimit = 10; //max rows for data table

		    /* init pagination with $scope.list */
		    $scope.noOfPages = Math.ceil($scope.repositories.length/$scope.entryLimit);
		    
		    $scope.setPage = function(pageNo) {
		        $scope.currentPage = pageNo;
	 	  	};

		   	$scope.filter = function() {
		        window.setTimeout(function() { //wait for 'filtered' to be changed
		            		/* change pagination with $scope.filtered */
		            		$scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
		        		}, 10);
		        
		        };

      })
      .error(function(a,b,c,d){
      		alert(a);
      }); 
};

});