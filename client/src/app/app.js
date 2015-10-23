var Classified = angular.module('Classified', [

    'ngRoute'
    
]);

Classified.config(['$routeProvider','$locationProvider','$httpProvider', function ($routeProvider, $locationProvider,$httpProvider) {


	$routeProvider.
		when('/list', {
			templateUrl:'app/list/list.html',
			controller: 'ListController'
		})
    .when('/create', {
      templateUrl:'app/create/create.html',
      controller: 'CreateController'
    })
		
		.otherwise({
			redirectTo: '/list',
			
		});
		
}])

