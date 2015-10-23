Classified.controller('CreateController', ['$scope', '$http','$rootScope',  function($scope, $http,$rootScope) {

    $scope.init = function(){
        $scope.yearList = []
        for(var i=1985; i<=2015; i++){
            $scope.yearList.push(i);
        }
        //$scope.yearList = ['1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001']
         $http.get("/image")
        .success(function(data){
            $scope.imageList = data;

        }).error(function(err){

        })
    }

    $scope.create = function(){
        var data = $scope.cars;
        if(data && data.model && data.maker && data.year && data.price.sellingPrice && data.price.currency){
            $http.post("/post", data)
            .success(function(res){
                alert("Post successfully created. Your reference id is "+res.refId);
                window.location="http://localhost:8000";
            }).error(function(err){

            })
        }
        else{
            alert("Please fill the required field");
        }
        
    }

    $scope.addImage = function(){
        window.open('http://localhost:8000/uploadfile', '_blank');
    }

    $scope.init();

}]);