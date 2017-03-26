angular.module('app', ['DashCtrl', 'OrgCtrl', 'NavCtrl', 'CreateCtrl', 'EventCtrl','userService', 'eventService', 'orgService'])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })