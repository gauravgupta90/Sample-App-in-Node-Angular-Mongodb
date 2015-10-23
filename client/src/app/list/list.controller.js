

Classified.controller('ListController', ['$scope', '$http','$rootScope', function($scope, $http,$rootScope) {

    $scope.init = function(){
         $http.get("/post")
        .success(function(data){
            $scope.cars = data;
        }).error(function(err){

        })
    }

     $scope.search = function(data){
         $http.put("/post",data)
        .success(function(res){
            $scope.cars = res;
        }).error(function(err){

        })
    }



     $scope.init();

}]);