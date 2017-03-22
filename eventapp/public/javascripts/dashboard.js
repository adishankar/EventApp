angular.module('dash', [])
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
    .controller('DashCtrl', ['$scope', '$window', function DashCtrl($scope, $window) {
        $scope.orgs = orgs;
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            //var url = '../organization/organization.html'
            $window.open(url);
        }
    }]);






var orgs = [{name: "org1", description: "org1 description"},{name: "org2", description: "org2 description"},
        {name: "org3", description: "org3 description"},{name: "org4", description: "org4 description"}];

var createdEvents = [];
    
