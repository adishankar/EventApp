angular.module('app', ['userService', 'orgService'])
    .controller('DashCtrl', ['$scope', '$window', 'userService', 'orgService',
        function DashCtrl($scope, $window, userService, orgService) {
        
        $scope.init = function(){
            var user = userService.getUserData();
            console.log(user);
            $scope.name = user.username;
            $scope.orgs = orgs;
        }
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            //var url = '../organization/organization.html'
            $window.location.href = url;
        }

        
        //organization creation stuff
        $scope.master = {};
        $scope.save = function(rso) {
            //createdEvents.push(angular.copy(event));
            console.log(rso);
            orgService.createOrg(rso);

            $scope.reset();
        };

        $scope.reset = function() {
            $scope.rso = angular.copy($scope.master);
        };


        $scope.reset();

    }]);

    var orgs = [{name: "org1", description: "org1 description"},{name: "org2", description: "org2 description"},
        {name: "org3", description: "org3 description"},{name: "org4", description: "org4 description"}];
    
    var createdEvents = [];