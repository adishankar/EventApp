angular.module('app', [])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .service('userService', ['$http', '$q', function userService($http, $q){
        
        var deferred = $q.defer();
        $http.get('people.json').then(function (data){
            deferred.resolve(data);
        });

        this.getPeople = function(){
            console.log("service test");
            return deferred.promise;
        }

    }])
    //Login Controller
    .controller('LoginCtrl', ['$scope', 'userService', function LoginCtrl($scope, userService) {
         
         var promise = userService.getPeople();
         promise.then(function (data){
             $scope.team = data;
             console.log($scope.team);
         });

         $scope.login = function(user){
             console.log(user.username);
             console.log(user.password);
             //call service here
         };
     }])
     //Nav Controller
     .controller('NavCtrl', ['$scope', function NavCtrl($scope) {
        $scope.master = {};

        $scope.save = function(event) {
            createdEvents.push(angular.copy(event));
            console.log(createdEvents);

            $scope.reset();
        };

        $scope.reset = function() {
            $scope.event = angular.copy($scope.master);
        };

        $scope.reset();
    }])
    //Dashboard Controller
    .controller('DashCtrl', ['$scope', '$window', function DashCtrl($scope, $window) {
        $scope.orgs = orgs;
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            //var url = '../organization/organization.html'
            $window.open(url);
        }
    }])
    //Organization Controller
    .controller('OrgCtrl', ['$scope', '$location', function OrgCtrl($scope, $location) {

        $scope.init = function(){
            var url = $location.url().toString();
            var org = url.split('organization/');
            $scope.orgname = org[1];
            console.log(org[1]);
        }

        
        $scope.events = events;
    }])
    //Sing Up Controller
    .controller('SignUpCtrl', ['$scope', function SignUpCtrl($scope) {

    }])
    //Event Controller
    .controller('EventCtrl', ['$scope', function EventCtrl($scope) {
        
    }]);

var events = [{name: "event1", description: "event1 description"},{name: "event2", description: "event2 description"},
        {name: "event3", description: "event3 description"},{name: "event4", description: "event4 description"},
        {name: "event5", description: "event5 description"},{name: "event6", description: "event6 description"},
        {name: "event7", description: "event7 description"}];

var orgs = [{name: "org1", description: "org1 description"},{name: "org2", description: "org2 description"},
        {name: "org3", description: "org3 description"},{name: "org4", description: "org4 description"}];

var createdEvents = [];
    
