angular.module('orgService',[])
    .service('orgService', ['$http', '$q', '$window', function orgService($http, $q, $window){
        
        var deferred = $q.defer();
        this.createOrg = function(rso){
            $http.post('http://localhost:3000/dashboard', {
                orgName: rso.name.toString(),
                adminEmail: rso.adminEmail.toString(),
                studentEmail1: rso.studentEmail1.toString(),
                studentEmail2: rso.studentEmail2.toString(),
                studentEmail3: rso.studentEmail3.toString(),
                studentEmail4: rso.studentEmail4.toString(),
                studentEmail5: rso.studentEmail5.toString(),
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

    }]);