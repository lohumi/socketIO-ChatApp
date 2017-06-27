var myapp=angular.module('myapp',[]);
myapp.controller('AppCtrl',['$scope','$http',function($scope,$http){

	$scope.login=function(){
		/*var data = $.param({
                userName: $scope.userName,
                password: $scope.password
                
            });*/
		alert($scope.userName);
		//console.log($scope.userName + $scope.password);
		$http.post('/login',$scope.userName,$scope.password).then(function(response){
			console.log(response.data);
			
		});
	};



	}]);

