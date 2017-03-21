angular.module('org', [])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('OrgCtrl', ['$scope', '$location', function OrgCtrl($scope, $location) {

        $scope.init = function(){
            var url = $location.url().toString();
            var org = url.split('=');
            $scope.orgname = org[1];
            console.log(org[1]);
        }

        
        $scope.events = events;
    }])
    .controller('NavCtrl', ['$scope', function NavCtrl($scope) {
    }]);

var events = [{name: "event1", description: "event1 description"},{name: "event2", description: "event2 description"},
        {name: "event3", description: "event3 description"},{name: "event4", description: "event4 description"},
        {name: "event5", description: "event5 description"},{name: "event6", description: "event6 description"},
        {name: "event7", description: "event7 description"}];