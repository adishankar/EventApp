angular.module('app', ['DashCtrl', 'OrgCtrl', 'NavCtrl', 'CreateCtrl', 'EventCtrl', 'SearchCtrl', 'LoginCtrl',
        'userService', 'eventService', 'orgService', 'uniService', 'google.places'])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })