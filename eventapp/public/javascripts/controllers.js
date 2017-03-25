angular.module('app', ['services'])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    //Login Controller
    .controller('LoginCtrl', ['$scope', 'userService', '$http', '$window', '$location',
         function LoginCtrl($scope, userService, $http, $window, $location) {
         
         $scope.login = function(user){

             var promise = userService.login(user);
             promise.then(function (data){
                 console.log(data);//this should be returned user data

                 userService.setUserData(data.data);

                 if (data.data.userID == 123){
                     console.log("verified user");
                     $window.location.href = '/dashboard';
                 }
             });
             
         };
     }])
     //Dashboard Controller
    .controller('DashCtrl', ['$scope', '$window', 'userService',function DashCtrl($scope, $window, userService) {
        $scope.orgs = orgs;
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            //var url = '../organization/organization.html'
            $window.open(url);
        }

        $scope.init = function(){
            var user = userService.getUserData();
            console.log(user);
            $scope.name = user.username;
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
    
