angular.module('app', ['DashCtrl', 'OrgCtrl', 'NavCtrl', 'CreateCtrl', 'userService', 'eventService', 'orgService'])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })